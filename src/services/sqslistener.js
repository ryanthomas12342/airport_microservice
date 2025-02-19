const { response } = require("express");
const { sequelize } = require("../models");
const { updateSeats } = require("./flight");
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bookingqueueUrl = process.env.SQS_BOOKING_QUEUE_URL;

const confirmqueuerUrl = process.env.SQS_BOOKING_CONFIRMATION_QUEUE_URL;

const sendConfirmationEvent = async (bookingId, status) => {
  const params = {
    MessageBody: JSON.stringify({ bookingId, status }),
    QueueUrl: confirmqueuerUrl,
  };

  try {
    await sqs.sendMessage(params).promise();
    console.log("Ok the confirmation has been sent succesfully");
  } catch (error) {
    console.error("❌ Error sending confirmation event to SQS:", error);
  }
};

const processBookingMessage = async (message) => {
  try {
    const booking = JSON.parse(message.Body);

    console.log("Recieved booking request", booking);

    await updateSeats(booking.flightId, booking.noofSeats);
    console.log("✅ Flight seats updated successfully");

    // Send confirmation event to Booking Service
    await sendConfirmationEvent(booking.bookingId, "CONFIRMED");
  } catch (error) {
    console.error("❌ Error processing booking message:", error);

    // Send failure event to Booking Service
    await sendConfirmationEvent(booking.bookingId, "FAILED");
  }
};

const checkFunction = async () => {
  setInterval(async () => {
    console.log("⏳ Checking for new messages in queue...");

    try {
      const response = await sqs
        .receiveMessage({
          QueueUrl: bookingqueueUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 5,
          VisibilityTimeout: 10, // Ensures the message isn't visible to other workers while processing
        })
        .promise();

      if (response.Messages && response.Messages.length > 0) {
        console.log("📥 Received messages:", response.Messages.length);
        response.Messages.forEach(async (message) => {
          console.log("📥 Processing message:", message.Body);

          try {
            await processBookingMessage(message);
            console.log(
              "✅ Successfully processed message:",
              message.MessageId
            );

            await sqs
              .deleteMessage({
                QueueUrl: bookingqueueUrl,
                ReceiptHandle: message.ReceiptHandle,
              })
              .promise();

            console.log("🗑️ Deleted message from queue.");
          } catch (err) {
            console.error("❌ Error processing booking message:", err);
          }
        });
      } else {
        console.log("⏳ No messages in queue...");
      }
    } catch (error) {
      console.error("❌ Error receiving messages from SQS:", error);
    }
  }, 5000);
};

module.exports = checkFunction;

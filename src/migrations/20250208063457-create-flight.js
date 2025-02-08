"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightNumber: { allowNull: false, type: Sequelize.STRING },
      airplaneID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Airplanes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      arrivalAirportId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
      },

      departureAirportId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
      },
      arrivalTime: { allowNull: false, type: Sequelize.DATE },
      departureTime: { allowNull: false, type: Sequelize.DATE },
      price: { allowNull: false, type: Sequelize.INTEGER },
      boardingGate: {
        type: Sequelize.STRING,
      },
      totalSeats: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights");
  },
};

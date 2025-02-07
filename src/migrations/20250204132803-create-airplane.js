"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Airplanes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { max: 1000 }, // (❌) Ignored in migrations
        // ✅ Use a CHECK constraint instead
        validate: {
          isInt: true,
          min: 1,
          max: 1000,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // await queryInterface.sequelize.query(
    //   `ALTER TABLE Airplanes ADD CONSTRAINT CHECK_CAPACITY CHECK(capacity between 1 and 1000)`
    // );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Airplanes");
  },
};

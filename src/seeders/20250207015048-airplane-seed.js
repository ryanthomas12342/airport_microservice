"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "airbus330",
        capacity: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbus350",
        capacity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbus340",
        capacity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Airplanes", {
      [Op.or]: [
        {
          modelNumber: "airbus340",
        },
        { modelNumber: "airbus350" },
        { modelNumber: "airbus330" },
      ],
    });
  },
};

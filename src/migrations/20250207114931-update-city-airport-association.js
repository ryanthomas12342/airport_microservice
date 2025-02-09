"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //seperate migration for adding foreign key conrtraint to airport which reference city table city_id
    await queryInterface.addConstraint("Airports", {
      fields: ["city_id"],
      type: "foreign key",
      name: "fk_id",
      references: {
        table: "Cities",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //removes the constraint when you run npx sequelize db:migrate:undo
    await queryInterface.removeConstraint("Airports", "fk_id");
  },
};

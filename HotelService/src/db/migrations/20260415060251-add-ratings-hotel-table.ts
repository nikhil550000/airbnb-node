'use strict';
import { QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      ADD COLUMN rating DECIMAL(3,2) DEFAULT NULL,
      ADD COLUMN rating_count INT DEFAULT NULL,
      ADD COLUMN address VARCHAR(255) NOT NULL`
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      DROP COLUMN rating,
      DROP COLUMN rating_count,
      DROP COLUMN address`

    )

  }
};

/**
 * Module to retrive skills
 * @module controllers/skill/
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const constants = require('../../utils/constants');

/**
 * Retrieve all skills
 *
 * @param {string}
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.skills
    .findAll({
      attributes: ['id', 'name']
    })
    .then(skills => {
      return res.status(200).json({
        msg: skills
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

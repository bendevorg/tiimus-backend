/**
 * Module to retrive tags
 * @module controllers/tag/
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const constants = require('../../utils/constants');

/**
 * Retrieve all tags
 *
 * @param {string}
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.tags
    .findAll({
      attributes: ['id', 'name']
    })
    .then(tags => {
      return res.status(200).json({
        msg: tags
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

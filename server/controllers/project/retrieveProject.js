/**
 * Module to retrive projects
 * @module controllers/project/
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const constants = require('../../utils/constants');

/**
 * Retrieve all projects
 *
 * @param {string}
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.projects
    .findAll({
      attributes: ['id', 'name', 'description']
    })
    .then(projects => {
      return res.status(200).json({
        msg: projects
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

/**
 * Module to add a project
 * @module controllers/project/newProject
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Add a new project
 *
 * @param {object} req.body - project name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name, description } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }
  if (!validator.isValidString(description)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_DESCRIPTION
    });
  }

  name = name.trim();
  description = description.trim();

  let newProject = database.projects.build({ name, description });
  newProject
    .save()
    .then(savedProject => {
      return res.status(200).json({
        msg: savedProject
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};

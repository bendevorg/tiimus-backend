/**
 * Module to add a skill
 * @module controllers/skill/newSkill
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Add a new skill
 *
 * @param {object} req.body - skill name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }

  name = name.trim();

  let newSkill = database.skills.build({ name });
  newSkill
    .save()
    .then(savedSkill => {
      return res.status(200).json({
        msg: savedSkill
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};

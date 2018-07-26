/**
 * Module to add technology to skill
 * @module controllers/technology/newTechnology
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Add technology to skill
 *
 * @param {string} req.params.skillId - Skill ID
 * @param {object} req.body - Technology info
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { skillId } = req.params;
  if (!validator.isValidUuid(skillId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SKILL_ID
    });
  }
  let { name } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }

  name = name.trim();

  let newTechnology = database.technologies.build({ name, skillId });
  newTechnology
    .save()
    .then(savedTechnology => {
      return res.status(200).json({
        msg: savedTechnology
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};

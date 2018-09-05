/**
 * Module to retrive technologies from a skill
 * @module controllers/technology/retrieveTechnologies
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 *
 * @param {string} req.params.gameId - Game ID
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { skillId } = req.params;
  if (!validator.isValidString(skillId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SKILL_ID
    });
  }
  database.technologies
    .findAll({
      where: {
        skillId: skillId
      }
    })
    .then(technology => {
      if (!technology) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_SKILL_ID
        });
      }
      return res.status(200).json({
        msg: technology
      });
    })
    .catch(database.sequelize.Sequelize.DatabaseError, () => {
      return res.status(400).json({
        msg: constants.messages.error.INVALID_SKILL_ID
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

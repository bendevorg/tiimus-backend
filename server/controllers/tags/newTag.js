/**
 * Module to add a tag
 * @module controllers/tag/newTag
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Add a new tag
 *
 * @param {object} req.body - tag name
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

  let newTag = database.tags.build({ name });
  newTag
    .save()
    .then(savedTag => {
      return res.status(200).json({
        msg: savedTag
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};

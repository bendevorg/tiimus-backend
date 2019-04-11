const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');
const insertSkills = require('../projects/insertProjectSkills');

module.exports = (req, res) => {
  let { user } = req;
  let { name, lookingForProject, skills } = req.body;
  let { file } = req;
  let fieldsToUpdate = {};

  if (!validator.isValidUuid(user.id)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_USER
    });
  }

  if (!validator.isEmptyArray(skills) && !validator.isValidUuidArray(skills)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SKILLS
    });
  }
  if (validator.isValidString(name)) {
    fieldsToUpdate.name = name.trim();
  }
  if (validator.isValidBoolean(lookingForProject)) {
    fieldsToUpdate.lookingForProject = lookingForProject;
  }
  if (validator.isValidImage(file)) {
    fieldsToUpdate.avatar = constants.values.IMAGES_PATH + file.filename;
  }

  database.users
    .findById(user.id, {
      attributes: ['id', 'lookingForProject', 'avatar'],
      include: [
        {
          model: database.skills,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    .then(async updatedUser => {
      await insertSkills(updatedUser, skills).catch(err => {
        logger.error(err);
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      });
      for (let key in fieldsToUpdate) {
        updatedUser[key] = fieldsToUpdate[key];
      }
      updatedUser
        .save({
          include: [
            {
              model: database.skills,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          ]
        })
        .then(savedUser => {
          return res.status(200).json({
            msg: savedUser
          });
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

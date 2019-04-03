const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');
const insertTags = require('./insertProjectTags');
const deleteTags = require('./deleteProjectTags');
const insertSkills = require('./insertProjectSkills');
const deleteSkills = require('./deleteProjectSkills');

module.exports = (req, res) => {
  const { projectId } = req.params;
  let { user } = req; /* talvez usar para validar se é o dono */
  let { name, description, tags, skills, users } = req.body;
  let { file } = req;
  var fieldsToUpdate = {};

  if (!validator.isValidUuid(projectId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PROJECT_ID
    });
  }
  if (!validator.isValidArray(tags)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_TAGS
    });
  }
  if (!validator.isValidArray(skills)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SKILLS
    });
  }
  if (validator.isValidString(name)) {
    fieldsToUpdate.name = name.trim();
  }
  if (validator.isValidString(description)) {
    fieldsToUpdate.description = description.trim();
  }
  if (validator.isValidImage(file)) {
    fieldsToUpdate.image = constants.values.IMAGES_PATH + file.filename;
  }

  database.projects
    .update(fieldsToUpdate, { where: { id: projectId } })
    .then(updateConfirm => {
      if (updateConfirm == 0) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_PROJECT_ID
        });
      }
      database.projects
        .findById(projectId, {
          attributes: ['id', 'name', 'description', 'image'],
          include: [
            {
              model: database.skills,
              attributes: ['name'],
              through: {
                attributes: []
              }
            },
            {
              model: database.tags,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          ]
        })
        .then(async updatedProject => {
          // await deleteTags(database.projects_tags, updatedProject).catch(
          //   err => {
          //     logger.error(err);
          //     return res.status(500).json({
          //       msg: constants.messages.error.UNEXPECTED_DB
          //     });
          //   }
          // );
          let insertedTags = await insertTags(updatedProject, tags).catch(
            err => {
              logger.error(err);
              return res.status(500).json({
                msg: constants.messages.error.UNEXPECTED_DB
              });
            }
          );
          await deleteSkills(database.projects_skills, updatedProject).catch(
            err => {
              logger.error(err);
              return res.status(500).json({
                msg: constants.messages.error.UNEXPECTED_DB
              });
            }
          );
          // let insertedSkills = await insertSkills(updatedProject, skills).catch(
          //   err => {
          //     logger.error(err);
          //     return res.status(500).json({
          //       msg: constants.messages.error.UNEXPECTED_DB
          //     });
          //   }
          // );
          updatedProject.dataValues.tags = insertedTags;
          updatedProject.dataValues.skills = [];
          return res.status(200).json({
            msg: {
              updatedProject
            }
          });
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        });
    });
};

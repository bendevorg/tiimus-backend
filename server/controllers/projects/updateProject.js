/**
 * @api {PATCH} /projects Update project
 * @apiName Update project
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} [name] Project name.
 * @apiParam {String} [description] Project description.
 * @apiParam {String[]} [tags] Tags related to project
 * @apiParam {String[]} [skills] Skills needed in project
 *
 * @apiSuccess (200) {String} [msg] Updated project info.
 * @apiSuccess (200) {String} [id] Updated projects id.
 * @apiSuccess (200) {String} [name] Updated projects name.
 * @apiSuccess (200) {String} [description] Updated projects description.
 * @apiSuccess (200) {String[]} [tags] Updated tags related to project
 * @apiSuccess (200) {String[]} [skills] Updated skills needed in project
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Project example",
      "description": "Project description example"
    },
    "savedTags": [
        [
            {
                "createdAt": "2018-10-04T16:07:14.300Z",
                "updatedAt": "2018-10-04T16:07:14.300Z",
                "projectId": "985686f3-d9b5-42c1-a5d0-878aeeb7b5cd",
                "tagId": "ea1d23ce-5c05-4ae6-b682-d7150d472c95"
            }
        ]
    ],
    "savedSkills": [
        [
            {
                "createdAt": "2018-10-04T16:07:15.083Z",
                "updatedAt": "2018-10-04T16:07:15.083Z",
                "projectId": "985686f3-d9b5-42c1-a5d0-878aeeb7b5cd",
                "skillId": "401d4081-111c-4ca3-8c0f-d6d8d6c37f27"
            }
        ]
    ]
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response: 
    { "msg": "Name not valid." }
  *
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
  const { projectId } = req.params;
  if (!validator.isValidUuid(projectId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PROJECT_ID
    });
  }
  let { name, description, tags, skills } = req.body;
  let projectInfo = {};
  if (validator.isValidString(name)) {
    projectInfo.name = name.trim();
  }
  if (validator.isValidString(description)) {
    projectInfo.description = description.trim();
  }
  database.projects
    .findById(projectId)
    .then(projectToUpdate => {
      return projectToUpdate.update(projectInfo).then(updateConfirmation => {
        if (validator.isValidArray(tags)) {
          projectToUpdate
            .setTags(tags)
            .then(savedTags => {
              if (validator.isValidArray(skills)) {
                projectToUpdate
                  .setSkills(skills)
                  .then(savedSkills => {
                    return res.status(200).json({
                      msg: projectToUpdate,
                      savedTags,
                      savedSkills
                    });
                  })
                  .catch(err => {
                    return res.status(500).json({
                      msg: err.name
                    });
                  });
              } else {
                return res.status(200).json({
                  msg: projectToUpdate,
                  savedTags
                });
              }
            })
            .catch(err => {
              return res.status(500).json({
                msg: err.name
              });
            })
            .catch(err => {
              return res.status(500).json({
                msg: err.name
              });
            });
        } else {
          if (validator.isValidArray(skills)) {
            projectToUpdate
              .setSkills(skills)
              .then(savedSkills => {
                return res.status(200).json({
                  msg: projectToUpdate,
                  savedSkills
                });
              })
              .catch(err => {
                return res.status(500).json({
                  msg: err.name
                });
              });
          } else {
            return res.status(200).json({
              msg: savedProject
            });
          }
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        msg: err.name
      });
    });
};

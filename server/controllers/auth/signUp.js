/**
 * @api {POST} /auth/sign_up User sign up
 * @apiName Sign Up
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Users name.
 * @apiParam {String} email Users email.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess (201) {String} id User id.
 * @apiSuccess (201) {String} name User name.
 * @apiSuccessExample {json} Success-Response:
    {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "User example"
    }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "E-mail not valid." }
  *
 */
const database = require('../../models/database');
const encryptor = require('../../utils/encryptor');
const generateToken = require('../../utils/generateToken');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Create a new user
 *
 * @param {object} req.body - New user info
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name, email, password } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }
  if (!validator.isValidEmail(email)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_EMAIL
    });
  }
  if (!validator.isValidString(password)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PASSWORD
    });
  }

  name = name.trim();
  email = email.trim();
  password = encryptor(password, constants.values.PASSWORD_ENCRYPT_KEY);
  const role = 'user';

  if (!password) {
    return res.status(500).json({
      msg: constants.messages.error.UNEXPECTED_RUNNING
    });
  }

  const newUser = database.users.build({ name, email, password, role });
  newUser
    .save()
    .then(createdUser => {
      const userData = {
        id: createdUser.id,
        name: createdUser.name
      };
      const tokenData = encryptor(userData, constants.values.USER_DATA_ENCRYPT_KEY);
      res.cookie(
        'session',
        generateToken(
          tokenData,
          constants.values.TOKEN_ENCRYPT_KEY,
          constants.values.TOKEN_EXPIRATION_IN_SECONDS
        )
      );

      return res.status(201).json({
        msg: userData
      });
    })
    .catch(database.sequelize.UniqueConstraintError, () => {
      return res.status(400).json({
        msg: constants.messages.error.EMAIL_IN_USE
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};

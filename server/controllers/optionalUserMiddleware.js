/**
 * Middleware to get users data
 * @module controllers/optionalUserMiddleware
 *
 */

const getDataFromToken = require('../utils/getDataFromToken');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.cookies- User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
 */
module.exports = (req, res, next) => {
  if (!req.cookies || !validator.isValidString(req.cookies.session)) {
    return next();
  }

  req.user = getDataFromToken(req.cookies.session, constants.values.USER_DATA_ENCRYPT_KEY, constants.values.TOKEN_ENCRYPT_KEY);
  return next();
};

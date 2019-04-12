/**
 * Middleware to get users data
 * @module controllers/optionalUserMiddleware
 *
 */

const getDataFromToken = require('../utils/getDataFromToken');
const constants = require('../utils/constants');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.cookies- User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
 */
module.exports = (req, res, next) => {
  req.user = getDataFromToken(req, constants.values.TOKEN_ENCRYPT_KEY);
  return next();
};

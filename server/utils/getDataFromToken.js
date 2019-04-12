/**
 * Module to get date from a token
 * @module utils/getDataFromToken
 */
const tokenDecryptor = require('./tokenDecryptor');
const validator = require('./validator');

/**
 * Create token
 *
 * @param {string} tokenData - Data to be tokenized
 * @param {string} key - Key to generate token
 * @param {integer} expirationTime - Seconds for token expiration
 * @return {object} - Returns the token
 * @throws {boolean} - Returns false that indicates a fail
 *
 */
module.exports = (req, key) => {
  if (!req.cookies || !validator.isValidString(req.cookies.session)) {
    return null;
  }

  return tokenDecryptor(req.cookies.session, key);
};

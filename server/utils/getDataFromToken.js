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
module.exports = (data, dataKey, tokenKey) => {
  if (
    !validator.isValidString(data) ||
    !validator.isValidString(dataKey) ||
    !validator.isValidString(tokenKey)
  ) {
    return null;
  }

  return tokenDecryptor(data, dataKey, tokenKey);
};

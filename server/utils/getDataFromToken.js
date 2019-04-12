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
module.exports = (data, key) => {
  if (!validator.isValidString(data) || !validator.isValidString(key)) {
    return null;
  }

  return tokenDecryptor(data, key);
};

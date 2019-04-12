/**
 * Module to generate a token
 * @module utils/generateToken
 */
const encryptor = require('./encryptor');
const jwt = require('jsonwebtoken');

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
module.exports = (data, dataKey, tokenKey, expirationTime) => {
  if (!data || !dataKey || !tokenKey || !expirationTime) return false;

  const tokenData = encryptor(data, dataKey);
  const token = jwt.sign(
    {
      token: tokenData
    },
    tokenKey,
    {
      expiresIn: expirationTime
    }
  );
  return token;
};

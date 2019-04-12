/**
 * Module to decrypt data
 * @module utils/tokenDecryptor
 */
const jwt = require('jsonwebtoken');
const constants = require('./constants');
const decryptor = require('./decryptor');

/**
 * Decrypt an encrypted token
 *
 * @param {string} token - Encrypted token
 * @param {string} key - Key to decrypt the token
 * @return {object} - Returns decrypted token
 * @throws {object} - Returns -1 that indicates a fail
 *
 */
module.exports = (token, key) => {
  if (!token || !key) return false;

  try {
    let decodedToken = jwt.verify(token, key);
    if (!decodedToken)
      return false;
    return decodedToken;
  } catch (err) {
    return false;
  }
};

/**
 * Module to decrypt data
 * @module utils/tokenDecryptor
 */
const jwt = require('jsonwebtoken');
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
module.exports = (token, dataKey, tokenKey) => {
  if (!token || !dataKey || !tokenKey) return false;

  try {
    let decodedToken = jwt.verify(token, tokenKey);
    if (!decodedToken)
      return false;
    let decodedData = decryptor(decodedToken.token, dataKey);
    if (!decodedData)
      return false;
    return decodedData;
  } catch (err) {
    return false;
  }
};

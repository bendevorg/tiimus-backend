/**
 * Module to sign out an user
 * @module controllers/auth/signOut
 */
const constants = require('../../utils/constants');

/**
 * Sign out an user
 *
 * @return {string} - Returns a confirmation message
 *
 */
module.exports = (req, res) => {
  res.clearCookie('session');
  return res.status(200).json({
    msg: constants.messages.info.USER_LOGGED_OUT
  });
};

/**
 * Module to retrive user info
 * @module controllers/user/userInfo
 */
const constants = require('../../utils/constants');

/**
 * Retrieve user info based on session token
 *
 * @return {object} - Returns the user info in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { user } = req;

  if (!user) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_USER
    });
  }

  return res.status(200).json({
    msg: user
  });
};

/**
 * Module to upload files to server
 * @module utils/upload
 */

const validator = require('./validator');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/static/images/');
  },
  filename: function (req, file, cb) {
    let fileNameArray = file.originalname.split('.');
    if (fileNameArray.length > 1)
      return cb(null, fileNameArray[0] + '-' + Date.now() + '.' + fileNameArray[1]);
    return cb(null, file.fieldname + '-' + Date.now());
  }
});
const fileFilter = (req, file, cb) => {
  cb(null, validator.isValidImage(file));
};
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter
});

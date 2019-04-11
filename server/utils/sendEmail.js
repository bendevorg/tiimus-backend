const nodemailer = require('nodemailer');

module.exports = (to, subject, html) => {
  return new Promise(async (resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    return resolve(await transporter.sendMail({
      from: process.env.EMAIL_SERVICE,
      to: to,
      subject: subject,
      html: html
    }));
  });
};

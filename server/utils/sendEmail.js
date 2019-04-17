const mailgun = require('mailgun-js');
const mailer = mailgun({
  apiKey: process.env.EMAIL_API_KEY,
  domain: process.env.EMAIL_DOMAIN
});
const from = process.env.EMAIL_FROM;

module.exports = (to, subject, html) => {
  return new Promise(async (resolve, reject) => {
    mailer.messages().send({ from, to, subject, html }, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(body);
    });
  });
};

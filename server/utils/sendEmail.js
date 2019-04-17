const mailgun = require("mailgun-js");
const mailer = mailgun({apiKey: process.env.EMAIL_API_KEY, domain: process.env.EMAIL_DOMAIN});

module.exports = (to, subject, html) => {
  return new Promise(async (resolve, reject) => {

    const data = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      text: html
    };

    mailer.messages().send(data, (error, body) => {
      if (error) {
        return reject(error)
      }
      return resolve(body);
    });
  });
};

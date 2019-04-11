const nodemailer = require('nodemailer');

module.exports = (to, from, project) => {
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
      to: 'guibasconti@gmail.com',
      subject: 'You have a new request!',
      html: `<b><a href="http://localhost:3339/users/${from.id}">${from.name}</a> is requesting to join <a href="http://localhost:3339/projects/${project.id}">${project.name}</a></b>
      <a href="http://localhost:3339/"> Click here </a> to accept him/her.`
    }));
  });
};

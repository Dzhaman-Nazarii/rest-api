const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9f07b448358215",
      pass: "199bfcf3555ea6"
    }
  });

  const sendEmail= (message) => {
    message['from'] = "dzhaman.nazar2003@gmail.com";
    return transport.sendMail(message);
  }

  module.exports = sendEmail;
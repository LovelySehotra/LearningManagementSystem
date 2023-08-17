"use strict";
const nodemailer = require("nodemailer");
const sendEmail = async function (email,subject,message){
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  }
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: email, // list of receivers
    subject:  subject, // Subject line
    text: "Hello world?", // plain text body
    html: message, // html body
  });

//   console.log("Message sent: %s", info.messageId);

};

// main().catch(console.error);
export default sendEmail;

const nodemailer = require("nodemailer");

// create a transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
  from: "no-reply@gmail.com",
});

// const mailOptions = {
//   from: '"Your Name" <your@email.com>',
//   to: 'recipient@email.com',
//   subject: 'Subject Line',
//   text: 'Plain text content',
//   html: '<b>HTML</b> content'
// };

const sendEmail = async ({ from, to, subject, text, html }) => {
  // send the email
  transporter.sendMail({ from, to, subject, text, html }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;

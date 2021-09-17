const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
const msg = {
  to: "millerjosh28@ymail.com",
  from: "Twish2021@outlook.com",
  subject: "Fourth Sandgrid Test",
  text: "I am looking for this text in the sent sendgrid email",
  html: "This text is regular and <small>this text is small</small>"
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

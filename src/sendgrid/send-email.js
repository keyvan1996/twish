const sgMail = require("@sendgrid/mail");
require('dotenv').config(); //this is an important line for node 
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
console.log(""+ process.env.REACT_APP_SENDGRID_API_KEY + " "+ process.env.sendgrid
+ " " + process.env.SENDGRID_API_KEY );
const msg = {
  to: "joshntram@gmail.com",
  from: "Twish2021@outlook.com",
  subject: "fifth Sandgrid Test",
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

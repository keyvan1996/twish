//import React, { useState } from "react"
//import { firestore, storage } from './config'; //adding these lines to import tools  I may need
const sgMail = require("@sendgrid/mail"); //this line shouldn't work when deployed
//sgMail.setApiKey(proces"type": "module" in the package.jsons.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



function testEmail(){
  console.log(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "joshntram@gmail.com",
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

}
function setTwishData(){
  //trying to identify firestone data...

  //const whatami = firestone.collection('Users').doc(params.id).collection('twish')
  //.get().then => {
  //  if(!doc.exists){
  //    console.log('error');
  //  }
    console.log("Called setTwishData");
    //do stuff
  //}
  //first some dbug code print twish
  // until this is edited this is all dbug code
}

function sendTwish(msgData) {
  //add a check to insure data is complete
  sgMail
    .send(msgData)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

}

setTwishData();

function testfunction() {
  console.log("calling Default function from a different class");
  console.log(process.env.SENDGRID_API_KEY); //I can't get this api key to work.

}

console.log("Script ran");

//export default sendTwish; only one default export allowed per fuction
export default testfunction;

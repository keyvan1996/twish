import React, { useState } from "react"
import { firestore, storage } from './firebase/config'; //adding these lines to import tools  I may need
import * as sgMail from "@sendgrid/mail"; //this line shouldn't work when deployed
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function testEmail(){
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

}
function setTwishData(){
  //just a note But I have no idea what I'm doing :(
  const whatami = firestone.collection('Users').doc(params.id).collection('twish')
  .get().then(() => {
    if(!doc.exists){
      console.log('error');
    }
    console.log("maybe I am a real boi");
    //do stuff
  });
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

console.log("Script ran");

//export default testEmail;

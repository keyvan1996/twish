import React from "react";
//import { testEmail } from '../sendemail.mjs'
import sendTwish from '../pages/sendemail'

function testpage(){

    return(
         <React.Fragment>
        <div>this is a test page where mart is learing how to use react lol

        </div>
        <button onClick={testMyEmail}>  Activate Lasers
        </button>
         </React.Fragment>
       )
}

function testMyEmail(){
  console.log("hmmm well at least the button is working");
  console.log(''+ process.env.SENDGRID_API_KEY);
  //testEmail();

}
export default testpage;

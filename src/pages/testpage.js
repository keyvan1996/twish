import React, {useState, useEffect} from "react";
//import { testEmail } from '../sendemail.mjs'
import testfunction from '../pages/sendemail'
import { firestore } from '../firebase/config';
//import  'firebase/firestore';
//import 'firebase';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function Testpage(){
  //this code in the test page is for building the firebase data for Backend
  //const [user, setUser] = useState([]); commented out moved directly to funtion
  //const firebase = getFirebase(); commented out can't find firebase
  //end of added code
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null);
    return(
         <React.Fragment>
        <div>this is a test page where mart is learing how to use react lol
        <p>{!data ? "Server Message: " : data}</p>
        </div>
        <button onClick={TestMyEmail(data, setData)}>  Contact Backend Test
        </button>
        <button onClick={GrabData(user, setUser)}>  Database Firestore Test
        </button>
         </React.Fragment>
       )
       function TestMyEmail(data, setData){
         //const [data, setData] = React.useState(null); this line is illigal because it's not called at the top of the component
         //does this script still work?
         console.log("hmmm well at least the button is working");

         useEffect(() => {
           fetch("/api")
             .then((res) => res.json())
             .then((data) => setData(data.message));
         }, []);

         //window.location.reload(true);
         //return data;
         //console.log('I do not have access to backend resources like sendgrid api key: '+ process.env.SENDGRID_API_KEY);
         //  testfunction();
         //testEmail();
       }


}

function GrabData(user, setUser){
  //const [user, setUser] = useState([]);
  //const [data, setData] = useState(null);
console.log('t3 running');
const params = useParams();
const [users, setUsers] = useState([]);
useEffect( () => {
  const usercollect = firestore.collection('users').doc('uKgOvGV9h6UcjR3fy43zQAYa9uI3').collection('twish');
  const uData = usercollect.onSnapshot((querySnapshot) => {
    const users = querySnapshot.docs.map((doc) => doc.data());
    setUsers(users);
    console.log('set Users ran');
  });
return uData;
}, []);
console.log('Trying to print myData: ' + JSON.stringify(users));

 //attempting POST req method not working following verbos docs before switching to documentation
//const data = { title, body };datadata
    const requestPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    };
    fetch("http://localhost:3002", requestPost)
  .then(response => response.text())
  .then(res => console.log(res));
}

export default Testpage;

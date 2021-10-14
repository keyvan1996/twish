import React, { useState, useEffect } from "react";
import { firestore } from '../firebase/config';
import { useParams } from "react-router";
import { createTwishDocument } from "../firebase/user";
import { useSession } from "../firebase/UserProvider";
import { useForm } from 'react-hook-form';


const AddTwish = () => {
    const { user } = useSession();
    const params = useParams();
    const { register, setValue, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) => {
      try {
        setLoading(true);
        await createTwishDocument({ uid: params.id, ...data });
        reset();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };



    const formClassname = `ui big form twelve wide column ${isLoading ? 'loading' : ''}`;
//adding sendTwish functionality here
//const [user, setUser] = useState([]);
const [data, setData] = useState(null);
console.log('t3 running');
//const params = useParams();
const [users, setUsers] = useState([]);
useEffect( () => {
const usercollect = firestore.collection('users').doc(params.id).collection('twish');
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
//end of sendtwish
if (!user) {
    return null;
}

    return (
    <div
  className="add-form-container"
  style={{ maxWidth: 960, margin: '50px auto' }}>
  <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
    <div className="fields">
      <div className="eight wide field">
        <label>
          First Name
          <input type="text" name="firstName"
          ref={register}
          // value={firstName} onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div className="eight wide field">
        <label>
          Last Name
          <input type="text" name="lastName"
          ref={register}
          />
        </label>
      </div>
    </div>
    <div className="fields">
    <div className="six wide field">
        <label>
          Email
          <input type="email" name="email"
          ref={register}
          />
        </label>
      </div>
      <div className="six wide field">
        <label>
          Date
          <input type="date" name="date"
          ref={register}
          />
        </label>
      </div>
    </div>
    <div className="equal width fields">
      <div className="field">
        <label>
          Message
          <input type="text" name="message"
          ref={register}
          />
        </label>
      </div>
    </div>
    <button type="submit" className="ui submit large grey button right floated"
    >
      Submit
    </button>
  </form>
</div>

    )
}

export default AddTwish;

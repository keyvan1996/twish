import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { updateTwishDocument } from "../firebase/user";
import { firestore } from '../firebase/config';
import { useSession } from "../firebase/UserProvider";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';



const UpdateTwish = () => {
    const history = useHistory();
    const { user } = useSession();
    const params = useParams();
    const { register, setValue, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);
    const [userDocument, setUserDocument] = useState(null);

    useEffect(() => {
        const docRef = firestore.collection('users').doc(user.uid).collection('twish').doc(params.id);
        const unsubscribe = docRef.onSnapshot((doc) => {
          if (doc.exists) {
            const documentData = doc.data();
            setUserDocument(documentData);
            const formData = Object.entries(documentData).map((entry) => ({
              [entry[0]]: entry[1],
            }));
    
            setValue(formData);
          }
        });
        return unsubscribe;
      }, [user.uid, setValue, params.id]);

    const onSubmit = async (data) => {
      try {
        setLoading(true);
        await updateTwishDocument({ uid: `${user.uid}`, id: params.id, ...data });
        history.push(`/twishlist/${user.uid}`);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };


    if (!user) {
        return null;
    }
    const formClassname = `ui big form twelve wide column ${isLoading ? 'loading' : ''}`;

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
          required 
          ref={register}
          />
        </label>
      </div>
      <div className="eight wide field">
        <label>
          Last Name
          <input type="text" name="lastName"
          required 
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
          required 
          ref={register} 
          />
        </label>
      </div>
      <div className="six wide field">
        <label>
          Date
          <input type="date" name="date"
          required 
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
          required 
          ref={register}
          />
        </label>
      </div>
    </div>
    <button type="submit" className="ui submit large grey button right floated"
    >
      Save Changes
    </button>
  </form>
</div>

    )
}

export default UpdateTwish;


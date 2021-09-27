import React, { useState } from "react";
import { useParams } from "react-router";
import { createTwishDocument } from "../firebase/user";
import { useSession } from "../firebase/UserProvider";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const AddTwish = () => {
    const history = useHistory();
    const { user } = useSession();
    const params = useParams();
    const { register, setValue, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) => {
      try {
        setLoading(true);
        await createTwishDocument({ uid: params.id, ...data });
        toast.success('Twish has been added successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        reset();
        // history.push(`/twishlist/${user.uid}`);
      } catch (error) {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
    <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
  <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
    <div className="fields">
      <div className="eight wide field">
        <label>
          First Name
          <input type="text" name="firstName"
          required 
          ref={register}
          // value={firstName} onChange={(e) => setFirstName(e.target.value)} 
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
      Submit
    </button>
  </form>
</div>

    )
}

export default AddTwish;


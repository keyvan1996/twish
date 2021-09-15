import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { passwordReset } from '../firebase/auth';



function ForgotPassword() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await passwordReset(data);
      reset();
      console.log("Please check your email address!");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={register}
                  required
                />
              </label>
            </div>
            <div className="field actions">
              <button className="ui primary button login" type="submit">
                Reset Password
              </button>
              or
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

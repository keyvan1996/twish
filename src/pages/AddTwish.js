import React from "react";
import { useSession } from "../firebase/UserProvider";

const AddTwish = () => {
    const { user } = useSession();

    if (!user) {
        return null;
    }

    return (
    <div
  className="add-form-container"
  style={{ maxWidth: 960, margin: '50px auto' }}>
  <form className="ui big form">
    <div className="fields">
      <div className="eight wide field">
        <label>
          First Name
          <input type="text" name="firstName" />
        </label>
      </div>
      <div className="eight wide field">
        <label>
          Last Name
          <input type="text" name="lastName"/>
        </label>
      </div>
    </div>
    <div className="fields">
    <div className="six wide field">
        <label>
          Email
          <input type="email" name="email" />
        </label>
      </div>
      <div className="six wide field">
        <label>
          Date
          <input type="date" name="date" />
        </label>
      </div>
    </div>
    <div className="equal width fields">
      <div className="field">
        <label>
          Message
          <input type="text" name="message" />
        </label>
      </div>
    </div>
    <button type="submit" className="ui submit large grey button right floated">
      Submit
    </button>
  </form>
</div>

    )
}

export default AddTwish;


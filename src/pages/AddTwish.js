import React from "react";
import { useSession } from "../firebase/UserProvider";

const AddTwish = () => {
    const { user } = useSession();

    if (!user) {
        return null;
    }

    return (
//         <div className="ui form">
//   <div class="four fields">
//     <div className="field">
//       <label>First name</label>
//       <input type="text" placeholder="First Name"/>
//     </div>
//     <div className="field">
//       <label>Last name</label>
//       <input type="text" placeholder="Last Name"/>
//     </div>
//     <div className="field">
//       <label>Email</label>
//       <input type="text" placeholder="Email"/>
//     </div>
//     <div className="field">
//       <label>Date of Birth</label>
//       <input type="date"/>
//     </div>
//     <br/>
//     <div className="field">
//     <label>Message</label>
//       <input type="text" placeholder="type your message"/>
//     </div>
//   </div>
// </div>

<div
  className="add-form-container"
  style={{ maxWidth: 960, margin: '50px auto' }}
>
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


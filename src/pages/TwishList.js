import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const TwishList = ({twish}) => {
  const [twishes, setTwishes] = useState([]);
  const params = useParams();

  useEffect(() => {
    const twishesRef = firestore.collection('users').doc(params.id).collection('twish');
    const unsubscribe = twishesRef.onSnapshot((querySnapshot) => {
      const twishes = querySnapshot.docs.map((doc) => { return {"data": doc.data(), "id": doc.id} });
      setTwishes(twishes);
    });
    return unsubscribe;
  }, []);

  const onDelete = async (twish_id) => {
    try {
      await firestore.collection('users').doc(params.id).collection('twish').doc(twish_id).delete();
      toast.success('deleted successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
    }
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
    return(
      <div class="ui cards">
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
                    {twishes.map((twish) => (
  <div class="card" key={twish.data.uid}>
    <div class="content">
      <div class="right floated mini ui image" >
        Age: {getAge(twish.data.date)}
      </div>
      <div class="header">
        {twish.data.firstName} {twish.data.lastName}
      </div>
      <div class="meta">
        {twish.data.email}
      </div>
      <div class="description">
        {twish.data.message}
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
      <Link to={`/updatetwish/${twish.id}`}>
        <div class="ui basic green button">Update</div>
        </Link>
        <div class="ui basic red button" onClick={() => {onDelete(twish.id)}}>Delete</div>
      </div>
    </div>
  </div>
                    ))}
</div>
    );
}

export default TwishList;
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
      console.log("deleted successfully!");
    } catch (error) {
      console.error(error);
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
        <div>
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th>Age</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {twishes.map((twish) => (
              <tr key={twish.data.uid}>
                <td>
                  {getAge(twish.data.date)}
                </td>
                <td>
                    {twish.data.firstName}
                </td>
                <td>
                    {twish.data.lastName}
                </td>
                <td>
                    {twish.data.email}
                </td>
                <td>
                    {twish.data.date}
                </td>
                <td>
                    {twish.data.message}
                </td>
                <td>
                <button className="negative ui button" onClick={() => {onDelete(twish.id)}}>Delete</button>
                <Link to={`/updatetwish/${twish.id}`}>
                <button className="positive ui button">Update</button>
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default TwishList;
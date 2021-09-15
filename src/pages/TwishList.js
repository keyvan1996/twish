import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TwishList = () => {
  const [twishes, setTwishes] = useState([]);
  const params = useParams();

  useEffect(() => {
    const twishesRef = firestore.collection('users').doc(params.id).collection('twish');
    const unsubscribe = twishesRef.onSnapshot((querySnapshot) => {
      const twishes = querySnapshot.docs.map((doc) => doc.data());
      setTwishes(twishes);
    });
    return unsubscribe;
  }, []);

    return(
        <div>
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {twishes.map((twish) => (
              <tr key={twish.uid}>
                <td>
                    {twish.firstName}
                </td>
                <td>
                    {twish.lastName}
                </td>
                <td>
                    {twish.email}
                </td>
                <td>
                    {twish.date}
                </td>
                <td>
                    {twish.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default TwishList;
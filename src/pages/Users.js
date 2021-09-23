import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = firestore.collection('users');
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Twish List</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>
                <Link to={`/profile/${user.uid}`}>{user.name}'s profile</Link>
              </td>
              <td>
                <Link to={`/twishlist/${user.uid}`}>{user.name}'s Twish List</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

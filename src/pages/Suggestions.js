import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const usersRef = firestore.collection('users').doc('MeqXVGfIq8XOBeQqFNnXtT3WNlw1').collection('suggestion');
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const suggestions = querySnapshot.docs.map((doc) => { return {"data": doc.data(), "id": doc.id} });
      setSuggestions(suggestions);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>Suggestions</th>
          </tr>
        </thead>
        <tbody>
        {suggestions.map((suggestion) => (
            <tr key={suggestion.data.uid}>
              <td>
                <p>{suggestion.data.message}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suggestions;

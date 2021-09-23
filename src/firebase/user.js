import { firestore, storage } from './config';

export const createUserDocument = async (user) => {
  // get a reference to the Firestore document
  const docRef = firestore.doc(`/users/${user.uid}`);

  // create user object
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  // write to Cloud Firestore
  return docRef.set(userProfile);
};
 // adding this method to save twishes
export const createTwishDocument = async (user) => {
  // const docRef = firestore.doc(`/users/${user.uid}/twish`);
  const docRef = firestore.collection('users').doc(`${user.uid}`).collection('twish')

    // write to Cloud Firestore
    return docRef.add(user);
}

 // adding this method to update twishes
 // I can not grab the user uid and instead I have hard coded it so far.
 export const updateTwishDocument = async (twish) => {
  const docRef = firestore.doc(`users/${twish.uid}/twish/${twish.id}`)
    // write to Cloud Firestore
    return docRef.update(twish);
}

export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);
  return docRef.update(user);
};

export const uploadImage = (userId, file, progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = storage.ref().child(filePath);

    // upload task
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => progress(snapshot),
      (error) => reject(error),
      () => {
        resolve(uploadTask.snapshot.ref);
      }
    );
  });
};

export const getDownloadUrl = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};

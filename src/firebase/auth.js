import firebase from 'firebase/app';
import 'firebase/auth';
import { createUserDocument } from './user';

// this function signs up users with taking 4 arguments, firstname, lastname, email and password 
export const signup = async ({ firstName, lastName, email, password }) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const user = resp.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUserDocument(user);
  return user;
};

// this function logs out the current user if a session exists
export const logout = () => {
  return firebase.auth().signOut();
};

// this function sends an email to the user, allowing them to change their password
export const passwordReset = async ({email}) => {
  return await firebase.auth().sendPasswordResetEmail(email);
}

// this function logs in users using email and password
export const login = async ({ email, password }) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return resp.user;
};

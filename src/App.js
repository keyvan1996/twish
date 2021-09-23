import React from 'react';
import Header from './Header';
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { UserProvider } from './firebase/UserProvider';
import Profile from './pages/Profile';
import ProfileRedirect from './router/ProfileRedirect';
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from './router/AdminRoute';
import Users from './pages/Users';
import AddTwish from './pages/AddTwish';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import TwishList from './pages/TwishList';
import testpage from './pages/testpage'


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header></Header>
        <div className="app">
          <div className="ui grid container">
            <Switch>
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/addtwish/:id" component={AddTwish} />
              <PrivateRoute exact path="/twishlist/:id" component={TwishList} />
              <Route exact path="/about" component={About} />
              <Route exact path="/testpage" component={testpage}/>
              <ProfileRedirect exact path="/signup" component={Signup} />
              <ProfileRedirect exact path="/login" component={Login} />
              <ProfileRedirect exact path="/forgotpassword" component={ForgotPassword} />
              <AdminRoute exact path="/users" component={Users} />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

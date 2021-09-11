import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import SocketIo from './apiClient/socket-io';
import './App.css';
import TweetsView from './jsx/components/tweets-view';
import LandingPage from './jsx/pages/landingPage';
import ResetPasswordPage from './jsx/pages/reset-password';
import SignIn from './jsx/pages/sign-in';
import UserMainPage from './jsx/pages/user-main-page';
import Form from './jsx/testComponent';
import './styles/mediaQuery/mediaQuery.scss'

class App extends React.Component {

  render(){
  return (
    <div className="App">

      <Switch>
        <Route exact path='/' >
          {
            localStorage.getItem('token') ? <Redirect to="/home"/> : <LandingPage />
          }

        </Route>

        
        <Route path='/login' component={SignIn} />
        <Route path= '/home' component={UserMainPage} />
        <Route path = '/resetPassword' component = { ResetPasswordPage } />

      </Switch>
    
    </div>
    )
  }
}

export default App;
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import LandingPage from './jsx/pages/landingPage';
import SignIn from './jsx/pages/sign-in';
import UserMainPage from './jsx/pages/user-main-page';
import './styles/mediaQuery/mediaQuery.scss'

class App extends React.Component {

  render(){
  return (
    <div className="App">
      
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/login' component={SignIn} />,
        <Route path= '/home' component={UserMainPage} />
      </Switch>
      
    
    </div>
    )
  }
}

export default App;
import React from 'react';
import './App.css';
import LandingPage from './jsx/pages/landingPage';
import './styles/mediaQuery/mediaQuery.scss'

class App extends React.Component {

  componentDidMount() {
    for(let i = 1901 ; i < 2022 ; i++){
      console.log(i)
    }
  }

  render(){
  return (
    <div className="App">
          <LandingPage />

      
    </div>
    )
  }
}

export default App;
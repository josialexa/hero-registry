import React, {Component} from 'react';
import Header from './Components/Header/Header'
import HeroList from './Components/HeroList/HeroList'
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HeroList />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import Header from './Components/Header/Header'
import HeroList from './Components/HeroList/HeroList'
import EventList from './Components/EventList/EventList'
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main id='lists-container'>
          <HeroList />
          <EventList />
        </main>
      </div>
    );
  }
}

export default App;

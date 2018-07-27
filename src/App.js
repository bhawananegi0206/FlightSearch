import React, { Component } from 'react';
import './app.css';
import './reset.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Search from './components/searchdetails/Search';
import Flightsdetails from './components/flightdetails/Flights';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <section className="app__content">
          <Search></Search>
          <Flightsdetails></Flightsdetails>
        </section>
      </div>
    );
  }
}

export default App;

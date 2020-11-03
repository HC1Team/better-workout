import React, {Component} from 'react';
import "./Styles/App.css";
import { Link } from 'react-router-dom';

class Home extends Component {
render() {
    return (
      <div className="App">
        <h1>Home Page</h1>
        <Link to="/timer">
          <button className="home-button">Timer</button>
        </Link>
        <Link to="/savedRoutines">
          <button className="home-button">Saved Routines</button>
        </Link>
        <Link to="/createRoutine">
          <button className="home-button">Create Routines</button>
        </Link>
      </div>
    );
  }
}

export default Home;

import React, {Component} from 'react';
import "./Styles/App.css";
import { Link } from 'react-router-dom';

class Home extends Component {
render() {
    return (
      <div className="App">
        <h1>Better Workout Timer</h1>
        <ul>
          <li>
            <Link to="/timer">
              <button className="home-button quick-start-btn">Quick Start</button>
            </Link>
          </li>
          <li>
            <Link to="/savedRoutines">
              <button className="home-button saved-routines-btn">Saved Routines</button>
            </Link>
          </li>
          <li>
            <Link to="/createRoutine">
              <button className="home-button create-routines-btn">Create Routines</button>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;

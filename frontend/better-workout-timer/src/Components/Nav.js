import React, { Component } from 'react';
import './Styles/App.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render(){
    return (
      <nav className="my-nav">
        <ul className="App-nav-links">
          <Link className="my-nav" to="/" >
            <li>Home</li>
          </Link>
          <Link className="my-nav" to="/timer">
            <li>Quick Start/Timer</li>
          </Link>
          <Link className="my-nav" to="/savedRoutines">
            <li>Saved Routines</li>
          </Link>
          <Link className="my-nav" to="/createRoutines">
            <li>Create Routines</li>
          </Link>
          {/* Make Hamburger nav that is hidden */}
        </ul>
      </nav>
    );
  } 
}

export default Nav;

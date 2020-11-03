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
            <li>Timer</li>
          </Link>
          <Link className="my-nav" to="/savedRoutines">
            <li>Saved Routines</li>
          </Link>
          <Link className="my-nav" to="/createRoutines">
            <li>Create Routines</li>
          </Link>
        </ul>
      </nav>
    );
  } 
}

export default Nav;

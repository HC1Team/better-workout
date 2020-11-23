import React, { Component } from 'react';
import './Styles/App.css';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render(){
    return (
      <Nav className="NAV-my-nav">
        {/* <ul className="App-nav-links"> */}
          <Link className="my-nav" to="/" >
            <NavItem>Home</NavItem>
          </Link>
          <Link className="my-nav" to="/timer">
            <NavItem>Quick Start/Timer</NavItem>
          </Link>
          <Link className="my-nav" to="/savedWorkouts">
            <NavItem>Saved Workouts</NavItem>
          </Link>
          <Link className="my-nav" to="/createWorkouts">
            <NavItem>Create Workouts</NavItem>
          </Link>
          {/* Make Hamburger nav that is hidden */}
        {/* </ul> */}
      </Nav>
    );
  } 
}

export default Navigation;

import React from 'react';
import './Styles/App.css';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { Link } from 'react-router-dom';

function Navigation(props){
  //If needed add props to be passed to the Nav like in other project to remember data.
  //You might just use useEffects to call the database every time you load the page since there aren't user profiles in this app yet.
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

export default Navigation;

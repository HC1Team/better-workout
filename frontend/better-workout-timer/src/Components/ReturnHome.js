import React from 'react';
import './Styles/App.css';
import './Styles/savedWorkouts.css';
import Button from 'react-bootstrap/Button';
import {FaHome} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';


export default function ReturnHome() {
  const history = useHistory();
  function goHome() {
    let path = "/";
    history.push({pathname:path});
  }

  return (
    <div>
      <Button id="go-home-button" className="go-home-button" onClick={goHome}>
        <FaHome />
      </Button>
    </div>
  )
}
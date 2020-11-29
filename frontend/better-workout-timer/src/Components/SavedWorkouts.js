import React, {useState, useEffect} from 'react';
import './Styles/App.css';
import './Styles/savedWorkouts.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {FaPlus} from 'react-icons/fa'
import {useHistory} from 'react-router-dom';
import ReturnHone from './ReturnHome';

const axios = require('axios');

//Renders cards showing the savedWorkouts in the database
export default function SavedWorkouts(props) {
  const [workouts, setWorkouts] = useState(props.location.state.workouts);
  const sampleWorkouts = workouts;
  const history = useHistory();

  // Call the backend and get workouts from database.
  useEffect(() => {
    //Set up initial stuff. Call the backend and get workouts from database.
    getWorkouts();
    return () => {
      //clean stuff up if needed
    }
  });

  //Get workouts from database
  //HAS NOT BEEN TESTED. Just skeleton code.
  function getWorkouts() {
    axios.get('http://localhost:8000/workouts')
        .then((response) => {
          console.log(response.data);
          setWorkouts(response.data);
          console.log(workouts);
        }, (error) => {

        });
  }

  function createWorkout() {
    //Redirect user to Create Workouts
    return history.push("/createWorkouts");
  }
  
    //Renders the cards and everything else
    return (
      <div className="App">
        <h1>Saved Routines</h1>
        {/* Container for your cards */}
        <ReturnHone />
        <div className="large-container column">
          {/* Each card will be mapped out here, but for now you'll just make some temp one's until you have what you need */}
          {sampleWorkouts.map( (w ,idx) => (
            <>
            <Card 
              key={idx}
              bg="dark"
              className="workout-card"
            >
              <Card.Body
                key={w+idx}
              >
                <Card.Title id={w.workoutID} className="workout-title">{w.workoutID}</Card.Title>
                <Card.Text className="rounds">{`Rounds: ${w.numberOfRounds}`}</Card.Text>
                <ListGroup variant="flush">
                  {w.exercises.map((e, idy) => (
                    <ListGroup.Item key={idy} className="exercise-info-container">
                      <p className="exercise-info-item1 exercise-info-top">Exercise:</p>
                      <p className="exercise-info-item2 exercise-info-top">Muscle Group:</p>
                      <p className="exercise-info-item3 exercise-info-top">Rep Target:</p>
                      <p className="exercise-info-item4 exercise-info-top">Time:</p>
                  <p className="exercise-info-item5 exercise-info-bottom">{e.exerciseName}</p>
                  <p className="exercise-info-item6 exercise-info-bottom">{e.muscleGroup}</p>
                  <p className="exercise-info-item7 exercise-info-bottom">{e.repTarget}</p>
                  <p className="exercise-info-bottom exercise-info-item8">{e.time}s</p>
                    </ListGroup.Item>
                ))}
                </ListGroup>
                <Card.Footer>
                  <Button variant="success" onClick={() => {
                    let path = "/timer"
                    history.push({pathname:path, state:{workout: w}})
                    }}>Start Workout!</Button>
                </Card.Footer>
              </Card.Body>
            </Card>
            </>
          ))}
        </div>
        <div>
          <Button id="create-workout" className="create-workout" onClick={createWorkout}><FaPlus/></Button>
        </div>
      </div>
    );
}
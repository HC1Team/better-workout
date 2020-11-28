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
  var sampleWorkouts = [
    { "workoutID": "Workout1",
      "numberOfRounds": 3,
      "restBetweenRounds": 30,
      "restAfterExercise": 10,
      "exercises":
        [
          {"exerciseName":"Pull ups", "muscleGroup": "Upper Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Burpees", "muscleGroup": "Full Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Squats", "muscleGroup": "Lower Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Jump Rope", "muscleGroup": "Full Body", "repTarget": 0, "time": 60}
        ]
    },
    { "workoutID": "Workout2",
      "numberOfRounds": 3,
      "restBetweenRounds": 30,
      "restAfterExercise": 10,
      "exercises":
        [
          {"exerciseName":"Pulsing Squats", "muscleGroup": "Lower Body", "repTarget": 10, "time": 30},
          {"exerciseName":"Burpees", "muscleGroup": "Full Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Supermans", "muscleGroup": "Abs", "repTarget": 0, "time": 60},
          {"exerciseName":"Pull ups", "muscleGroup": "Upper body", "repTarget": 0, "time": 45}
        ]
    },
    { "workoutID": "Workout3",
      "numberOfRounds": 3,
      "restBetweenRounds": 30,
      "restAfterExercise": 10,
      "exercises":
        [
          {"exerciseName":"Push-Ups", "muscleGroup": "Upper Body", "repTarget": 10, "time": 30},
          {"exerciseName":"Burpees", "muscleGroup": "Upper Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Squats", "muscleGroup": "Lower Body", "repTarget": 10, "time": 60},
          {"exerciseName":"Plank", "muscleGroup": "Abs", "repTarget": 0, "time": 45}
        ]
    },
  ]

  const [workouts, setWorkouts] = useState([]);
  const history = useHistory();

  //Call the backend and get workouts from database.
  // useEffect(() => {
  //   //Set up initial stuff. Call the backend and get workouts from database.
  //   getWorkouts();
  //   return () => {
  //     //clean stuff up if needed
  //   }
  // });

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

  // state = {
  //   response: '',
  //   post: '',
  //   responseToPost: '',
  // };
  
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
    
  //   return body;
  // };
  
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };
  
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
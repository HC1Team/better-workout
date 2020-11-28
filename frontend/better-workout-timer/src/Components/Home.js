import React, {useEffect, useState} from 'react';
import "./Styles/App.css";
import { Link } from 'react-router-dom';

function Home(props) {
    const [randomWorkout, setRandomWorkout] = useState({"workoutID": "Workout3",
    "numberOfRounds": 2,
    "restBetweenRounds": 30,
    "restAfterExercise": 10,
    "exercises":
      [
        {"exerciseName":"Push-Ups", "muscleGroup": "Upper Body", "repTarget": 10, "time": 30},
        {"exerciseName":"Burpees", "muscleGroup": "Upper Body", "repTarget": 10, "time": 30},
        {"exerciseName":"Squats", "muscleGroup": "Lower Body", "repTarget": 10, "time": 30},
        {"exerciseName":"Plank", "muscleGroup": "Abs", "repTarget": 0, "time": 30}
      ]});

    useEffect(() => {
      //Call function to setRandomWorkout by pulling from database of workouts
      return () => {
        //Not sure what to cleanup yet
      }
    })

    return (
      <div className="App">
        <h1>Better Workout Timer</h1>
        <ul>
          <li>
            {/* Pass in a random workout from the database */}
            <Link to={{
              pathname: "/timer",
              state: {workout: randomWorkout}
            }}>
              <button className="home-button quick-start-btn">Quick Start</button>
            </Link>
          </li>
          <li>
            <Link to="/savedWorkouts">
              <button className="home-button saved-routines-btn">Saved Workouts</button>
            </Link>
          </li>
          <li>
            <Link to="/createWorkouts">
              <button className="home-button create-routines-btn">Create Workouts</button>
            </Link>
          </li>
        </ul>
      </div>
    );
}

export default Home;

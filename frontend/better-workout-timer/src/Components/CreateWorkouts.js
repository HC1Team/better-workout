import React, { useRef, useState } from 'react';
import ReturnHome from './ReturnHome';
import './Styles/App.css';
import ExerciseList from "./ExerciseList";
import uuidv4 from "uuid/v4"
import { useHistory } from 'react-router-dom';

export default function CreateWorkouts(props) {
  const [ exercises, addExercises ] = useState( [] );
  const exerciseNameRef = useRef();
  const history = useHistory();

  //Use the below variables and function to simulate adding a new workout to the database.
  const [workouts, setWorkouts] = useState(props.location.state.workouts);
  const sampleWorkouts = workouts;
  var newWorkoutArray = []; //This array will be passed as a prop to the savedWorkouts page when the user is rerouted there after saving. Maybe need to pass it to Home page too? That way the same data is passed around, but that might be a bit much.
  function addWorkoutToArray(workout) {
    for(var i=0; i<sampleWorkouts.length+1;){
      if(i<sampleWorkouts.length)
      newWorkoutArray[i] = sampleWorkouts[i];
      else
      newWorkoutArray[i] = workout;
    }
  }


  function handleAddExercise( e ) {
    const name = exerciseNameRef.current.value
    if ( name === "" ) return

    // add exercise to the page
    addExercises( prevExercises => {
      return [ ...prevExercises, { id: uuidv4(), name: name } ]
    } )

    // clear the input 
    exerciseNameRef.current.value = null
  }

  return (
    <div>
      <ReturnHome />
      <h1>Create Routines</h1>
      <form>
        {/* This section is everything above the actual list of exercises */ }
        <input type="text" id="routineName" name="routineName" placeholder="Routine Name"></input>
        <br></br>
        <label>Number of Rounds <input type="text" id="numberOfRounds" name="numberOfRounds"></input></label>
        <br></br>
        <label>Rest between Rounds <input type="text" id="restBetweenRounds" name="restBetweenRounds"></input></label>


        {/* ************************************************************************************************************** */ }
        {/* ************************************************************************************************************** */ }
        {/* ************************************************************************************************************** */ }
        {/* This section of code handles the adding of exercises to the CreateRoutines page */ }
        <div id="exerciseList" >

          {/*the left "exercices" serves as a parameter for ExerciseList, the right "exercises" comes from line  */ }
          <ExerciseList exercises={ exercises } />
          <br></br>

          <input type="text" placeholder="Exercise Name" ref={ exerciseNameRef } />
          <br></br>
          <button type="button" id="addExerciseButton" onClick={ handleAddExercise } >+ Add Exercise</button>

        </div>

        {/*Cancel & Submit Button*/ }
        <p><button type="button" onClick={()=>{history.push("/")}} >Cancel</button><button type="button">Save</button></p>
      </form>
    </div>
  );
}

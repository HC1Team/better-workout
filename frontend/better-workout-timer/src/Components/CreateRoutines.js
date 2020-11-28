import React, {Component, useRef, useState} from 'react';
import './Styles/App.css';
import ExerciseList from "./ExerciseList";
import uuidv4 from "uuid/v4"

export default function CreateRoutines(props){

  const [exercises, addExercises] = useState([])
  const exerciseNameRef = useRef()

  function handleAddExercise(e){
    const name = exerciseNameRef.current.value
    if(name === "") return

    // add exercise to the page
    addExercises(prevExercises => {
      return [...prevExercises, {id: uuidv4(), name: name}]
    })

    // clear the input 
    exerciseNameRef.current.value = null
  }
  
  return (
    <div>
      <h1>Create Routines</h1>
        <form>
          {/* This section is everything above the actual list of exercises */}
          <input type = "text" id = "routineName" name = "routineName" placeholder = "Routine Name"></input>
          <br></br>
          <label>Number of Rounds <input type = "text" id = "numberOfRounds" name = "numberOfRounds"></input></label>
          <br></br>
          <label>Rest between Rounds <input type = "text" id = "restBetweenRounds" name = "restBetweenRounds"></input></label>


          {/* ************************************************************************************************************** */}
          {/* ************************************************************************************************************** */}
          {/* ************************************************************************************************************** */}

         
         {/* This section of code handles the adding of exercises to the CreateRoutines page */}
         <div id = "exerciseList" >

           {/*the left "exercices" serves as a parameter for ExerciseList, the right "exercises" comes from line  */}
           <ExerciseList exercises = {exercises} /> 
           <br></br>

           <input type="text" placeholder = "Exercise Name" ref = {exerciseNameRef}/>
           <br></br>
           <button type = "button" id = "addExerciseButton" onClick = {handleAddExercise} >+ Add Exercise</button>

         </div>
         
         {/*Cancel & Submit Button*/}
         <p><button type = "button" >Cancel</button><button type  = "button">Save</button></p>
        </form>
    </div>
  )
}
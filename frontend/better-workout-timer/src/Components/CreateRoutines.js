import React, {Component, useRef, useState, createRef} from 'react';
import './Styles/App.css';
import ExerciseList from "./ExerciseList";
import uuidv4 from "uuid/v4"


// list of added exercises
var exerciseList = new Array()

export default function CreateRoutines(props){

  const [exercises, addExercises] = useState([])

  //create references for each input field
  const routineNameRef = useRef(1)
  const numberOfRoundsRef = useRef(2)
  const restBetweenRoundsRef = useRef(3)
  const exerciseNameRef = useRef(4)
  const exerciseListRef = useRef(5)

  // JSON to collect data from the CreateRoutine form
  var routineJSON = {RoutineName: "", NumberOfRounds: "", RestBetweenRounds: "", ExerciseList: ""} //maybe make ExerciseList a string array

  function handleAddExercise(e){

    const name = exerciseNameRef.current.value
    exerciseList.push(name)
    // console.log(exerciseList.toString())

    if(name === "") return

    // add exercise to the page
    addExercises(prevExercises => {
      return [...prevExercises, {id: uuidv4(), name: name}]
    })
    
    // clear the input 
    exerciseNameRef.current.value = null
  }

  //11/28/20 Things to do and Ideas
  // make onClick function (function exerciseToJSON)  for the save button that puts the exercises into a JSON
  function exerciseToJSON(){
    //get data from form
    const routineName = routineNameRef.current.value
    const numberOfRounds = numberOfRoundsRef.current.value
    const restBetweenRounds = restBetweenRoundsRef.current.value

    //put data into a JSON
    routineJSON.RoutineName = routineName
    routineJSON.NumberOfRounds = numberOfRounds
    routineJSON.RestBetweenRounds = restBetweenRounds
    routineJSON.ExerciseList = exerciseList.toString()

    //send JSON to backend with a function call
    console.log(JSON.stringify(routineJSON))

    //Display confirmation message
    window.alert("Congratulations, you have saved a new workout routine!")

    //Clear Form
    clearForm()
  }

  // make a function to clear the form
  function clearForm(){
    routineNameRef.current.value = null
    numberOfRoundsRef.current.value = null
    restBetweenRoundsRef.current.value = null
    exerciseNameRef.current.value = null

  }

  // make a function that is called within exerciseToJSON that actually sends the JSON to the backend
  // play around with the styling for the page

  return (
    <div>
      <h1>Create Routines</h1>
        <form>
          {/* This section is everything above the actual list of exercises */}
          <input type = "text" id = "routineName" name = "routineName" placeholder = "Routine Name" ref = {routineNameRef}></input>
          <br></br>
          <label>Number of Rounds <input type = "text" id = "numberOfRounds" name = "numberOfRounds" ref = {numberOfRoundsRef}></input></label>
          <br></br>
          <label>Rest between Rounds <input type = "text" id = "restBetweenRounds" name = "restBetweenRounds" ref = {restBetweenRoundsRef}></input></label>


          {/* ************************************************************************************************************** */}
          {/* ************************************************************************************************************** */}
          {/* ************************************************************************************************************** */}

         
         {/* This section of code handles the adding of exercises to the CreateRoutines page */}
         <div id = "exerciseList" >
           <div ref = {exerciseListRef}>
             {/*the left "exercices" serves as a parameter for ExerciseList, the right "exercises" comes from line  */}
           <ExerciseList exercises = {exercises} /> 
           
           </div>
           <br></br>

           <input type="text" placeholder = "Exercise Name" ref = {exerciseNameRef}/>
           <br></br>
           <button type = "button" id = "addExerciseButton" onClick = {handleAddExercise} >+ Add Exercise</button>

         </div>
         
         {/*Cancel & Submit Button*/}
         <p>
           <button type = "button" onClick = {clearForm}>Cancel</button>
           <button type  = "button" onClick = {exerciseToJSON}>Save</button>
        </p>
        </form>
    </div>
  )
}
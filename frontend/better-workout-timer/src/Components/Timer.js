import React, { useEffect, useState } from 'react';
import './Styles/App.css';
import './Styles/timer.css'
import Button from 'react-bootstrap/Button';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import {Prompt, Redirect, useHistory, Link} from 'react-router-dom';



// Make sure to turn off timer when moving from page to page or prevent user from moving from page to page
export default function Timer(props) {
  // How do I test that props isn't empty?
  const [testWorkout, setTestWorkout] = useState(props.location.state.workout);
  console.log(testWorkout);
  // Use this example workout to test out your startWorkout Function
  //The actual response will be pretty simple. Rest after workout will be static and the same for each workout, no prep time other than current function, no cooldown time, workout just ends.
  const workout = testWorkout;
  console.log(workout);
  //{
  //   "workoutID": "Routine 1",
  //   "numberOfRounds": 1,
  //   "restBetweenRounds": 10,
  //   "exercises": [
  //     { "exerciseName": "pushups", "time": 10, "restAfter": 5 },
  //     { "exerciseName": "plank", "time": 20, "restAfter": 5 },
  //     // { "name": "plank up downs", "time": 15, "restAfter": 5 },
  //     // { "name": "burpees", "time": 10, "restAfter": 5 },
  //     // { "name": "jump rope", "time": 10, "restAfter": 5 }
  //   ]
  // };

  const history = useHistory();

  var Time_Limit = workout.exercises[ 0 ].time;
  const PREP_TIME_LEFT = 3;
  var prepTimeLeft = PREP_TIME_LEFT;
  var prepTimePassed = 0;
  // const COOLDOWN_TIME_LEFT = workout.CooldownTime;
  const FULL_DASH_ARRAY = 283;
  //Tracks the time per each exercise. Initially is the first exercise. Maybe it should be PrepTime instead...?
  // var time = (workout.PrepareTime!==0?workout.PrepareTime:Time_Limit);
  var time = Time_Limit;
  // let prepTime = PREP_TIME_LEFT;
  // let cooldownTimeLeft = COOLDOWN_TIME_LEFT;
  var timerInterval = 0;
  var restBetweenRounds = workout.restBetweenRounds;
  // var workoutCoolDown = workout.CooldownTime;
  // var exercises = workout.exercises;
  var exercise = 0; //Keeps track of the current exercise we are on
  //Variable that will count down number of rounds
  var numExercises = workout.exercises.length;
  var round = workout.numberOfRounds;
  var isPaused = false;
  var wasPaused = false;
  var rest = false;
  var cooldown = false;
  let prepTime = [ "Ready", "Set", "Go!", "" ];
  const [timerIsRunning, setTimerIsRunning] = useState(true);


  // Warning occurs at whatever half time is for any particular exercise.
  var Warning_Threshold = time/2;
  // Alert occurs at half of the WARNING_THRESHOLD time
  var Alert_Threshold = (time/2)/2; //Maybe there should be an Alert_Threshold for 3 seconds always?
  // stuff to handle the path circle
  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: Warning_Threshold
    },
    alert: {
      color: "red",
      threshold: Alert_Threshold
    },
    rest_: {
      color: "lavender"
    },
    cooldown_: {
      color: "cornflowerblue"
    }
  };
  let remainingPathColor = COLOR_CODES.info.color;

  const [noChange, setNoChange] = useState(true);

  useEffect( () => {
    // document.getElementById("time-remaining").innerHTML = "Ready";
    document.getElementById( "time-remaining" ).innerHTML = prepTime[ 0 ];
    // prepare();
    prepare();
    // Ok, so you can access the stuff from the JSON pretty easy. Now just apply it to a function for the timer. Set some mutable variables that are based of the times and get cracking.
    // console.log(workout.exercises[0].name);
    return () => {
      onTimesUp();
    }
  },[noChange] );


  let onTimesUp = () => {
    clearInterval( timerInterval );
    timerInterval = 0;
  }

  //StartWorkout() function that loops through the appropriate methods for each exercise, rest, rounds, etc.
  async function startWorkout() {
    document.getElementById("rounds-remaining").innerHTML = round;
    //Runs through each round
    if ( round !==0 ) {
      const result = await waitRound();
      console.log( 'round' + result );
      if(rest===true){
        await restAfterRound();
        rest = false;
      }
      await exercises();
      //Run timer for restAfterRound if there is a rest after each round
      // await waitRound();
    } else {
      // Workout is complete
      alert( 'Workout complete!' );
      let done = "DONE";
      document.getElementById("current-exercise").innerHTML = done;
      document.getElementById("next-up").innerHTML = done;
      document.getElementById("rounds-remaining").innerHTML = done;
      document.getElementById("time-remaining").innerHTML = done;
      setCircleDasharray();
      setRemainingPathColor( 0 );
      //Run cooldownTimer if there is a coolDownTime
      setTimerIsRunning(false);
      console.log(timerIsRunning);
    }
  }


  function restAfterRound() {
    return new Promise( resolve => {
      if ( !isPaused ) {
        // remainingPathColor = COLOR_CODES.rest_.color;
        timerInterval = setInterval( () => {
          console.log( 'rest' + restBetweenRounds );
          //Make timer move every second and update time
          // The time left label is updated
          if(restBetweenRounds===0) {
            document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( restBetweenRounds );
            console.log( 'Rest Done' );
            // exercise++; //Move index for next exercise
            clearInterval( timerInterval );
            restBetweenRounds = workout.restBetweenRounds;
            // rest = false;
            setCircleDasharray();
            setRemainingPathColor( restBetweenRounds );
            // Add some delay before moving on to next exercise
            exercises();
          } else {
            restBetweenRounds--;
            document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( restBetweenRounds );
            setCircleDasharray2();
            setRemainingPathColor( restBetweenRounds );
            document.getElementById("current-exercise").innerHTML = "REST";
            document.getElementById("next-up").innerHTML = workout.exercises[0].name;
          }
        }, 1000 );
      }
    } )
  }
  //makes sure that startWorkout doesn't run wild
  function waitRound() {
    return new Promise( resolve => {
      resolve( round );
    } );
  }

  //Runs through all the exercises
  async function exercises() {
    //Runs through each exercise within a round
    console.log( 'Starting exercises.' );
    if ( exercise < numExercises ) {
      const result = await waitExercise();
      console.log( 'exercise' + result );
      //Runs an exercise
      //Set restAfter value to see if the current exercise has a restAfter
      //Update information for current exercise and nextUp. Also show rep target.
      if(wasPaused) {
        // Time_Limit = workout.exercises[result].time;
        Time_Limit = workout.exercises[result].time;
        wasPaused = false;
        console.log(time);
      } else {
        Time_Limit = workout.exercises[result].time;
        time = Time_Limit;
        Warning_Threshold = time/2;
        Alert_Threshold = (time/2)/2;
      }
      


      await runExercise();
      // document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( time );
      remainingPathColor = COLOR_CODES.info.color;
      
      //Check if the restAfter value is not zero so you can run rest after timer
      // await runRestAfter();
    } else {
      round--;
      exercise = 0;
      rest = true;
      startWorkout();
    }
  }

  //Makes sure exercises doesn't run wild
  function waitExercise() {
    return new Promise( resolve => {
      resolve( exercise );
    } );
  }

  function runExercise() {
    return new Promise( resolve => {
      if ( !isPaused ) {
        timerInterval = setInterval( () => {
          console.log( 'time' + time );
          //Make timer move every second and update time
          // The time left label is updated
          if(time===0) {
            document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( 0 );
            //Check if current exercise has rest after it. Set boolean rest to true and add new conditional for rest time. Reset time to be time for rest. 
            if(workout.exercises[exercise].restAfter!==0 && rest!==true) {
              rest = true;
              time = workout.exercises[exercise].restAfter;
            } else{
              document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( time );
              console.log( 'Exercise done' );
              rest = false;
              exercise++; //Move index for next exercise
              clearInterval( timerInterval );
              time = Time_Limit;
              setCircleDasharray();
              setRemainingPathColor( time );
              // Add some delay before moving on to next exercise
              exercises();
            }
          } else if(rest===true){
            runTimer("REST", ((exercise+1<numExercises) && (workout.restBetweenRounds==0)?workout.exercises[0].name:"REST"));
          } else {

            runTimer(workout.exercises[exercise].name, (exercise+1<numExercises?workout.Exercises[exercise+1].name:"REST"));
          }
        }, 1000 );
      }
    } )
  }

  //Modify prepare and startTimer to be one function that just starts the workout, as defined above.
  let prepare = () => {
    document.getElementById("current-exercise").innerHTML = workout.Exercises[0].name;
    document.getElementById("next-up").innerHTML = (1<numExercises?workout.exercises[1].name:"REST");
    document.getElementById("rounds-remaining").innerHTML = workout.numberOfRounds;
    timerInterval = setInterval( () => {
      prepTimePassed = prepTimePassed += 1;
      prepTimeLeft = PREP_TIME_LEFT - prepTimePassed;

      if ( prepTimeLeft === 1 ) {
        onTimesUp();
        document.getElementById( "time-remaining" ).innerHTML = prepTime[2];
        // document.getElementById("time-remaining").innerHTML = formatTimeLeft(timeLeft);
        // startTimer();
        startWorkout();
      } else {
        document.getElementById( "time-remaining" ).innerHTML = prepTime[ prepTimePassed ];
      }
    }, 1000 );
  }

  //Old function that tested running the timer
  // let startTimer = () => {
  //   if ( !isPaused ) {
  //     timerInterval = setInterval( () => {
  //       runTimer( Time_Limit );
  //       if ( time === 0 ) {
  //         onTimesUp();
  //       }
  //     }, 1000 );
  //   } else {
  //     clearInterval( timerInterval );
  //     isPaused = true;
  //   }
  // }


  //To update, there needs to be a "time" argument, "currentExercise" argument, and "nextUp" argument
  function runTimer(currentExercise, nextUp) {
    // The time left label is updated
    document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( time );
    setCircleDasharray();
    setRemainingPathColor( time );
    time--;
    //Displays the current thing happening
    document.getElementById("current-exercise").innerHTML = currentExercise;
    //Displays the next activity
    document.getElementById("next-up").innerHTML = nextUp;
  }

  //Formats time in correct format
  let formatTimeLeft = ( time_ ) => {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor( time_ / 60 );
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time_ % 60;
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if ( seconds < 10 ) {
      seconds = `0${seconds}`;
    }
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  // divides time left by the defined time limit.
  let calculateTimeFraction = () => {
    const rawTimeFraction = time / Time_Limit;
    return rawTimeFraction - ( 1 / Time_Limit ) * ( 1 - rawTimeFraction );
  }

  // Update the dasharray calue as time passes, starting with 283
  let setCircleDasharray = () => {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed( 0 )} 283`;
    document.getElementById( "base-timer-path-remaining" ).setAttribute( "stroke-dasharray", circleDasharray );
  }
  let calculateTimeFraction2 = () => {
    const rawTimeFraction = restAfterRound / workout.restBetweenRounds;
    return rawTimeFraction - ( 1 / workout.restBetweenRounds ) * ( 1 - rawTimeFraction );
  }

  // Update the dasharray calue as time passes, starting with 283
  let setCircleDasharray2 = () => {
    const circleDasharray = `${(
      calculateTimeFraction2() * FULL_DASH_ARRAY
    ).toFixed( 0 )} 283`;
    document.getElementById( "base-timer-path-remaining" ).setAttribute( "stroke-dasharray", circleDasharray );
  }

  let setRemainingPathColor = ( timeLeft ) => {
    // Add a color for rest and cooldown. Maybe change background color
    const { alert, warning, info, rest_, cooldown_ } = COLOR_CODES;
    // If the boolean rest==true, make the default color rest_.color
    // if ( rest===true ) {
    //   document.getElementById( "base-timer-path-remaining" ).classList.remove( alert.color );
    //   document.getElementById( "base-timer-path-remaining" ).classList.add( rest_.color );
    // } else if ( cooldown ) { //If boolean cooldown==true, make the default color cooldown_.color
    //   document.getElementById( "base-timer-path-remaining" ).classList.remove( alert.color );
    //   document.getElementById( "base-timer-path-remaining" ).classList.add( cooldown_.color );
    // }
    // If the remaining time is less than or equal to 1/4 time, remove the "warning" class and apply the "alert" class.
    alert.threshold = Alert_Threshold;
    warning.threshold = Warning_Threshold;
    if ( timeLeft <= alert.threshold ) {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( warning.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( alert.color );
      // If the remaining time is less than or equal to half time, remove the base color and apply the "warning" class.
    } else if ( timeLeft <= warning.threshold ) {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( info.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( warning.color );
    } else if(rest===false) {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( alert.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( info.color );
    } else {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( alert.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( rest_.color );
    }
  }

  // Pause the timer and change Button to play button
  let pause = () => {
    // Clear timerInterval
    onTimesUp();
    console.log(time);
    // Set flag for isPaused to true
    isPaused = true;
    wasPaused = false;
    document.getElementById( "pause" ).style.display = "none";
    document.getElementById( "play" ).style.display = "inline-block";
  }
  //start the timer again and change Button to pause button
  let start = () => {
    // Set flag for isPaused to false
    isPaused = false;
    wasPaused = true;
    // startTimer again
    startWorkout();
    document.getElementById( "play" ).style.display = "none";
    document.getElementById( "pause" ).style.display = "inline-block";
  }

  function quit() {
    onTimesUp();
    isPaused = true;
    document.getElementById( "pause" ).style.display = "none";
    document.getElementById( "play" ).style.display = "inline-block";
    console.log(timerIsRunning);
    
    // return (<><Prompt when={timerIsRunning} message="Your woukout isn't over! Quit workout?"/>{history.push("/")}</>)
  }

  let pathClasses = [ 'base-timer__path-remaining', remainingPathColor ].join( ' ' );

  // Render the timer page
  return (
    <div id="timer" className="App">
      {/* <h1>Timer</h1> */ }
      <div className="timer-info-container">
        <p className="timer-info-item1 timer-info-top-item">Rounds Remaining</p>
        <p className="timer-info-item2 timer-info-top-item">Current Exercise</p>
        <p className="timer-info-item3 timer-info-top-item">Next Up</p>
        <p className="timer-info-item4 timer-info-bottom-item" id="rounds-remaining">Pending</p>
        <p className="timer-info-item5 timer-info-bottom-item" id="current-exercise">exercise 1</p>
        <p className="timer-info-item6 timer-info-bottom-item" id="next-up">exercise 2</p>
      </div>

      <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              strokeDasharray="283"
              className={ pathClasses }
              d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <div>
          <span className="base-timer__label" id="time-remaining">
            { formatTimeLeft( time ) }
          </span>
        </div>
      </div>
      {/* Add button for pause/start */ }
      <div>
        <Button id="pause" className="pause-button" onClick={ function () { pause() } }><FaPause id="pause-icon" className="pause" /></Button>
        <Button id="play" className="play-button" onClick={ function () { start() } }><FaPlay id="play-icon" className="play" /></Button>
      </div>
      <div>
        <Prompt when={timerIsRunning} message="Your woukout isn't over! Quit workout?" />
        <Link to="/" >
          <Button id="quit" className="quit-button" onClick={function() {quit()}} >
          <FaStop id="quit-icon" className="quit" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
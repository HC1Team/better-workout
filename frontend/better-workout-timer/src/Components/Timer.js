import React, { Component, useEffect } from 'react';
import './Styles/App.css';
import './Styles/timer.css'
import Button from 'react-bootstrap/Button';
import { FaPause, FaPlay } from 'react-icons/fa';



// Make sure to turn off timer when moving from page to page
export default function Timer() {
  // start with an initial value of 120 seconds
  // figure out how to get this from the form submit. Database? Cookie? Session?
  // Pass along some kind of JSON object that describes the workout details. Number of rounds, array of exercises with their times, etc. (An Example of this JSON file can be seen in the Resources folder.)
  const TIME_LIMIT = 20;
  const PREP_TIME_LEFT = 3;
  const COOLDOWN_TIME_LEFT = 20;
  const FULL_DASH_ARRAY = 283;


  // Initially, no time has passed, but this will count up and subtract from the TIME_LEFT
  let timePassed = 0;
  let prepTimePassed = 0;
  let cooldownTimePassed = 0;
  let timeLeft = TIME_LIMIT
  let prepTimeLeft = PREP_TIME_LEFT;
  let cooldownTimeLeft = COOLDOWN_TIME_LEFT;
  var timerInterval = 0;
  var isPaused = false;
  var rest = false;
  var cooldown = false;
  // let timerInterval2 = null;
  // let startTime = `0:${TIME_LIMIT}`;
  let prepTime = [ "Ready", "Set", "Go!", "" ];
  // Use this example workout to test out your startWorkout Function
  var workout = {
    "RoutineName": "Routine 1",
    "NumberOfRounds": 3,
    "PrepareTime": 20,
    "CooldownTime": 20,
    "RestBetweenRounds": 30,
    "Exercises": [
      {"name": "pushups", "time": 30, "restAfter": 10},
      {"name": "plank", "time": 45, "restAfter": 10},
      {"name": "plank up downs", "time": 45, "restAfter": 10},
      {"name": "burpees", "time": 60, "restAfter": 15},
      {"name": "jump rope", "time": 60, "restAfter": 10}
    ]
  };


  // Warning occurs at whatever half time is for any particular exercise.
  const WARNING_THRESHOLD = 10;
  // Alert occurs at half of the WARNING_THRESHOLD time
  const ALERT_THRESHOLD = 5;
  // stuff to handle the path circle
  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    },
    rest: {
      color: "lavender"
    },
    cooldown: {
      color: "cornflowerblue"
    }
  };
  let remainingPathColor = COLOR_CODES.info.color;

  useEffect( () => {
    // document.getElementById("time-remaining").innerHTML = "Ready";
    document.getElementById( "time-remaining" ).innerHTML = prepTime[ 0 ];
    // prepare();
    prepare();
    // Ok, so you can access the stuff from the JSON pretty easy. Now just apply it to a function for the timer. Set some mutable variables that are based of the times and get cracking.
    console.log(workout.Exercises[0].name);
    return () => {
      onTimesUp();
    }
  }, [] );


  let onTimesUp = () => {
    clearInterval( timerInterval );
    timerInterval = 0;
  }

  //Make this block of code a separate function that you can run in startWorkout to make the timer move
  // // The amount of time passed increments by one
  // timePassed = timePassed += 1;
  // timeLeft = exercises[j].time - timePassed;

  // // The time left label is updated
  // document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( timeLeft );

  // setCircleDasharray();
  // setRemainingPathColor( timeLeft );
  // if(timeLeft==0) {
  //   rest = false;
  //   onTimesUp();
  // }

  //Create a startWorkout() function that loops through the appropriate methods for each exercise, rest, rounds, etc.
  let startWorkout = () => {
    //Pull all appropriate data from JSON. 
    //May not have to assign separate variables here and just use JSON for all loop related stuff.
    var rounds = workout.NumberOfRounds;
    var restBetweenRounds = workout.RestBetweenRounds;
    var workoutCoolDown = workout.CooldownTime;
    var exercises = workout.Exercises;

    // Two for loops
    //Loop ONE: Loop through all the rounds
    for(var i=0, r=rounds; i<rounds; i++, r--) {
      //Display correct number of rounds
      document.getElementById("rounds-remaining").innerHTML = r;
      //Loop TWO: Loop through each exercise. Run the startTimer with correct information for each workout being displayed in timer.
      for(var j=0; i<exercises.length; j++) {
        // Display correct workout names
        if(i<exercises.length-1){
          document.getElementById("current-exercise").innerHTML = exercises[j].name;
          document.getElementById("next-up").innerHTML = exercises[j+1].name;
        } else {
          document.getElementById("current-exercise").innerHTML = exercises[j].name;
          document.getElementById("next-up").innerHTML = "rest";
        }
        //Start timer for current exercise
        timeLeft = exercises[j].time;
        if ( !isPaused ) {
          timerInterval = setInterval( () => {
            // The amount of time passed increments by one
            timePassed = timePassed += 1;
            timeLeft = exercises[j].time - timePassed;
    
            // The time left label is updated
            document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( timeLeft );
    
            setCircleDasharray();
            setRemainingPathColor( timeLeft );
    
            //Decides whether to move on to next exercise or do restAfter exercise
            if ( timeLeft === 0 ) {
              // Check if current exercise has rest after it
              if(exercises[j].restAfter!=0) {
                onTimesUp();
                rest = true;
                timePassed = 0;
                timeLeft = exercises[j].restAfter;
                timerInterval = setInterval( () => {
                  // The amount of time passed increments by one
                  timePassed = timePassed += 1;
                  timeLeft = exercises[j].time - timePassed;
    
                  // The time left label is updated
                  document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( timeLeft );
    
                  setCircleDasharray();
                  setRemainingPathColor( timeLeft );
                  if(timeLeft==0) {
                    rest = false;
                    onTimesUp();
                  }
                }, 1000);
              } else if(j==exercises.length-1 && workout.RestBetweenRounds!=0){
                //Run the rest timer and change current exercise and nextup labels
                document.getElementById("current-exercise").innerHTML = "rest";
                document.getElementById("next-up").innerHTML = exercises[0].name;
                onTimesUp();
                rest = true;
                timePassed = 0;
                timeLeft = restBetweenRounds;
                timerInterval( () => {
                  // The amount of time passed increments by one
                  timePassed = timePassed += 1;
                  timeLeft = exercises[j].time - timePassed;
    
                  // The time left label is updated
                  document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( timeLeft );
    
                  setCircleDasharray();
                  setRemainingPathColor( timeLeft );
                  if(timeLeft==0) {
                    rest = false;
                    onTimesUp();
                  }
                })
              } else {
                // End current exercise without any rest
                onTimesUp();
              }
            }
          }, 1000 );
        } else {
          clearInterval( timerInterval );
          isPaused = true;
        }
      }
    }
  }



  //Modify prepare and startTimer to be one function that just starts the workout, as defined above.
  let prepare = () => {
    timerInterval = setInterval( () => {
      prepTimePassed = prepTimePassed += 1;
      prepTimeLeft = PREP_TIME_LEFT - prepTimePassed;
      if ( prepTime[ prepTimePassed ] === "" ) {
        document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( TIME_LIMIT );
      } else {
        document.getElementById( "time-remaining" ).innerHTML = prepTime[ prepTimePassed ];
      }

      if ( prepTimeLeft === 0 ) {
        onTimesUp();
        // document.getElementById("time-remaining").innerHTML = formatTimeLeft(timeLeft);
        startTimer();
      }
    }, 1000 );
  }

  let startTimer = () => {
    if ( !isPaused ) {
      timerInterval = setInterval( () => {
        // The amount of time passed increments by one
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;

        // The time left label is updated
        document.getElementById( "time-remaining" ).innerHTML = formatTimeLeft( timeLeft );

        setCircleDasharray();
        setRemainingPathColor( timeLeft );

        if ( timeLeft === 0 ) {
          onTimesUp();
        }
      }, 1000 );
    } else {
      clearInterval( timerInterval );
      isPaused = true;
    }
  }

  let formatTimeLeft = ( time ) => {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor( time / 60 );
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if ( seconds < 10 ) {
      seconds = `0${seconds}`;
    }
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  // divides time left by the defined time limit.
  let calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - ( 1 / TIME_LIMIT ) * ( 1 - rawTimeFraction );
  }

  // Update the dasharray calue as time passes, starting with 283
  let setCircleDasharray = () => {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed( 0 )} 283`;
    document.getElementById( "base-timer-path-remaining" ).setAttribute( "stroke-dasharray", circleDasharray );
  }

  let setRemainingPathColor = ( timeLeft ) => {
    // Add a color for rest and cooldown. Maybe change background color
    const { alert, warning, info, rest, cooldown } = COLOR_CODES;
    // If the remaining time is less than or equal to 1/4 time, remove the "warning" class and apply the "alert" class.
    if ( timeLeft <= alert.threshold ) {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( warning.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( alert.color );
      // If the remaining time is less than or equal to half time, remove the base color and apply the "warning" class.
    } else if ( timeLeft <= warning.threshold ) {
      document.getElementById( "base-timer-path-remaining" ).classList.remove( info.color );
      document.getElementById( "base-timer-path-remaining" ).classList.add( warning.color );
    }
  }

  // Pause the timer and change Button to play button
  let pause = () => {
    // Clear timerInterval
    onTimesUp();
    // Set flag for isPaused to true
    isPaused = true;
    document.getElementById( "pause" ).style.display = "none";
    document.getElementById( "play" ).style.display = "inline-block";
  }
  //start the timer again and change Button to pause button
  let start = () => {
    // Set flag for isPaused to false
    isPaused = false;
    // startTimer again
    startTimer();
    document.getElementById( "play" ).style.display = "none";
    document.getElementById( "pause" ).style.display = "inline-block";
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
        <p className="timer-info-item4 timer-info-bottom-item" id="rounds-remaining">3</p>
        <p className="timer-info-item5 timer-info-bottom-item" id="current-exercise">push-ups</p>
        <p className="timer-info-item6 timer-info-bottom-item" id="next-up">jumping jacks</p>
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
            { formatTimeLeft( timeLeft ) }
          </span>
        </div>
      </div>
      {/* Add button for pause/start */ }
      <div>
        <Button id="pause" className="pause-button" onClick={ function () { pause() } }><FaPause id="pause-icon" className="pause" /></Button>
        <Button id="play" className="play-button" onClick={ function () { start() } }><FaPlay id="play-icon" className="play" /></Button>
      </div>

    </div>
  );
}
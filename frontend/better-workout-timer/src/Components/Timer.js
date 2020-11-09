import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/timer.css'

// start with an initial value of 120 seconds
// figure out how to get this from the form submit. Database? Cookie? Session?
// Pass along some kind of JSON object that describes the workout details. Number of rounds, array of exercises with their times, etc. (An Example of this JSON file can be seen in the Resources folder.)
const TIME_LEFT = 1120;
const PREP_TIME_LEFT = 3;
const COOLDOWN_TIME_LEFT = 20;
// Initially, no time has passed, but this will count up and subtract from the TIME_LEFT
let timePassed = 0;
let prepTimePassed = 0;
let cooldownTimePassed = 0;
let timeLeft = TIME_LEFT;
let prepTimeLeft = PREP_TIME_LEFT;
let cooldownTimeLeft = COOLDOWN_TIME_LEFT;
let timerInterval = null;
let prepTime = ["Ready", "Set", "Go!"];

// stuff to handle the path circle
const COLOR_CODES = {
  info: {
    color: "green"
  }
};
let remainingPathColor = COLOR_CODES.info.color;

class Timer extends Component {

  componentDidMount() {
    // document.getElementById("time-remaining").innerHTML = "Ready";
    document.getElementById("time-remaining").innerHTML = this.formatTimeLeft(TIME_LEFT);
    // this.prepare();
    this.startTimer();
  }


  prepare(){
    timerInterval = setInterval(() => {
      prepTimePassed = prepTimePassed +=1;
      prepTimeLeft = PREP_TIME_LEFT - prepTimePassed;

      document.getElementById("time-remaining").innerHTML = prepTime[prepTimePassed];
      if(prepTimeLeft===0) {
        this.startTimer();
      }
    }, 1000);
    
  }
  startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      timePassed = timePassed += 1;
      timeLeft = TIME_LEFT - timePassed;

      // The time left label is updated
      document.getElementById("time-remaining").innerHTML = this.formatTimeLeft(timeLeft);
    }, 1000);
  }

  formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
    }
    

    
render() {
  let pathClasses = ['base-timer__path-remaining', this.reminingPathColor].join(' ');
    return (
      <div id="timer" className="App">
        {/* <h1>Timer</h1> */}
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
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
              <path
                id="base-timer-path-remaining"
                strokeDasharray="283"
                className= {pathClasses}
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
            {this.formatTimeLeft(timeLeft)}
          </span>
          </div>
          
        </div>
      </div>
    );
  }
}



export default Timer;

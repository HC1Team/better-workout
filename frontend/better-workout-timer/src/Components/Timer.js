import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/timer.css'

class Timer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {roundsCompleted: 0};
  // }


  //Redraw the circle (or draw something over to make it apear to disappear) every second


  // componentDidMount() {
    
  // }

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
    return (
      <div className="App">
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
            </g>
          </svg>
          <span id="time-remaining">
            {/* {this.formatTimeLeft(timeLeft)} */}
          </span>
        </div>
      </div>
    );
  }
}

export default Timer;

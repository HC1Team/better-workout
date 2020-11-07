import React, {Component} from 'react';
import './Styles/App.css';

class Timer extends Component {
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

  //Review code from original project to try to make this work, but make it your own
  //Draws the circle with the time or other details in middle
  draw() {
    //Draw circle
    var canvas = document.getElementById('timerCircle');
    var ctx = canvas.getContext("2d"); 
    var X = canvas.width / 2;
    var Y = canvas.height / 2;
    var R = 220;
    ctx.beginPath();
    ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
    ctx.lineWidth = 25;
    ctx.strokeStyle = '#73DD5E';
    ctx.stroke(); 
  }

  //Redraw the circle (or draw something over to make it apear to disappear) every second


  componentDidMount() {
    this.draw();
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
        <canvas id="timerCircle" width="500" height="500"></canvas>
      </div>
    );
  }
}

export default Timer;

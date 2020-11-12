import React, {Component} from 'react';
import './Styles/App.css';

class CreateRoutines extends Component {
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
  
render() {
    return (
      <div className="App">
        <h1>Create Routines</h1>
        <form>
          <input type = "text" id = "routineName" name = "routineName" placeholder = "Routine Name"></input>
          <label>Number of Rounds <input type = "text" id = "numberOfRounds" name = "numberOfRounds"></input></label>
          <label>Rest between Rounds <input type = "text" id = "restBetweenRounds" name = "restBetweenRounds"></input></label>
         <p><button type = "button">+</button>Add Exercise</p>
         <div id = "exerciseList">
           /*This section will be updated using .innerhtml */

         </div>
         <p><button type = "button">Cancel</button><button type  = "button">Submit</button></p>
        </form>
      </div>
    );
  }
}

export default CreateRoutines;

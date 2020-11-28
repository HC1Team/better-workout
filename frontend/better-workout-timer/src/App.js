import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Styles/App.css';

import Home from './Components/Home';
import Timer from './Components/Timer';
import SavedWorkouts from './Components/SavedWorkouts';
import CreateWorkouts from './Components/CreateWorkouts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navigation from './Components/Nav'; //Was used for debugging purposes

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navigation /> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/timer" component={Timer} />
            <Route path="/savedWorkouts" component={SavedWorkouts} />
            <Route path="/createWorkouts" component={CreateWorkouts} />
          </Switch>
        </div>
      </Router>



    );
  }

  //Stuff for making calls to server

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
}

export default App;
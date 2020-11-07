import React, { Component } from 'react';
import './Components/Styles/App.css';
import Home from './Components/Home';
import Timer from './Components/Timer';
import SavedRoutines from './Components/SavedRoutines';
import CreateRoutines from './Components/CreateRoutines';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/timer" component={Timer} />
            <Route path="/savedRoutines" component={SavedRoutines} />
            <Route path="/createRoutines" component={CreateRoutines} />
          </Switch>
        </div>





        {/* 
              How to make calls to server
              <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p> */}
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

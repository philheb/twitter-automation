import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    response: "",
    post: "",
    count: 1,
    responseToPost: null
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/get");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch("/api/post", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ post: this.state.post, count: this.state.count })
  //   });
  //   const body = await response;
  //   this.setState({ responseToPost: body });
  // };

  handleSubmit = event => {
    event.preventDefault();
    const newRequest = { post: this.state.post, count: this.state.count };
    axios.post("/api/post", newRequest).then(res => {
      console.log(res.data);
      this.setState({ responseToPost: res.data });
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>The Tweeting App</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <h2>What do you want to like today?</h2>
          <input
            type="text"
            placeholder="#"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <h2>How many time? </h2>
          <input
            type="text"
            value={this.state.count}
            onChange={e => this.setState({ count: e.target.value })}
          />
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        <h3>{this.state.responseToPost}</h3>
        {/* <p>{this.state.response}</p> */}
      </div>
    );
  }
}

export default App;

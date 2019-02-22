import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import hashtag from "./assets/images/noun_hashtag_1984173.svg";

class App extends Component {
  state = {
    response: "",
    post: "",
    count: 1,
    type: "popular",
    responseToPost: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const newRequest = {
      post: this.state.post,
      count: this.state.count,
      type: this.state.type
    };
    axios.post("/api/post", newRequest).then(res => {
      console.log(res.data);
      this.setState({ responseToPost: res.data });
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <img src={hashtag} alt="hashtag" height="50px" />
          <h1>The Tweeting Bot</h1>
          <img src={hashtag} alt="hashtag" height="50px" />
        </header>

        <form onSubmit={this.handleSubmit}>
          <div className="input-row">
            <h2>What do you want to like today?</h2>
            <input
              type="text"
              placeholder="#"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
          </div>
          <div className="input-row">
            <h2>How many time? </h2>
            <div className="input-caption">
              <input
                type="number"
                value={this.state.count}
                min="1"
                max="100"
                onChange={e => this.setState({ count: e.target.value })}
              />
              <p>Max 100</p>
            </div>
          </div>
          <div className="input-row">
            <h2>Which kind of post?</h2>
            <select onChange={e => this.setState({ type: e.target.value })}>
              <option value="popular">Popular</option>
              <option value="mixed">Mixed</option>
              <option value="recent">Recent</option>
            </select>
          </div>
          <div className="input-row">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        <h3>{this.state.responseToPost}</h3>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";

class Log extends Component {
  render(props) {
    return (
      <form className="log">
        <h2>Login</h2>
        <input id="user" type="text" placeholder="User name:" />
        <input id="pass" type="password" placeholder="User password:" />
        <Link to="/list">
          <button id="btn" onClick={this.log}>
            Log in
          </button>
        </Link>
      </form>
    );
  }
}

export default Log;

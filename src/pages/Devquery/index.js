import React, { Component } from "react";
import api from "../../services/api";

export default class Devquery extends Component {
  handleDelete = e => {
    //e.preventDefault();
    if (this.state.id !== "") {
      api.delete(`/devedores/${this.state.id}`).catch(error => {
        console.log(error);
      });
    }

    console.log(this.state.dev);
  };
  render() {
    return <div />;
  }
}

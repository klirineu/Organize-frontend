import React, { Component } from "react";
import api from "../../services/api";

import "./style.css";

export default class Devlist extends Component {
  state = {
    devedores: [],
    devedor: {
      newNome: "",
      newVdiv: "",
      newParc: ""
    },
    id: ""
  };

  componentDidMount() {
    this.loadDevedores();
  }

  loadDevedores = async () => {
    await api
      .get("/devedores")
      .then(response => {
        const devedores = response.data;
        if (response.data.nome === response.data) {
          this.setState({ devedores });
        } else if (response.data.nome !== response.data) {
          this.setState({ devedores });
        }
      })

      .catch(function(error) {
        console.log(error);

        throw error;
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeDev(devedor) {
    const id = devedor._id;
    this.setState({ id: id });
    console.log(this.state.id);
  }

  handleSubmit = e => {
    //e.preventDefault();

    const devedor = {
      nome: this.state.newNome,
      Vdiv: this.state.newVdiv,
      parc: this.state.newParc
    };

    //ate aki ok
    api
      .post("/devedores", { devedor })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);

        throw error;
      });
  };

  handleDelete = e => {
    //e.preventDefault();
    api.delete(`/devedores/${this.state.id}`).catch(error => {
      console.log(error);
    });
  };

  render() {
    return (
      <div className="container-main">
        <form className="formulario" onSubmit={this.handleSubmit} method="post">
          <input
            type="text"
            placeholder="Nome:"
            name="newNome"
            onChange={this.handleChange}
            value={this.state.newNome}
          />
          <input
            type="Number"
            placeholder="Valor a pagar:"
            name="newVdiv"
            onChange={this.handleChange}
            value={this.state.newVdiv}
          />
          <input
            type="Number"
            name="newParc"
            placeholder="Parcelas:"
            onChange={this.handleChange}
            value={this.state.newParc}
          />
          <button className="btn" type="submit">
            Enviar
          </button>
        </form>

        <form className="container-list" onSubmit={this.handleDelete}>
          <ul>
            {this.state.devedores.map(devedor => (
              <li key={devedor._id}>
                <strong>Nome: {devedor.nome}</strong>
                <strong>Valor a pagar: {devedor.Vdiv}</strong>
                <strong>Parcelas: {devedor.parc}</strong>
                <button
                  type="submit"
                  value={this.state.id}
                  onClick={() => this.removeDev(devedor)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

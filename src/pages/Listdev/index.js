import React, { Component } from "react";
import api from "../../services/api";
//import { Link } from "react-router-dom";

import "./style.css";

export default class Devlist extends Component {
  state = {
    nomes: [],
    devedores: [],
    devedor: {
      newNome: "",
      newVdiv: "",
      newParc: ""
    },
    id: "",
    dev: ""
  };

  componentDidMount() {
    this.loadDevedores();
  }

  loadDevedores = async props => {
    await api
      .get("/devedores")
      .then(response => {
        const nomes = response.data;
        this.setState({ nomes });
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

  listDev(nome) {
    const dev = nome;
    this.setState({ dev: dev });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (
      this.state.newNome === undefined ||
      this.state.newVdiv === undefined ||
      this.state.newParc === undefined
    ) {
      alert("preencha os campos");
    } else {
      const devedor = {
        nome: this.state.newNome,
        Vdiv: this.state.newVdiv,
        parc: this.state.newParc
      };

      api
        .post("/devedores", { devedor })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);

          throw error;
        });
    }

    //ate aki ok
  };

  handleDev = e => {
    e.preventDefault();
    api
      .get(`/devedores/order/${this.state.dev}`)
      .then(res => {
        const devedores = res.data;
        this.setState({ devedores: devedores });
        console.log(devedores);
      })
      .catch(error => {
        console.log(error);
      });

    console.log(this.state.dev);
  };

  render() {
    let id = 0;
    return (
      <div className="container-main">
        <form className="formulario" onSubmit={this.handleSubmit}>
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

        <form className="container-list" onSubmit={this.handleDev}>
          <ul>
            {this.state.nomes.map(nome => (
              <li key={id++}>
                <strong>Nome: {nome}</strong>
                <button type="submit" onClick={() => this.listDev(nome)}>
                  Listar
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

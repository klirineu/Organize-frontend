import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./style.css";

import * as devActions from "../../store/actions/Devquery";

function Devlist({ dev, dispatch }) {
  const [nomes, setnomes] = useState([]);
  const [newnome, setnewnome] = useState("");
  const [newVdiv, setnewVdiv] = useState("");
  const [newparc, setnewparc] = useState("");

  useEffect(() => {
    async function handlenomes() {
      await api
        .get("/devedores")
        .then(res => {
          setnomes(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }

    handlenomes();
  }, []);

  function handleclick(e) {
    e.preventDefault();

    if (newnome === "" || newVdiv === "" || newparc === "") {
      alert("preencha os campos");
    } else {
      const devedor = {
        nome: newnome,
        Vdiv: newVdiv,
        parc: newparc
      };

      api
        .post("/devedores", { devedor })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <div className="container-main">
      <form className="formulario">
        <h2>Cadastrar novo devedor</h2>
        <input
          type="text"
          name="newnome"
          value={newnome}
          onChange={e => setnewnome(e.target.value)}
          placeholder="Nome:"
        />
        <input
          type="Number"
          name="newVdiv"
          value={newVdiv}
          onChange={e => setnewVdiv(e.target.value)}
          placeholder="Valor a pagar:"
        />
        <input
          type="Number"
          name="newparc"
          value={newparc}
          onChange={e => setnewparc(e.target.value)}
          placeholder="Parcelas:"
        />
        <button className="btn" type="submit" onClick={handleclick}>
          Enviar
        </button>
      </form>

      <div className="container-list">
        <ul>
          {nomes.map(nome => (
            <li key={nome}>
              <strong>Nome: {nome}</strong>
              <Link to="/query">
                <button onClick={() => localStorage.setItem("dev", nome)}>
                  Listar
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default connect(state => ({ dev: state.nomedev.dev }))(Devlist);

import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Form from "../../components/formcadastro";

import "./style.css";

function Devlist() {
  const [nomes, setnomes] = useState([]);

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

  return (
    <div className="container-main">
      <h2 className="h2l">Cadastras novo devedor</h2>
      <Form />

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

export default Devlist;

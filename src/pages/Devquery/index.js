import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Form from "../../components/formcadastro";

import "./style.css";

export default function Devquery() {
  const dev = localStorage.dev;
  const [devedores, setDevedores] = useState([]);

  const token = localStorage.getItem("token");
  const Auth = `Bearer ${token}`;

  useEffect(() => {
    function devQuery() {
      api
        .get(`/devedores/order/${dev}`, { headers: { Authorization: Auth } })
        .then(res => {
          const data = res.data;
          const devedores = data;
          setDevedores(devedores);
        });
    }

    devQuery();

    // eslint-disable-next-line
  }, []);

  function deletDev(id) {
    api
      .delete(`/devedores/${id}`, { headers: { Authorization: Auth } })

      .catch(error => {
        console.log(error);
      });
  }

  /*
    <input
        type="checkbox"
        id="detalhesdev"
        onClick={() => {
          if (detalhesdev.checked) {
            console.log("mostrar");
          } else {
            console.log("esconder");
          }
      }}
    />
        mostrar detalhes
  */

  //var detalhesdev = document.getElementById("detalhesdev");

  return (
    <div className="container-main-dev">
      <h2 className="h2">Cadastrar nova divida para {dev}</h2>
      <Form />
      <div className="container-list-dev">
        <Link to="/list">
          <button
            className="botao-voltar"
            value="submit"
            onClick={() => localStorage.removeItem("dev")}
          >
            Voltar
          </button>
        </Link>
        <ul>
          {devedores.map(devedor => (
            <li key={devedor._id}>
              <strong>Nome: {devedor.nome}</strong>
              <strong>Valor da divida: {devedor.Vdiv}</strong>
              <strong>Parcelas: {devedor.parc}</strong>
              <button type="submit" onClick={() => deletDev(devedor._id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

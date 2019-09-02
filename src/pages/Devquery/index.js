import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./style.css";

export default function Devquery() {
  const dev = localStorage.dev;
  const [devedores, setDevedores] = useState([]);
  useEffect(() => {
    function devQuery() {
      api.get(`/devedores/order/${dev}`).then(res => {
        const data = res.data;
        const devedores = data;
        setDevedores(devedores);
        console.log(res);
      });
    }

    devQuery();

    // eslint-disable-next-line
  }, []);

  function deletDev(id) {
    api
      .delete(`/devedores/${id}`)

      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="container-list-dev">
      <Link to="/list">
        <button value="submit" onClick={() => this.props.history.goBack()}>
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
  );
}

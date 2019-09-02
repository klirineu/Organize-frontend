import React, { useState } from "react";
import api from "../services/api";
import "./style.css";
// import { Container } from './styles';

export default function Form() {
  const [newnome, setnewnome] = useState("");
  const [newVdiv, setnewVdiv] = useState("");
  const [newparc, setnewparc] = useState("");

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
    <form className="formulario">
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
  );
}

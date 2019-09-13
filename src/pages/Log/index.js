import React, { useState } from "react";
import "./style.css";
import api from "../../services/api";

export default function Log(props) {
  const [nome, setnome] = useState("");
  const [senha, setsenha] = useState("");

  function handleclick(e) {
    if (nome === "" || senha === "") {
      return alert("Login inválido");
    }

    api
      .post("/authenticate", { nome, senha })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/list");

        return;
      })
      .catch(err => {
        alert("Usuário invalido");
      });
  }

  return (
    <div className="log">
      <h2 className="log0">Login</h2>
      <input
        className="log1"
        name="nome"
        value={nome}
        onChange={e => setnome(e.target.value)}
        id="user"
        type="text"
        placeholder="User name:"
      />
      <input
        className="log2"
        name="senha"
        value={senha}
        onChange={e => setsenha(e.target.value)}
        id="pass"
        type="password"
        placeholder="User password:"
      />

      <button id="btn" onClick={handleclick}>
        Log in
      </button>
    </div>
  );
}

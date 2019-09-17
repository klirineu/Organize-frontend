import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Form from "../../components/formcadastro";
import { Link } from "react-router-dom";

import "./style.css";

export default function Devquery(props) {
  const dev = localStorage.dev;
  const [devedores, setDevedores] = useState([]);
  const [newnome, setnewnome] = useState("");
  const [newVdiv, setnewVdiv] = useState("");
  const [newparc, setnewparc] = useState("");

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

  function mostrar(id, e) {
    e.preventDefault()
    document.getElementById(id).style.display = "block";
  }

  function esconder(id, e) {
    e.preventDefault()
    document.getElementById(id).style.display = "none";
  }

  function voltar() {
    localStorage.removeItem("dev");
  }

  function editar(devedores) {
    
    var nome = newnome;
    var Vdiv = newVdiv;
    var parc = newparc;

    if (nome === "") {
      nome = devedores.nome;
    }
    if (Vdiv === "") {
      Vdiv = devedores.Vdiv;
    }
    if (parc === "") {
      parc = devedores.parc;
    }

    const devedor = {
      nome: nome,
      Vdiv: Vdiv,
      parc: parc
    };

    api
      .put(
        `/devedores/edit/${devedores._id}`,
        { devedor },
        { headers: { Authorization: Auth } }
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function pago(devedor, e) {
    api.post(`/devedores/${devedor._id}/counter`, { headers: { Authorization: Auth } }).catch(error => console.log(error)) 
    const parc = parseFloat(devedor.parc)
    const counter = parseFloat(devedor.counter)+1
    
    if(counter === parc || counter >= parc) {  
        
      alert("Última parcela já foi paga, exclua a divida")
    
    }   
  }
  return (
    <div className="container-main-dev">
      <p id="demo"></p>
      <h2 className="h2">Cadastrar nova divida para {dev}</h2>
      <Form />
      <div className="container-list-dev">
        <Link to="/list">
          <button className="botao-voltar" value="submit" onClick={voltar}>
            Voltar
          </button>
        </Link>
        <ul>
          {devedores.map(devedor => (
            <li key={devedor._id}>
              <form>
                <strong>Nome: {devedor.nome}</strong>
                <strong>Valor: {devedor.Vdiv}</strong>
                <strong>Parcelas: {devedor.counter}/{devedor.parc}</strong>
                <button onClick={e => pago(devedor, e)}>Pago</button>
                <button  id="myBtn" onClick={e => mostrar(devedor._id, e)}>
                  Detalhes
                </button>
              </form>
              
              <div id={devedor._id} key={devedor._id} className="modal">
                <div className="modal-content">
                  <form>
                    <button
                      className="close"
                      onClick={e => esconder(devedor._id, e)}
                    >
                      <span>&times;</span>
                    </button>

                    <strong>Nome: </strong>
                    <input
                      type="text"
                      name="nome"
                      value={newnome}
                      placeholder={devedor.nome}
                      onChange={e => setnewnome(e.target.value)}
                    ></input>

                    <strong>Valor: </strong>
                    <input
                      type="Number"
                      name="valor"
                      value={newVdiv}
                      placeholder={devedor.Vdiv}
                      onChange={e => setnewVdiv(e.target.value)}
                    />

                    <strong>Parcelas: </strong>
                    <input
                      type="Number"
                      name="parcelas"
                      value={newparc}
                      placeholder={devedor.parc}
                      onChange={e => setnewparc(e.target.value)}
                    />

                    <button type="submit" onClick={() => editar(devedor)}>
                      Editar
                    </button>
                    <button type="submit" onClick={() => deletDev(devedor._id)}>
                      Excluir
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

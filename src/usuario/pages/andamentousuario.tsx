import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/estilos.css";
import "../../css/table.css";
import { Link } from "react-router-dom";

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  idSuporte: string;
  idUsuario: number;
  usuario: {
    id: number;
    nomeUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
  };
  andamento: {
    idAndamento: number;
    descAndamento: string;
    prioridadeAndamento: string;
  };
  suporte: {
    id: number;
    nomeUsuario: string;
  };
}

function AndamentoUsuario() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const urls = [
      "http://localhost:3000/chamados/andamento/1",
      "http://localhost:3000/chamados/andamento/2",
      "http://localhost:3000/chamados/andamento/3",
      "http://localhost:3000/chamados/andamento/4"
    ];

    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const chamadosData = responses.flatMap(response => response.data);
        setChamados(chamadosData);

        const counts = responses.map(response => response.data.length);
        setCounts(counts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatarData = (data: string) => {
    const dataAbertura = new Date(data);
    const dia = String(dataAbertura.getDate()).padStart(2, "0");
    const mes = String(dataAbertura.getMonth() + 1).padStart(2, "0");
    const ano = String(dataAbertura.getFullYear()).slice(-2);
    const hora = String(dataAbertura.getHours()).padStart(2, "0");
    const minutos = String(dataAbertura.getMinutes()).padStart(2, "0");
    const segundos = String(dataAbertura.getSeconds()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
  };

  return (
    <div>
      <h2>Chamado nº </h2>
      <hr />
      <div className="containerForm">
        <div className="LabelS">
          <span className="description">Nome do usuário</span>
          <input
            type="text"
            placeholder=""
            value={chamados[0]?.usuario.nomeUsuario || ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Data da abertura</span>
          <input
            type="text"
            placeholder=""
            value={formatarData(chamados[0]?.dataAberturaChamado || "")}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Assunto</span>
          <input
            type="text"
            placeholder=""
            value={chamados[0]?.nomeChamado || ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <label>Descrição</label>
          <textarea
            className="descricao-input"
            placeholder=""
            value={chamados[0]?.descChamado || ""}
            readOnly
          ></textarea>
        </div>

        <div className="LabelS">
          <span className="description">Sala</span>
          <input
            type="text"
            placeholder=""
            value="idLab"
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Dispositivo</span>
          <input
            type="text"
            placeholder=""
            value="idComputador"
            readOnly
          />
        </div>
        
        <div className="LabelS">
          <span className="description">Status </span>
        </div>
        <div className="checkbox-group">
          
        
          <input type="checkbox" id="checkbox1" name="checkbox1" />
          <label htmlFor="checkbox1">Concluído</label>

          <input type="checkbox" id="checkbox2" name="checkbox2" />
          <label htmlFor="checkbox2">Aguardando</label>

          <input type="checkbox" id="checkbox3" name="checkbox3" />
          <label htmlFor="checkbox3">Atrasado</label>
          
        </div>

        <div className="LabelS">
          <span className="description">Prioridade </span>
        </div>
        <div className="checkbox-group">
          
        
          <input type="checkbox" id="checkbox1" name="checkbox1" />
          <label htmlFor="checkbox1">Alta</label>

          <input type="checkbox" id="checkbox2" name="checkbox2" />
          <label htmlFor="checkbox2">Média</label>

          <input type="checkbox" id="checkbox3" name="checkbox3" />
          <label htmlFor="checkbox3">Baixa</label>
          
        </div>

        <div className="LabelS">
          <label>Andamento</label>
          <textarea
            className="descricao-input"
            placeholder="Andamento do chamado"
            readOnly
          ></textarea>
        </div>

        {/* Render the chamados data */}
        {/* {chamados.map(chamado => (
          <div key={chamado.id}>
            <h3>{chamado.nomeChamado}</h3>
            <p>{chamado.descChamado}</p>
            <p>Data de Abertura: {formatarData(chamado.dataAberturaChamado)}</p>
            <p>ID do Suporte: {chamado.idSuporte}</p>
            <p>ID do Usuário: {chamado.idUsuario}</p>
            <p>Nome do Usuário: {chamado.usuario.nomeUsuario}</p>
            <p>Email do Usuário: {chamado.usuario.emailUsuario}</p>
            <p>Telefone do Usuário: {chamado.usuario.telefoneUsuario}</p>
            <p>ID do Andamento: {chamado.andamento.idAndamento}</p>
            <p>Descrição do Andamento: {chamado.andamento.descAndamento}</p>
            <p>Prioridade do Andamento: {chamado.andamento.prioridadeAndamento}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default AndamentoUsuario;
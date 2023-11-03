import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/estilos.css";
import "../../css/table.css";
import { Link, useParams } from "react-router-dom";

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
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chamados/${id}`);
        setChamado(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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
      <h2>Chamado nº {chamado?.id}</h2>
      <hr />
      <div className="containerForm">
        <div className="LabelS">
          <span className="description">Nome do usuário</span>
          <input
            type="text"
            placeholder=""
            value={chamado?.usuario.nomeUsuario || ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Data da abertura</span>
          <input
            type="text"
            placeholder=""
            value={formatarData(chamado?.dataAberturaChamado || "")}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Assunto</span>
          <input
            type="text"
            placeholder=""
            value={chamado?.nomeChamado || ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <label>Descrição</label>
          <textarea
            className="descricao-input"
            placeholder=""
            value={chamado?.descChamado || ""}
            readOnly
          ></textarea>
        </div>

        <div className="LabelS">
          <span className="description">Sala</span>
          <input
            type="text"
            placeholder="idLab"
            value=""
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Dispositivo</span>
          <input
            type="text"
            placeholder="idComputador"
            value=""
            readOnly
          />
        </div>
        
        <div className="checkbox-group">
        <div className="LabelSt">
          <span className="description">Status</span>
          <input
            type="text"
            placeholder="status"
            value=""
            readOnly
          />
        </div>
        <div className="LabelSt">
          <span className="description">Prioridade</span>
          <input
            type="text"
            placeholder="prioridade"
            value=""
            readOnly
          />
        </div>
        </div>

        {/* <div className="LabelS">
          <span className="description">Status </span>
        </div>
        <div className="checkbox-group">
          
        
          <input type="checkbox" id="checkbox1" name="checkbox1" />
          <label htmlFor="checkbox1">Concluído</label>

          <input type="checkbox" id="checkbox2" name="checkbox2" />
          <label htmlFor="checkbox2">Aguardando</label>

          <input type="checkbox" id="checkbox3" name="checkbox3" />
          <label htmlFor="checkbox3">Atrasado</label>
          
        </div> */}

        {/* <div className="LabelS">
          <span className="description">Prioridade </span>
        </div>
        <div className="checkbox-group">
          
        
          <input type="checkbox" id="checkbox1" name="checkbox1" />
          <label htmlFor="checkbox1">Alta</label>

          <input type="checkbox" id="checkbox2" name="checkbox2" />
          <label htmlFor="checkbox2">Média</label>

          <input type="checkbox" id="checkbox3" name="checkbox3" />
          <label htmlFor="checkbox3">Baixa</label>
          
        </div> */}

        <div className="LabelS">
          <label>Andamento</label>
          <textarea
            className="descricao-input"
            placeholder="Andamento do chamado"
            value={chamado?.andamento.descAndamento || ""}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default AndamentoUsuario;
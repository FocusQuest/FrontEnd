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
  usuario: {
    id: number;
    nomeUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
  };
  andamento: {
    idAndamento: number,
    descAndamento: string
    prioridadeAndamento: string
  };
  suporte: {
    id: number,
    nomeUsuario: string 
  };
  prioridade: {
    idPrioridade: number;
    descPrioridade: string;
  };
};

function PainelTec() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const urls = [
      'http://localhost:3000/chamados/andamento/1',
      'http://localhost:3000/chamados/andamento/2',
      'http://localhost:3000/chamados/andamento/3',
      'http://localhost:3000/chamados/andamento/4'
     
    ];
  
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const chamadosData = responses.flatMap(response => response.data);
        setChamados(chamadosData);//         
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
        const dia = String(dataAbertura.getDate()).padStart(2, '0');
        const mes = String(dataAbertura.getMonth() + 1).padStart(2, '0');
        const ano = String(dataAbertura.getFullYear()).slice(-2);
        const hora = String(dataAbertura.getHours()).padStart(2, '0');
        const minutos = String(dataAbertura.getMinutes()).padStart(2, '0');
        const segundos = String(dataAbertura.getSeconds()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
      };

      const handleButtonClick = (id: number) => {
        
        console.log(`Botão 'Andamento' clicado para o Chamado ${id}`);
      };


  return (
    <div>
      <h2>Meu Painel</h2>
      <hr></hr>
      <div className="containerBoxes">
        <div className="box" id="box2">
          <div className="box-content">
            <h2>Chamados Novos</h2>
            <h2>{counts[0]}</h2>
          </div>
        </div>

        <div className="box" id="box3">
          <div className="box-content">
            <h2>Chamados Abertos</h2>
            <h2>{counts[1]}</h2>
          </div>
        </div>

        <div className="box" id="box1">
          <div className="box-content">
            <h2>Chamados atrasados</h2>
            <h2>{counts[2]}</h2>
          </div>
        </div>
        <div className="box" id="box4">
          <div className="box-content">
            <h2>Chamados Concluídos</h2>
            <h2>{counts[3]}</h2>
          </div>
        </div>
      </div>
      <h2>Chamados recentes</h2>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Número do Chamado</th>
            <th>Assunto</th>
            <th>Técnico Responsável</th>
            <th>Data da abertura</th>
            <th>Nome do usuario</th>
            <th>E-mail do Usuário</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
              {chamados
          .sort((a, b) => new Date(b.dataAberturaChamado).getTime() - new Date(a.dataAberturaChamado).getTime())
          .slice(0, 5)
          .map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.suporte?.nomeUsuario || ''}</td> 
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.usuario.nomeUsuario}</td>
              <td>{chamado.usuario.emailUsuario}</td>
              <td>             
              <Link to={`/tecnico/Andamento_tecnico/${chamado.id}`}>
                <button onClick={() => handleButtonClick(chamado.id)}>{chamado.andamento.descAndamento}</button>
              </Link>
              </td> 
              <td>{chamado.prioridade.descPrioridade }</td> {/* retornará a prioridade que o adm atribuir */}            
              </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default PainelTec;

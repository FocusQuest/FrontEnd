
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
  }
};

function Painel() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  

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
    // Lógica para lidar com o clique do botão
    console.log(`Botão 'Andamento' clicado para o Chamado ${id}`);
  };



  return (
    <div>
      <h2> Meus chamados</h2>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Número do Chamado</th>
            <th>Assunto</th>
            <th>Técnico Responsável</th>
            <th>Data da abertura</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {chamados
          .sort((a, b) => new Date(b.dataAberturaChamado).getTime() - new Date(a.dataAberturaChamado).getTime())
          .filter((chamado) => chamado.usuario.id === parseInt(String(localStorage.getItem("idUsuario"))))
          .map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.suporte?.nomeUsuario || ''}</td> {/* Lógica para exibir o Id do técnico responsável, precisa puxar o nome */}
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td >
              <Link to={`/usuario/Andamento_usuario/${chamado.id}`}>
                <button onClick={() => handleButtonClick(chamado.id)}>
                  {chamado.andamento.descAndamento}
                </button>
              </Link>
              </td>             
              <td></td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Painel;

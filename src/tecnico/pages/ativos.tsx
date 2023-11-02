import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
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
};

const ChamadosAtivos: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  

  useEffect(() => {
    const urls = [
      'http://localhost:3000/chamados/andamento/2',
      'http://localhost:3000/chamados/andamento/3'
    ];
  
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const chamadosData = responses.flatMap(response => response.data);
        setChamados(chamadosData);
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
      <h2>Chamados ativos</h2>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Número do Chamado</th>
            <th>Assunto</th>
            <th>Data da abertura</th>
            <th>Nome do usuario</th>
            <th>E-mail do Usuário</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              {/* <td>{chamado.descChamado}</td> */}
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.usuario.nomeUsuario}</td>
              <td>{chamado.usuario.emailUsuario}</td>
              <td><button onClick={() => handleButtonClick(chamado.id)}>Andamento</button></td>
              <td>{chamado.andamento.prioridadeAndamento }</td> {/* retornará a prioridade que o adm atribuir */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChamadosAtivos;
            
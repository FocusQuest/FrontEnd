import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  usuario: {
    id: number;
    nomeChamado: string;
    descChamado: string;
    dataAberturaChamado: string;
    situacao: string;
    prioridade: string;
    nomeUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
  };
}

const ChamadosList: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/chamados')
      .then((response) => setChamados(response.data))
      .catch((error) => console.error(error));
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

  return (<div>
    <h2>Chamados ativos</h2>
    <hr></hr>
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Assunto</th>
          {/* <th>Descrição</th> */}
          <th>Data da abertura</th>
          <th>Nome do Usuário</th>
          <th>Email do Usuário</th>
          <th>Status</th>
          <th>Prioridade</th>
          
        </tr>
      </thead>
      <tbody>
        {chamados.map(chamado => (
          <tr key={chamado.id}>
            <td>{chamado.id}</td>
            <td>{chamado.nomeChamado}</td>
            {/* <td>{chamado.descChamado}</td> */}
            <td>{formatarData(chamado.dataAberturaChamado)}</td>
            <td>{chamado.usuario.nomeUsuario}</td>
            <td>{chamado.usuario.emailUsuario}</td>              
            <td><button onClick={() => handleButtonClick(chamado.id)}>Andamento</button></td>
            <td></td>                      
            
          </tr>
        ))}
      </tbody>

    </table>
  </div>
  

);
  
};
export default ChamadosList;
             
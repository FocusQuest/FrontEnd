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
}

const ChamadosList: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3000/chamados')
      .then((response) => setChamados(response.data))
      .catch((error) => console.error(error));
  }, []);

  const formatarData = (data: string): React.ReactNode => {
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
  };

  const handlePrioridadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioridadeSelecionada(event.target.value);
  };

  return (
    <div>
      <h2>Chamados ativos</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Assunto</th>
            <th>Data da abertura</th>
            <th>Nome do Usuário</th>
            <th>Email do Usuário</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.usuario.nomeUsuario}</td>
              <td>{chamado.usuario.emailUsuario}</td>
              <td>
                <button onClick={() => handleButtonClick(chamado.id)}>Andamento</button>
              </td>
              <td>
                <select value={prioridadeSelecionada} onChange={handlePrioridadeChange}>
                  <option value="">Selecione</option>
                  <option value="alta">Alta</option>
                  <option value="média">Média</option>
                  <option value="baixa">Baixa</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChamadosList;


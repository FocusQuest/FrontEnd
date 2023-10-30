import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/estilos.css'
import '../../css/table.css';

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  nomeUsuario: string;
  situacao: string;
  prioridade: string;

  // Include other properties here
}

function ChamadosAtivos() {
  const [chamados , setChamados] = useState<Chamado[]>([]);
  const userId = 2; // Replace with the actual user ID value

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await axios.get<Chamado[]>(`http://localhost:3000/chamados/usuario/${userId}`);
        setChamados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChamados();
  }, [userId]);

  const handleButtonClick = (id: number) => {
      // Lógica para lidar com o clique do botão
      console.log(`Botão 'Andamento' clicado para o Chamado ${id}`);
    };

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

  return (
    
    <div>
      <h2>Chamados Ativos</h2>
      <hr></hr>      
      <table>
        <thead>
          <tr>
            <th>Descrição do Chamado</th>
            <th>Número do Chamado</th>
            <th>Nome do Usuário</th>
            <th>Data da abertura</th>
            <th>Situação do Chamado</th>            
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(chamado => (
            <tr key={chamado.id}>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.id}</td>
              <td>{chamado.nomeUsuario}</td> {/* precisa puxar pelo id do usuario do chamado */}
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.situacao}</td>
              <td>{chamado.prioridade}</td>
              <td>
                <button onClick={() => handleButtonClick(chamado.id)}>Andamento</button>
              </td>
              {/* Render other properties here */}
            </tr>            
            ))}
          </tbody>        
      </table>
    </div>
    

  );
}

export default ChamadosAtivos;
  
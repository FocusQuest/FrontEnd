import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/estilos.css'
import '../../css/table.css';

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  // Include other properties here
}

function ChamadosUsuarios() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
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
      console.log(`Botão 'Andamento' clicado para o chamado ${id}`);
    };

    const formatarData = (data: string) => {
      const dataAbertura = new Date(data);
      const dia = String(dataAbertura.getDate()).padStart(2, '0');
      const mes = String(dataAbertura.getMonth() + 1).padStart(2, '0');
      const ano = String(dataAbertura.getFullYear()).slice(-2);
      return `${dia}/${mes}/${ano}`;
    };

  return (
    
    <div>
      <h2>Meus chamados</h2>
      <hr></hr>      
      <table>
        <thead>
          <tr>
            <th>Número do Chamado</th>
            <th>Nome do Chamado</th>
            <th>Descrição do chamado</th>
            <th>Data da abertura</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(chamado => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.descChamado}</td>
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
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

export default ChamadosUsuarios;
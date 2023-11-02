import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/estilos.css";
import "../../css/table.css";

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
}

function PainelTec() {
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
      <h2>Meu Painel</h2>
      <hr></hr>
      <div className="containerBoxes">
        <div className="box" id="box2">
          <div className="box-content">
            <h2>Chamados Abertos</h2>
            <p>10</p>
          </div>
        </div>

        <div className="box" id="box1">
          <div className="box-content">
            <h2>Chamados Atrasados</h2>
            <p>5</p>
          </div>
        </div>

        <div className="box" id="box3">
          <div className="box-content">
            <h2>Chamados Concluídos</h2>
            <p>3</p>
          </div>
        </div>
      </div>
      <h2>Chamados recentes</h2>
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
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.descChamado}</td>
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>
                <button onClick={() => handleButtonClick(chamado.id)}>
                  Andamento
                </button>
              </td>
             
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PainelTec;

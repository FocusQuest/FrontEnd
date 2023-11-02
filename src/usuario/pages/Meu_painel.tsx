// import React from "react";

// function Painel() {
//   return (
//     <div>
//       <h2>Meu Painel</h2>
//       <hr></hr>
//       <div className="containerBoxes">
//         <div className="box" id="box2">
//           <div className="box-content">
//             <h2>Chamados Abertos</h2>
//             <p>10</p>
//           </div>
//         </div>

//         <div className="box" id="box1">
//           <div className="box-content">
//             <h2>Chamados Atrasados</h2>
//             <p>5</p>
//           </div>
//         </div>

//         <div className="box" id="box3">
//           <div className="box-content">
//             <h2>Chamados Concluídos</h2>
//             <p>3</p>
//           </div>
//         </div>

//       </div>
//       <h2>Chamados recentes</h2>
//       <hr></hr>
      
//     </div>
//   );
// }

// export default Painel;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/estilos.css";
import "../../css/table.css";

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  idSuporte: number;
  
}

function Painel() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const userId = localStorage.getItem("idUsuario"); 

 
const fetchChamados = async () => {
  try {
    const response = await axios.get<Chamado[]>(
      `http://localhost:3000/chamados/usuario/${userId}`,
    );
    setChamados(response.data.slice(0, 5)); // Limita para os 5 primeiros chamados
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetchChamados();
  }, []);

  const handleButtonClick = (id: number) => {
    // Lógica para lidar com o clique do botão
    console.log(`Botão 'Andamento' clicado para o chamado ${id}`);
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
            <th>Assunto</th>
            <th>Técnico responsável</th>
            <th>Data da abertura</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.idSuporte}</td>
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>
                <button onClick={() => handleButtonClick(chamado.id)}>
                  Andamento
                </button>
              </td>
              {/* Render other properties here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Painel;
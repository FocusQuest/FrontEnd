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
    id: number,
    descPrioridade: string
  };
};

const ChamadosList: React.FC = () => {
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
      <h2>Chamados</h2>
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
        .map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.suporte ? chamado.suporte.nomeUsuario : ''}</td> 
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.usuario.nomeUsuario}</td>
              <td>{chamado.usuario.emailUsuario}</td>
              <td>             
              <Link to={`/adm/Andamento_adm/${chamado.id}`}>
                <button onClick={() => handleButtonClick(chamado.id)}>{chamado.andamento.descAndamento}</button>
              </Link>
              </td> 
              <td>{chamado.prioridade.descPrioridade}</td>           
              </tr>
              
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChamadosList;

{/* // import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// type Chamado = { */}
//   idChamado: number
//   nomeChamado: string;
//   descChamado: string;
//   idPrioridade: number;
//   dataAberturaChamado: string;
//   usuario: {
//     id: number;
//     nomeUsuario: string;
//     emailUsuario: string;
//     telefoneUsuario: string;
//   };
//   idSuporte: number;
// }


// const onSubmit = async (data: Chamado) => {
//   try {
    
//     const idChamado = data.idChamado;
//     console.log("id chamado:", data.idChamado);
//     const idPrioridade = data.idPrioridade;
//     console.log("prioridade:", data.idPrioridade);
//     const response = await axios.patch("http://localhost:3000/chamados", data);
//     console.log("Resposta:", response); // Log the response
//     if (response.status === 201) {
//       const addedPrioridade = response.data;
//       // Do something with the created chamado object
//       console.log("AddedPrioridade:", addedPrioridade); // For example, log the created chamado
//     } else {
//       // Handle the error case
//       console.log("Erro ao criar chamado");
//     }
//   } catch (error) {
//     // Handle any network or other errors
//     console.error("Error:", error);
//   }
// };

// // Pensar em uma forma de mostrar uma mensagem caso dê erro ao atribuir a prioridade



// const ChamadosList: React.FC = () => {
//   const [chamados, setChamados] = useState<Chamado[]>([]);
//   //const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");  ---- Sem essar parte 

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/chamados')
//       .then((response) => setChamados(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const formatarData = (data: string): React.ReactNode => {
//     const dataAbertura = new Date(data);
//     const dia = String(dataAbertura.getDate()).padStart(2, '0');
//     const mes = String(dataAbertura.getMonth() + 1).padStart(2, '0');
//     const ano = String(dataAbertura.getFullYear()).slice(-2);
//     const hora = String(dataAbertura.getHours()).padStart(2, '0');
//     const minutos = String(dataAbertura.getMinutes()).padStart(2, '0');
//     const segundos = String(dataAbertura.getSeconds()).padStart(2, '0');
//     return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
//   };

//   const handleButtonClick = (id: number) => {
//     //  Lógica para lidar com o clique do botão
//   };

//   const handlePrioridadeChange = (event: React.ChangeEvent<HTMLSelectElement>, chamadoId: number) => {
//     setChamados((prevChamados) =>
//       prevChamados.map((chamado) =>
//         chamado.idChamado === chamadoId ? { ...chamado, prioridade: event.target.value } : chamado
//       )
//     );
//   };

//   return (
//     <div>
//       <h2>Chamados ativos</h2>
//       <hr />
//       <table>
//         <thead>
//           <tr>
//             <th>Número</th>
//             <th>Assunto</th>
//             <th>Data da abertura</th>
//             <th>Técnico Responsável</th>
//             <th>Nome do Usuário</th>
//             <th>Email do Usuário</th>
//             <th>Status</th>
//             <th>Prioridade</th>
//           </tr>
//         </thead>
//         <tbody>
//           {chamados.map((chamado) => (
//             <tr key={chamado.idChamado}>
//               <td>{chamado.idChamado}</td>
//               <td>{chamado.nomeChamado}</td>
//               <td>{formatarData(chamado.dataAberturaChamado)}</td>
//               <td>{chamado.idSuporte}</td>
//               <td>{chamado.usuario.nomeUsuario}</td>
//               <td>{chamado.usuario.emailUsuario}</td>
//               <td>
//                 <button onClick={() => handleButtonClick(chamado.idChamado)}>Andamento</button>
//               </td>
//               <td>
//               <select value={chamado.idPrioridade} onChange={(event) => handlePrioridadeChange(event, chamado.idChamado)} 
//               className={errors?.idCategoria && "input-error"}
//               defaultValue="0"
//               {...register("idPrioridade", { validate: (value) => value !== 0 })}
//               >               
//                <option value="0">Selecione</option>
//                <option value="3">Alta</option>
//                <option value="2">Média</option>
//                <option value="1">Baixa</option>
//               </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ChamadosList;
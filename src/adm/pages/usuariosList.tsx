import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/table.css';
import { Link } from "react-router-dom";

interface Usuario {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  telefoneUsuario: string;
}

const UsuariosList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const handleButtonClick = (id: number) => {
    // Lógica para lidar com o clique do botão
    console.log(`Botão para alterar o usuário ${id}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/usuarios')
      .then((response) => setUsuarios(response.data.usuarios))
      .catch((error) => console.error(error));
  }, []);

  // Add a conditional rendering check
  if (usuarios.length === 0) {
    return <div>Loading...</div>;
  }

  return (
  
    <div>
      <h2>Usuários registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((Usuario) => (
            <tr key={Usuario.id}>
              <td>{Usuario.nomeUsuario}</td>
              <td>{Usuario.emailUsuario}</td>
              <td>{Usuario.telefoneUsuario}</td>
              <td>
              <Link to={`alterar_usuario/:id${Usuario.id}`}>
                <button 
                  style={{ 
                    display: 'block', 
                    marginLeft: 'auto', 
                    marginRight: 'auto' 
                  }}
                  onClick={() => handleButtonClick(Usuario.id)}
                >
                  Editar
                </button>
              </Link>
            </td>
            <td><button 
                  style={{ 
                    display: 'block', 
                    marginLeft: 'auto', 
                    marginRight: 'auto' 
                  }}
                  onClick={() => handleButtonClick(Usuario.id)}
                >
                  Excluir
                </button></td>           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default UsuariosList;



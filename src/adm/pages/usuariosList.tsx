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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default UsuariosList;


//   The initial state of the usuarios array is set to an empty array using the useState hook.

//   In the useEffect hook, an HTTP request is made to fetch the usuarios data from the server using the axios library. The response data is then set as the new value of the usuarios array using the setUsuarios function.
  
//   To handle the scenario where the usuarios array is empty (i.e., when the data is still being fetched), a conditional rendering check is added. The check compares the length of the usuarios array to 0. If the array is empty, a "Loading..." message is rendered.
  
//   Once the data is fetched and the usuarios array is populated, the component will render the list of users as before.
  
//   By adding this conditional rendering check, the component ensures that it only renders the list of users when the data is available. This prevents any potential errors or unexpected behavior that could occur when trying to access and render the data before it is fetched.
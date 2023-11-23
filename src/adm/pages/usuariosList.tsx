import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/table.css';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

interface Usuario {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  telefoneUsuario: string;
}

const UsuariosList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleButtonClick = (id: number) => {
    // Lógica para lidar com o clique do botão
    console.log(`Botão para alterar o usuário ${id}`);
  };

  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/usuarios`)
      .then((response) => setUsuarios(response.data.usuarios))
      .catch((error) => console.error(error));
  }, []);
  
  const handleExcluirUsuario = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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
              <Link to={`/adm/alterar_usuario/${Usuario.id}`}>
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
            <td>
              <button 
                style={{ 
                  display: 'block', 
                  marginLeft: 'auto', 
                  marginRight: 'auto' 
                }}              
                onClick={() => handleExcluirUsuario(Usuario.id)}
              >
                Excluir
              </button>  
            </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default UsuariosList;



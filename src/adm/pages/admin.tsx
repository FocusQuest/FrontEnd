import React from 'react';
import { Link } from 'react-router-dom';
import '../css/estilosadm.css';

function Admin() {
  return (
    <div className="containerAdmin">
      <h2>Administração</h2>
      <hr></hr>
      <div className="button-container">
        <Link to="/adm/Criar_usuario" className="admin-link">
          <button className="admin-button" style={{ backgroundColor: '#5E5E5E' }}>
            Criar Usuário
          </button>
        </Link>
        <Link to="/adm/alterar_usuario" className="admin-link">        
          <button className="admin-button" style={{ backgroundColor: '#7E7E7E' }}>
            
            Alterar usuário
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Admin;



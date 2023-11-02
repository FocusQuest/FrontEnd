import '../css/index.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/estilos.css';
import React from 'react';

function MenuAdm(): JSX.Element {
  return (
    <>
      <div className='MenuSup'>
        <div id='MenuSupItem'>
          
        </div>
        <div>
        {" "}
             {localStorage.getItem("nomeUsuario")}{" "} <br></br> Administrador
        </div>
      </div>
      <div className="Menu">
        <div className="container-fluid">
          <div className="row">           
            <nav id="sidebar">
              <div className="sidebar-header">
                <h4> HelpDesk</h4>
              </div>
              <div className="list-unstyled components">
              <Nav.Link as={Link} to="admin"> Administração </Nav.Link>                    
                <Nav.Link as={Link} to="ferramentas"> Ferramentas </Nav.Link>
                <Nav.Link as={Link} to="usuarios"> Usuarios </Nav.Link>
                <Nav.Link as={Link} to="Chamados"> Chamados</Nav.Link>
              </div>
            </nav>            
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAdm;
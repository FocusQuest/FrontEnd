import '../css/index.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/estilos.css';
import React from 'react';

function MenuTec(): JSX.Element {
  return (
    <>
      <div className='MenuSup'>
        <div id='MenuSupItem'>
          <img src="./img/sino.png" alt="sino" />
        </div>
        <div>
          <h5> Nome do usuário <br /> Técnico </h5>
        </div>
      </div>
      <div className="sidebar-fixed">
        <div className="container-fluid">
          <div className="row">            
            <nav id="sidebar">
              <div className="sidebar-header">
                <h4> HelpDesk</h4>
              </div>
              <div className="list-unstyled components">
                <Nav.Link as={Link} to="Painel_tecnico"> Meu painel </Nav.Link>
                <Nav.Link as={Link} to="Ferramentas_tec"> Ferramentas </Nav.Link>
                {/* <Nav.Link as={Link} to="Ativos"> Ativos </Nav.Link> */}
                <Nav.Link as={Link} to="Ativos"> Chamados Ativos </Nav.Link>
              </div>
            </nav>          
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuTec;



import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menu.css";
import sair from "../img/sair.png";

function MenuAdm(): JSX.Element {
  return (
    <>
      <div className="MenuSup" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div id="MenuSupItem">          
        </div>
        <div>
          <h5>
            {" "}
             {localStorage.getItem("nomeUsuario")}{" "} <br></br> Administrador
          </h5>
        </div>
        <div>
          <Nav.Link as={Link} to="/">
            <img src={sair} alt="Sair" className="logout-icon" /> {" "} Sair{" "}
          </Nav.Link>
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
              <Nav.Link as={Link} to="Painel_adm"> Dashboard </Nav.Link>
              <Nav.Link as={Link} to="admin"> Administração </Nav.Link>                                  
              <Nav.Link as={Link} to="usuarios"> Usuarios </Nav.Link>
              <Nav.Link as={Link} to="Chamados"> Chamados</Nav.Link>
              <a href="/docs/Manual do administrador (1).pdf" target="_blank">Manual do usuário</a>
              </div>
            </nav>            
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAdm;
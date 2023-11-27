import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menu.css";
import sair from "../img/sair.png";

function MenuTec(): JSX.Element {
  return (
    <>
      <div className="MenuSup" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div id="MenuSupItem">          
        </div>
        <div>
          <h5>
            {" "}
             {localStorage.getItem("nomeUsuario")}{" "} <br></br> Técnico
          </h5>
        </div>
        <div>
          <Nav.Link as={Link} to="/">
            <img src={sair} alt="Sair" className="logout-icon" /> {" "} Sair{" "}
          </Nav.Link>
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
                <Nav.Link as={Link} to="Painel_tecnico">
                  {" "}
                  Meu painel{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="Ferramentas_tec">
                  {" "}
                  Ferramentas{" "}
                </Nav.Link>
                {/* <Nav.Link as={Link} to="Ativos"> Ativos </Nav.Link> */}
                <Nav.Link as={Link} to="Ativos">
                  {" "}
                  Chamados{" "}
                </Nav.Link>
                <a href="/docs/Manual do técnico.pdf" target="_blank">Manual do usuário</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuTec;



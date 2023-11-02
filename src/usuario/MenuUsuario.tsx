import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menu.css";

function MenuUsuario(): JSX.Element {
  return (
    <>
      <div className="MenuSup">
        <div id="MenuSupItem">
          {/* <img src="./img/sino.png" alt="sino" /> */}
        </div>
        <div>
          <h5>
            {" "}
             {localStorage.getItem("nomeUsuario")}{" "} <br></br> Usuário
          </h5>
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
                <Nav.Link as={Link} to="Meu_painel">
                  {" "}
                  Meu painel{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="Duvidas">
                  {" "}
                  Dúvidas frequentes{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="Abrir_chamado">
                  {" "}
                  Abrir chamado{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="Meus_chamados">
                  {" "}
                  Meus chamados{" "}
                </Nav.Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuUsuario;

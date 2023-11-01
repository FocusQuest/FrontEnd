// import '../css/index.css';
// import { Link } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../css/estilos.css";
// import "../../css/table.css";

// interface Chamado {
//   usuario: {
//     id: number;
//     nomeUsuario: string;
    
//   };
//   // Include other properties here
// }

// function MenuTec() {
  
//   const userId = localStorage.getItem("idUsuario"); // Replace with the actual user ID value

//   fetchChamados();
//   }, [userId]);

// // function MenuTec(): JSX.Element {
//   return (
//     <>
//       <div className='MenuSup'>
//         <div id='MenuSupItem'>
//           <img src="./img/sino.png" alt="sino" />
//         </div>
//         <div>
//           <h5> Nome do usuário <br /> Técnico </h5>
//         </div>
//       </div>
//       <div className="sidebar-fixed">
//         <div className="container-fluid">
//           <div className="row">            
//             <nav id="sidebar">
//               <div className="sidebar-header">
//                 <h4> HelpDesk</h4>
//               </div>
//               <div className="list-unstyled components">
//                 <Nav.Link as={Link} to="Painel_tecnico"> Meu painel </Nav.Link>
//                 <Nav.Link as={Link} to="Ferramentas_tec"> Ferramentas </Nav.Link>
//                 {/* <Nav.Link as={Link} to="Ativos"> Ativos </Nav.Link> */}
//                 <Nav.Link as={Link} to="Ativos"> Chamados </Nav.Link>
//               </div>
//             </nav>          
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MenuTec;import '../css/index.css';
import '../css/index.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  usuario: {
    id: number;
    nomeUsuario: string;
  };
  // Inclua outras propriedades aqui
}

function MenuTec(): JSX.Element {
  
  const userId = parseInt(localStorage.getItem("idUsuario") || "", 10);
  const nomeUsuario = localStorage.getItem("nomeUsuario"); // Obter o nome do usuário
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const fetchUsuario = async (id: number) => {
    try {
      const response = await axios.get<Usuario>(
        `http://localhost:3000/usuarios/${id}`,
      );
      setUsuario(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUsuario(userId);
    }
  }, [userId]);
  
  return (
    <>
      <div className='MenuSup'>
        <div id='MenuSupItem'>
          <img src="./img/sino.png" alt="sino" />
        </div>
        <div>
          {usuario && nomeUsuario && ( // Verificar se 'usuario' e 'nomeUsuario' existem antes de acessar suas propriedades
            <h5>{nomeUsuario} <br /> Técnico </h5>
          )}
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
                <Nav.Link as={Link} to="Ativos"> Chamados </Nav.Link>
              </div>
            </nav>            
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuTec;

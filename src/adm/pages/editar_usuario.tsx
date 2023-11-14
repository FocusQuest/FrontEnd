import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../login/components/Button";
import * as C from "../../login/estilos/estilos_signup";
import axios from "axios";

interface Usuario {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  telefoneUsuario: string;
}

interface RouteParams {
  id: string;
}

const AlterarUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("1");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [setUsuarios] = useState<Usuario[]>([]);
  const { id } = useParams();

  // const { signup } = useAuth();

  const handleAlterarusuario= async () => {
    try {
      const data = {
        nomeUsuario: nome,
        emailUsuario: email,
        senhaUsuario: senha,
        telefoneUsuario: telefone,
        nivelAcesso: nivelAcesso,
      };
      console.log(data);
  
      const responseCadastro = await axios.patch(
        `http://localhost:3000/usuarios/${id}`,
        data,
      );
  
      if (responseCadastro.status === 200) {
        alert("Usuário alterado com sucesso!");
        navigate("/adm/Usuarios");
      }
    } 
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        const usuario = response.data;
        setNome(usuario.nomeUsuario);
        setEmail(usuario.emailUsuario);
        setTelefone(usuario.telefoneUsuario);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, [id]);
  
    
  return (
    <C.Container>
      <div className="FormContainerCustom">
        <div>
          <h2> Editar usuário </h2>
        </div>

        <hr></hr>
        
        <div className="Label">
          <span className="DescriptionCustom">Insira o nome:</span>
          <input
            type="text"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]}
          />
        </div>

        <div className="Label">
          <span className="DescriptionCustom">Insira o telefone</span>
          <input
            type="text"
            placeholder="Insira o telefone"
            value={telefone}
            onChange={(e) => [setTelefone(e.target.value), setError("")]}
          />
        </div>
        <div className="Label">
          <span className="DescriptionCustom">Insira o email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
        </div>

        <div className="Label">
          <span className="DescriptionCustom">Confirme o email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          />
        </div>

        <div className="Label">
          <span className="DescriptionCustom">Insira a senha</span>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
        </div>

        <div className="Label">
          <span className="description">Nível de acesso</span>
          <select
            value={nivelAcesso}
            onChange={(e) => setNivelAcesso(e.target.value)}
          >
            <option value="0">Selecione...</option>
            <option value="3">Usuário</option>
            <option value="2">Técnico</option>
            <option value="1">Administrador</option>
          </select>
        </div>

        <C.labelError>{error}</C.labelError>
        <div className="buttomcontainer">
          <Button Text="Alterar cadastro" onClick={handleAlterarusuario} />
        </div>
      </div>
    </C.Container>
  );
};

export default AlterarUsuario;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../login/components/Button";
import Input from "../../login/components/Input";
import * as C from "../../login/estilos/estilos_signup";
import useAuth from "../../login/hooks/useAuth";
import axios from "axios";

interface Usuario {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  telefoneUsuario: string;
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
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      const data = {
        nomeUsuario: nome,
        emailUsuario: email,
        senhaUsuario: senha,
        telefoneUsuario: telefone,
        nivelAcesso: nivelAcesso,
      };
      console.log(data);

      const responseCadastro = await axios.post(
        `http://localhost:3000/usuarios`,
        data,
      );

      if (responseCadastro.status === 201) {
        alert("Usuário alterado com sucesso!");
        navigate("/adm/Usuarios");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

    useEffect(() => {
      axios
        .get('http://localhost:3000/usuarios/{id}')
        .then((response) => setUsuarios(response.data.usuarios))
        .catch((error) => console.error(error));
    }, []);
  
    
    // if (usuarios.length === 0) {
    //   return <div>Loading...</div>;
    // }

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
            placeholder={email}
            value=""
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
        </div>

        <div className="Label">
          <span className="DescriptionCustom">Confirme o email</span>
          <input
            type="email"
            placeholder="Confirme seu e-mail"
            value={emailConf}
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
          <Button Text="Alterar cadastro" onClick={handleSignup} />
        </div>
      </div>
    </C.Container>
  );
};

export default AlterarUsuario;

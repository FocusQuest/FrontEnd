import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../login/components/Button";
import Input from "../../login/components/Input";
import * as C from "../../login/estilos/estilos_signup";
import useAuth from "../../login/hooks/useAuth";
import axios from "axios";

const CriarUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone = "", setTelefone] = useState("");
  const [nivelAcesso = "1", setNivelAcesso] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      if (!email || !emailConf || !senha) {
        setError("Preencha todos os campos");
        return;
      } else if (email !== emailConf) {
        setError("Os e-mails não são iguais");
        return;
      }

      const res = signup(email, senha);

      if (res) {
        setError(res);
        return;
      }

      const data = {
        nomeUsuario: nome,
        emailUsuario: email,
        senhaUsuario: senha,
        telefoneUsuario: telefone,
        idNivelAcesso: nivelAcesso,
      };

      setNome("");
      setTelefone("");
      setNivelAcesso("");

      const responseCadastro = await axios.post(
        `http://localhost:3000/usuarios`,
        data
      );
      if (responseCadastro.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <C.Container>
      
      <div className="FormContainerCustom">

      <div>
        <h2> Abrir chamado</h2>
      </div>


      <div className="Label">
          <span className="DescriptionCustom">Insira o nome:</span>
          <input
            type="text"
            placeholder="Digite o nome"
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
            placeholder="Digite seu e-mail"
            value={email}
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

          >
            <option value="0">Selecione...</option>
            <option value="1">Usuário</option>
            <option value="2">Técnico</option>
            <option value="3">Administrador</option>
          </select>
        </div>

      </div>


        <C.labelError>{error}</C.labelError>
        <div className="buttomcontainer">
        <Button Text="Criar cadastro" onClick={handleSignup} />
      </div>
    </C.Container>
  );
};

export default CriarUsuario;

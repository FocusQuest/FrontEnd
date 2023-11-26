import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as C from "../../estilos/estilos_signin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const LoginTecnico = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setSenhaError("");

    if (!email) {
      setEmailError("Preencha o campo de e-mail");
    }

    if (!senha) {
      setSenhaError("Preencha o campo de senha");
    }

    if (!email || !senha) {
      return;
    }

    try {
      const data = {
        emailUsuario: email,
        senhaUsuario: senha,
      };

      const responseLogin = await axios.post(
        `http://localhost:3000/usuarios/login`,
        data,
      );

      if (
        responseLogin.status === 202 &&
        responseLogin.data.usuario.nivelAcesso === "2"
      ) {
        localStorage.setItem("idUsuario", responseLogin.data.usuario.id);
        localStorage.setItem(
          "nomeUsuario",
          responseLogin.data.usuario.nomeUsuario,
        );
        navigate("/tecnico/Painel_tecnico");
      } else {
        setEmailError('Verifique suas credenciais.');
        setSenhaError('Verifique suas credenciais.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setSenhaError('Verifique sua senha');
        
        
      } else {
        setEmailError('Verifique seu email');
        
        
      }
      console.error(error);
    }
  };

  return (
    <C.Container>
      <C.Label>Seja bem-vindo(a)!</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setEmailError("")]}
        />
        {emailError && <C.labelError>{emailError}</C.labelError>}
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setSenhaError("")]}
        />
        {senhaError && <C.labelError>{senhaError}</C.labelError>}
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Administrador do sistema?
          <C.Strong>
            <Link to="/adm/Login_adm">&nbsp;Clique aqui </Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default LoginTecnico;

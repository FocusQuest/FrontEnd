import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as C from "../../estilos/estilos_signin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!email | !senha) {
        setError("Preencha todos os campos");
        return;
      }

      const data = {
        emailUsuario: email,
        senhaUsuario: senha,
      };

      // const usuarios = await axios.get(`http://localhost:3000/usuarios`, data);

      const responseLogin = await axios.post(
        `http://localhost:3000/usuarios/login`,
        data,
      );
      // localStorage.setItem("token", responseLogin.data.token);

      if (
        responseLogin.status === 202 &&
        responseLogin.data.usuario.nivelAcesso === "3"
      ) {
        localStorage.setItem("idUsuario", responseLogin.data.usuario.id);
        localStorage.setItem(
          "nomeUsuario",
          responseLogin.data.usuario.nomeUsuario,
        );
        navigate("/usuario/Meu_painel");
      }
    } catch (error) {
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
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          {/* Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Solicite seu cadastro </Link>
          </C.Strong> */}
          {/* <br></br> */}
          Equipe de suporte?
          <C.Strong>
            <Link to="/tecnico/Login_Tecnico">&nbsp;Clique aqui</Link>
          </C.Strong>
          <br></br>
          Administrador do sistema?
          <C.Strong>
            <Link to="/adm/Login_adm">&nbsp;Clique aqui </Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;

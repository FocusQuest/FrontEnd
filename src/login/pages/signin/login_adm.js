import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as C from "../../estilos/estilos_signin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const LoginAdm = () => {
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

      const responseLogin = await axios.post(
        `http://localhost:3000/usuarios/login`,
        data,
      );

      setId(responseLogin.data.usuario.id);

      if (
        responseLogin.status === 202 &&
        responseLogin.data.usuario.nivelAcesso === "1"
      ) {
        navigate("/adm/admin");
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
      </C.Content>
    </C.Container>
  );
};

export default LoginAdm;

import React from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed, goToSignUp } from "../../routes/coordinator.js";
import { FormContainer, InputContainer } from "./styled.js";
import { baseURL } from "../../constants/baseURL.js";
import axios from "axios";
import useForms from "../../hooks/useForms.js";

function LoginPage() {
  const navigate = useNavigate();

  const { form, onChange } = useForms({ email: "", password: "" });

  const enviaLogin = (e) => {
    e.preventDefault();
    console.log(form);
    const body = {
      email: form.email,
      password: form.password,
    };

    axios
      .post(`${baseURL}/users/login`, body)
      .then((resp) => {
        console.log(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        goToFeed(navigate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <h1>Login</h1>
      <FormContainer>
        <InputContainer onSubmit={enviaLogin}>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="nome@email.com"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Digite sua senha"
            required
          />
        </InputContainer>
        <button onClick={() => goToFeed(navigate)}>Entrar</button>
        <button onClick={() => goToSignUp(navigate)}>Não tenho cadastro</button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;

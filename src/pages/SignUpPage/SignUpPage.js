import { useNavigate } from "react-router-dom";
import { goToFeed, goToLogin } from "../../routes/coordinator";
import { FormContainer, InputContainer } from "./styled";
import axios from "axios";
import useForms from "../../hooks/useForms";
import { baseURL } from "../../constants/baseURL";

function SignUpPage() {
  const { form, onChange } = useForms({
    nome: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const enviarCadastro = (e) => {
    e.preventDefault();
    console.log(form)

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    }

    axios
      .post(`${baseURL}/users/signup`, userData)
      .then((resp) => {
        console.log(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        goToFeed(navigate);
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.responde.data);
      });
  };

  return (
    <main>
      <h1>Cadastro</h1>
      <FormContainer>
        <InputContainer onSubmit={enviarCadastro}>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="username"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type={"email"}
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
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Crie sua senha"
            required
          />
        </InputContainer>

        <button onClick={() => goToFeed(navigate)}>Cadastrar</button>
        <button onClick={() => goToLogin(navigate)}>Já sou cadastrado</button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;

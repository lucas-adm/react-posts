import '../styles/pages/login.scss'

import MessageHeader from '../components/message/MessageHeader'
import Input from '../components/form/Input'
import Button from '../components/form/Button'
import Apresentation from '../components/apresentation/Apresentation'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface FormState {
  username: string,
  password: string
}

interface ErrorState {
  username: string,
  password: string
}

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [form, setForm] = useState<FormState>({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState<ErrorState>({
    username: "",
    password: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      [event.target.name]: ""
    });

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API;

  const submit = (event: React.FormEvent) => {

    event.preventDefault();

    const data = {
      ...form
    }

    axios.post(`${API}/users/login`, data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        sessionStorage.setItem('password', form.password);
        navigate('/');
      })
      .catch((error) => {

        if (error.response && error.response.data) {
          const serverErrors = error.response.data;

          if (typeof serverErrors === 'string') {
            setErrors({ ...errors, password: serverErrors });
          }

          if (Array.isArray(serverErrors)) {
            serverErrors.forEach(err => {
              setErrors(errors => ({
                ...errors,
                [err.field]: err.message
              }));
            });
          }
        }

        if (error.response.status === 404) {
          setErrors({ ...errors, username: "User not found." })
        }

      })
  }

  const asGuest = () => {
    const data = {
      ...form,
      username: "demo",
      password: "Senha123"
    }

    axios.post(`${API}/users/login`, data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
  }

  return (
    <div className="container-login">
      <form className="container-form" onSubmit={submit}>
        <MessageHeader text="" />
        <Input
          name="username"
          label="Nome de usuário"
          type="text"
          placeholder="João Embaixadinha"
          image='/svgs/username.svg'
          handleOnChange={handleInputChange}
          error={errors.username} />
        <Input
          name="password"
          label="Senha"
          type={`${showPassword ? 'text' : 'password'}`}
          placeholder="Senha"
          image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
          handleOnClick={toggleShowPassword}
          handleOnChange={handleInputChange}
          error={errors.password} />
        <Button text="Login" />
        <div className="or"><h2>ou</h2></div>
        <Button text="Entrar como visitante" transparent handleOnClick={asGuest} />
        <Link to={'/register'}><Button text="Criar conta" transparent /></Link>
      </form>
      <Apresentation />
    </div>
  )
}

export default Login
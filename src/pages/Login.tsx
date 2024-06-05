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

  const [requesting, setRequesting] = useState<boolean>(false);

  const submit = (event: React.FormEvent) => {

    setRequesting(true);

    event.preventDefault();

    const data = {
      ...form
    }

    axios.post(`${API}/users/login`, data)
      .then((response) => {
        setRequesting(false);
        localStorage.setItem('token', response.data.token);
        sessionStorage.setItem('password', form.password);
        navigate('/');
      })
      .catch((error) => {
        setRequesting(false);
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

  const [requestingAsGuest, setRequestingAsGuest] = useState<boolean>(false);

  const asGuest = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      ...form,
      username: "Demo",
      password: "3Tres"
    }

    setRequestingAsGuest(true);

    axios.post(`${API}/users/login`, data)
      .then((response) => {
        setRequestingAsGuest(false);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(() => setRequestingAsGuest(false));
  }

  return (
    <div className="container-login">
      <div className="container-form">
        <form onSubmit={submit}>
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
          <Button text={!requesting ? "Login" : "Logando..."} />
        </form>
        <div className="or"><h2>ou</h2></div>
        <form onSubmit={asGuest}>
          <Button text={!requestingAsGuest ? "Entrar como visitante" : "Logando..."} transparent />
        </form>
        <Link to={'/register'}><Button text="Criar conta" transparent /></Link>
      </div>
      <Apresentation />
    </div>
  )
}

export default Login
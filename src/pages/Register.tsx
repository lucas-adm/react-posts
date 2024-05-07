import '../styles/pages/register.scss'

import MessageHeader from '../components/message/MessageHeader'
import Input from '../components/form/Input'
import Button from '../components/form/Button'
import Apresentation from '../components/apresentation/Apresentation'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

interface FormState {
  email: string;
  username: string;
  password: string;
  birthDate: string;
  photo: string;
}

interface ErrorState {
  email: string;
  username: string;
  password: string;
  birthDate: string;
}

const Register = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getAvatar = () => {
    const randomId = Math.random().toString(36).substring(2);
    return `https://api.multiavatar.com/${randomId}.svg`;
  }

  const [form, setForm] = useState<FormState>({
    email: "",
    username: "",
    password: "",
    birthDate: "",
    photo: getAvatar()
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [errors, setErrors] = useState<ErrorState>({
    email: "",
    username: "",
    password: "",
    birthDate: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    setErrors({
      ...errors,
      [event.target.name]: ""
    });
  };

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API;

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (form.password != repeatPassword) {
      setErrors({ ...errors, password: "As senhas não combinaram" });
      return;
    }

    const data = {
      ...form,
      birthDate: new Date(form.birthDate)
    };

    axios.post(`${API}/users/register`, data)
      .then(() => navigate('/login'))
      .catch((error) => {
        if (error.response && error.response.data) {

          const serverErrors = error.response.data;

          if (typeof serverErrors === 'string') {
            setErrors({ ...errors, email: serverErrors, username: serverErrors });
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
      });

  }

  return (
    <div className="container-register">
      <form className="container-form" onSubmit={submit} >
        <MessageHeader text="Registre-se e aproveite!" />
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="exemplo@email.com"
          image='/svgs/mail.svg'
          handleOnChange={handleInputChange}
          error={errors.email} />
        <Input
          name="birthDate"
          label="Data de nascimento"
          type="date"
          image='/svgs/cake.svg'
          handleOnChange={handleInputChange}
          error={errors.birthDate} />
        <Input
          name="username"
          label="Nome de usuário - max 33 letras"
          type="text"
          placeholder="João Embaixadinha"
          image='/svgs/username.svg'
          handleOnChange={handleInputChange}
          error={errors.username} />
        <Input
          name="password"
          label="Senha - min 4 letras"
          type={`${showPassword ? 'text' : 'password'}`}
          placeholder="Senha"
          image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
          handleOnChange={handleInputChange}
          handleOnClick={toggleShowPassword}
          error={errors.password}
          repeat={{
            name: "repeat",
            type: `${showPassword ? 'text' : 'password'}`,
            placeholder: "Repetir senha",
            image: `${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`,
            handleOnChange: (e) => setRepeatPassword(e.target.value),
            handleOnClick: toggleShowPassword,
            error: errors.password
          }} />
        <Button text="Registrar" />
      </form>
      <Apresentation />
    </div>
  )
}

export default Register
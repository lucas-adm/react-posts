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

  const [form, setForm] = useState<FormState>({
    email: "",
    username: "",
    password: "",
    birthDate: "",
    photo: "/imgs/user.png"
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [errors, setErrors] = useState<ErrorState>({
    email: "",
    username: "",
    password: "",
    birthDate: ""
  });

  const [lastKey, setLastKey] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };

  const [birthDate, setBirthDate] = useState<string>("");
  const [validBirthDate, setValidBirthDate] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "birthDate") {
      const value = event.target.value.replace(/\D/g, '').slice(0, 8);

      const dd = value.slice(0, 2);
      if (Number(dd.charAt(0)) > 3) return event.target.value = "";

      let mm = value.slice(2, 4);
      mm = mm.length === 1 && Number(mm.charAt(0)) > 1 ? `0${mm}` : mm;

      const yyyy = value.slice(4);

      const isBackSpacing = lastKey === "Backspace";

      event.target.value = `${dd}${dd.length >= 2 && (!isBackSpacing || event.target.value.length > 3) ? "/" : ""}${mm}${mm.length >= 2 && (!isBackSpacing || event.target.value.length > 6) ? "/" : ""}${yyyy}`;

      setBirthDate(`${yyyy.length === 4 ? yyyy + "-" : ""}${mm.length ? mm + "-" : ""}${dd}`);
      setValidBirthDate(yyyy.length === 4);
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
      birthDate: birthDate
    });

    setErrors({
      ...errors,
      [event.target.name]: ""
    });
  };

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API;

  const [requesting, setRequesting] = useState<boolean>(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();

    setRequesting(true);

    if (!validBirthDate) return setErrors({ ...errors, birthDate: "Data inválida" }), setRequesting(false);
    if (form.password != repeatPassword) return setErrors({ ...errors, password: "As senhas não combinaram" }), setRequesting(false);

    const data = {
      ...form,
      birthDate: new Date(form.birthDate).toISOString().split('T')[0]
    };

    axios.post(`${API}/users/register`, data)
      .then(() => {
        setRequesting(false);
        navigate('/confirmation')
      })
      .catch((error) => {
        setRequesting(false);
        if (error.response && error.response.data) {

          const serverErrors = error.response.data;

          if (typeof serverErrors === 'string') {
            serverErrors === "Email já existe." && (setErrors({ ...errors, email: serverErrors, username: "" }));
            serverErrors === "Usuário já existe." && (setErrors({ ...errors, email: "", username: serverErrors }));
            serverErrors === "Email ou usuário indisponível." && (setErrors({ ...errors, email: serverErrors, username: serverErrors }));
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
          type="text"
          placeholder="dia/mês/ano"
          image='/svgs/cake.svg'
          handleOnChange={handleInputChange}
          handleOnKeyDown={handleKeyDown}
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
        <Button text={!requesting ? "Registrar" : "Registrando..."} />
      </form>
      <Apresentation />
    </div>
  )
}

export default Register
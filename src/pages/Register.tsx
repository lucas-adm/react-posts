import '../styles/pages/register.scss'

import MessageHeader from '../components/message/MessageHeader'
import Input from '../components/form/Input'
import Button from '../components/form/Button'
import Apresentation from '../components/apresentation/Apresentation'

import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault()
    if (password != repeatPassword) {
      setPasswordError("As senhas não combinaram");
      return;
    }
    navigate('/confirmation')
  }

  return (
    <div className="container-register">
      <form action="" onSubmit={submit} className="container-form">
        <MessageHeader text="Registre-se e aproveite!" />
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="exemplo@email.com"
          image='/svgs/mail.svg' />
        <Input
          name="nascimento"
          label="Data de nascimento"
          type="date"
          image='/svgs/cake.svg' />
        <Input
          name="username"
          label="Nome de usuário - max 33 letras"
          type="text"
          placeholder="João Embaixadinha"
          image='/svgs/username.svg' />
        <Input
          name="password"
          label="Senha - min 4 letras"
          type={`${showPassword ? 'text' : 'password'}`}
          placeholder="Senha"
          image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
          handleOnChange={(e) => setPassword(e.target.value)}
          handleOnClick={toggleShowPassword}
          error={passwordError}
          repeat={{
            name: "repeat",
            type: `${showPassword ? 'text' : 'password'}`,
            placeholder: "Repetir senha",
            image: `${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`,
            handleOnChange: (e) => setRepeatPassword(e.target.value),
            handleOnClick: toggleShowPassword,
            error: passwordError
          }} />
        <Button text="Registrar" />
      </form>
      <Apresentation />
    </div>
  )
}

export default Register
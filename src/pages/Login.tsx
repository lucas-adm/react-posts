import '../styles/pages/login.scss'

import MessageHeader from '../components/message/MessageHeader'
import Input from '../components/form/Input'
import Button from '../components/form/Button'
import Apresentation from '../components/apresentation/Apresentation'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-login">
      <form action="" className="container-form">
        <MessageHeader text="" />
        <Input
          name="username"
          label="Nome de usuário"
          type="text"
          placeholder="João Embaixadinha"
          image='/svgs/username.svg' />
        <Input
          name="password"
          label="Senha"
          type={`${showPassword ? 'text' : 'password'}`}
          placeholder="Senha"
          image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
          handleOnClick={toggleShowPassword}
        />
        <Link to={'/'}><Button text="Login" /></Link>
        <div className="or"><h2>ou</h2></div>
        <Link to={'/'}><Button text="Entrar como visitante" transparent /></Link>
        <Link to={'/register'}><Button text="Criar conta" transparent /></Link>
      </form>
      <Apresentation />
    </div>
  )
}

export default Login
import '../../../styles/components/page-components/user/user-edit.scss';

import Input from "../../form/Input"
import Button from "../../form/Button"

import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";

const Edit = () => {

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
        navigate('/user/João Embaixadinha')
    }

    return (
        <div className="container-edit-page">
            <div className="container-edit">
                <img src="/imgs/logo.png" alt="foto de perfil do usuário" />
                <h1>@João Embaixadinha</h1>
                <form className="edit-form" onSubmit={submit}>
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
                    <Button text="Salvar" />
                </form>
            </div>
        </div>
    )
}

export default Edit
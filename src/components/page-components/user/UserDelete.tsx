import '../../../styles/components/page-components/user/user-delete.scss';

import Input from "../../form/Input";
import Button from "../../form/Button";

import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const mockedPassword: string = 'Senha123'

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    function submit(event: FormEvent) {
        event.preventDefault()
        if (password != mockedPassword) {
            setPasswordError("As senhas não combinaram");
            return;
        }
        navigate('/')
    }

    return (
        <div className="container-delete-account">
            <div className="container-delete">
                <img src="/imgs/logo.png" alt="foto de perfil do usuário" />
                <h1>@João Embaixadinha</h1>
                <form onSubmit={submit}>
                    <Input
                        name="password"
                        label="Senha"
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder="Senha"
                        image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
                        handleOnChange={(e) => setPassword(e.target.value)}
                        handleOnClick={toggleShowPassword}
                        error={passwordError} />
                    <Button text="Deletar conta" transparent/>
                </form>
            </div>
        </div>
    )
}

export default DeleteAccount
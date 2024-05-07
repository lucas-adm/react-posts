import '../styles/pages/validate.scss';

import Input from '../components/form/Input';
import Button from '../components/form/Button';

import { useUser } from '../context/UserProvider';
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Validate = () => {

    const user = useUser();
    const storaged: string | null = sessionStorage.getItem('password')

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    function submit(event: FormEvent) {
        event.preventDefault()
        if (password != storaged) {
            setPasswordError("Senha incorreta.");
            return;
        }
        navigate('/user/edit')
    }

    return (
        <div className="container-validate">
            <div className="container-validate-password">
                <img src={user?.photo} alt={`Foto de usuário de ${user?.username}`} />
                <h1>@{user?.username}</h1>
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
                    <Button text="Prosseguir" />
                </form>
            </div>
        </div>
    )
}

export default Validate
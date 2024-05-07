import '../../../styles/components/page-components/user/user-delete.scss';

import Input from "../../form/Input";
import Button from "../../form/Button";

import { useUser } from '../../../context/UserProvider';
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DeleteAccount = () => {

    const user = useUser();
    const storaged: string | null = sessionStorage.getItem('password')

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    function submit(event: FormEvent) {
        event.preventDefault()

        if (password != storaged) {
            setPasswordError("Senha incorreta.");
            return;
        }

        axios.delete(`${API}/users/${user?.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                sessionStorage.removeItem('password');
                localStorage.removeItem('token');
                navigate('/')
            })
            .catch(error => console.log(error))
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
                    <Button text="Deletar" transparent />
                </form>
            </div>
        </div>
    )
}

export default DeleteAccount
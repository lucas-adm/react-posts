import '../../../styles/components/page-components/user/user-delete.scss';

import Input from "../../form/Input";
import Button from "../../form/Button";
import BlurMessage from '../post/BlurMessage';

import { useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/slice';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DeleteAccount = () => {

    const user = useSelector(useUser);

    const navigate = useNavigate();

    useEffect(() => {
        user?.username === "Demo" && (navigate('/'))
    }, [user])

    const storaged: string | null = sessionStorage.getItem('password')

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [removing, setRemoving] = useState<boolean>(false);

    useEffect(() => {
        if (removing) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [removing]);

    const remove = (event: React.FormEvent) => {
        event.preventDefault();

        if (password != storaged) {
            setPasswordError("Senha incorreta.");
            return;
        }

        setRemoving(true);
    }

    const warningRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent | KeyboardEvent) => {
            if (warningRef.current && !warningRef.current.contains(event.target as Node)) {
                setRemoving(false);
            }
        }
        document.addEventListener('mousedown', handler);
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                handler(event);
            }
        });
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    handler(event);
                }
            });
        }
    }, [])

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    const [requesting, setRequesting] = useState<boolean>(false);

    const submit = () => {

        setRemoving(false);
        setRequesting(true);

        axios.delete(`${API}/users/deactivate/${user?.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setRequesting(false);
                sessionStorage.removeItem('password');
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                navigate('/')
            })
            .catch(() => setRequesting(false));
    }

    return (
        <div className="container-delete-account">
            <div className="container-delete">
                <img src={user?.photo} alt={`Foto de usuário de ${user?.username}`} />
                <h1>@{user?.username}</h1>
                <form onSubmit={remove}>
                    <Input
                        name="password"
                        label="Senha"
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder="Senha"
                        image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
                        handleOnChange={(e) => setPassword(e.target.value)}
                        handleOnClick={toggleShowPassword}
                        error={passwordError} />
                    <Button text={!requesting ? "Prosseguir" : "Deletando..."} transparent />
                </form>
            </div>
            <div className={`${removing ? "background-warning" : ""}`}>
                <div ref={warningRef}>
                    {removing && (
                        <BlurMessage message="Deletar?" text="Caso existentes, seus posts, comentários e respostas permanecerão existindo, bem como seu nome e foto de perfil." handleOnClick={submit} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount
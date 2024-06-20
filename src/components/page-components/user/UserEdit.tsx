import '../../../styles/components/page-components/user/user-edit.scss';

import Input from "../../form/Input"
import Button from "../../form/Button"

import { useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/slice';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface FormState {
    newEmail: string;
    newUsername: string;
    newPassword: string;
    newBirthDate: string;
}

interface ErrorState {
    newEmail: string;
    newUsername: string;
    newPassword: string;
    newBirthDate: string;
}

const Edit = () => {

    const user = useSelector(useUser);

    const navigate = useNavigate();

    useEffect(() => {
        user?.username === "Demo" && (navigate('/'))
    }, [user])

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const password: string | null = sessionStorage.getItem('password');

    const [passwordAttempt, setPasswordAttempt] = useState<string>("");

    const [passwordError, setPasswordError] = useState<string>("");

    const [validated, setValidated] = useState<boolean>(false);

    const validate = (event: React.FormEvent) => {
        event.preventDefault();
        if (passwordAttempt != password) {
            setPasswordError("Senha incorreta.");
            return;
        }
        setValidated(true);
    }

    const [form, setForm] = useState<FormState>({
        newEmail: user?.email ? user?.email : "",
        newUsername: user?.username ? user?.username : "",
        newPassword: password ? password : "",
        newBirthDate: "",
    });
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const [errors, setErrors] = useState<ErrorState>({
        newEmail: "",
        newUsername: "",
        newPassword: "",
        newBirthDate: ""
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

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    const [requesting, setRequesting] = useState<boolean>(false);

    function submit(event: React.FormEvent) {
        event.preventDefault();

        setRequesting(true);

        if (form.newPassword != repeatPassword) {
            setErrors({ ...errors, newPassword: "As senhas não combinaram" });
            return;
        }

        const data = {
            ...form,
            birthDate: new Date(form.newBirthDate)
        };

        axios.put(`${API}/users/edit/${user?.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setRequesting(true);
                localStorage.removeItem('token');
                navigate('/login');
            })
            .catch((error) => {
                setRequesting(false);
                if (error.response && error.response.data) {

                    const serverErrors = error.response.data;

                    if (typeof serverErrors === 'string') {
                        serverErrors === "Username already exists." && (setErrors({ ...errors, newEmail: "", newUsername: serverErrors }))
                        serverErrors === "Email already exists." && (setErrors({ ...errors, newEmail: serverErrors, newUsername: "" }))
                        serverErrors === "Email or username are unavailable." && (setErrors({ ...errors, newEmail: serverErrors, newUsername: serverErrors }))
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
        <div className="container-edit-page">
            {!validated ?
                <>
                    <div className="container-validate">
                        <div className="container-validate-password">
                            <img src={user?.photo} alt={`Foto de usuário de ${user?.username}`} />
                            <h1>@{user?.username}</h1>
                            <form onSubmit={validate}>
                                <Input
                                    name="password"
                                    label="Senha"
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    placeholder="Senha"
                                    image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
                                    handleOnChange={(e) => setPasswordAttempt(e.target.value)}
                                    handleOnClick={toggleShowPassword}
                                    error={passwordError} />
                                <Button text="Prosseguir" />
                            </form>
                        </div>
                    </div>
                </> :
                <>
                    <div className="container-edit">
                        <img src={user?.photo} alt={`Foto de perfil do ${user?.username}`} />
                        <h1>@{user?.username}</h1>
                        <form className="edit-form" onSubmit={submit}>
                            <Input
                                name="newEmail"
                                label="Novo email"
                                type="text"
                                placeholder="exemplo@email.com"
                                value={form.newEmail}
                                image='/svgs/mail.svg'
                                handleOnChange={handleInputChange}
                                error={errors.newEmail} />
                            <Input
                                name="newBirthDate"
                                label="Nova data de nascimento"
                                type="date"
                                image='/svgs/cake.svg'
                                handleOnChange={handleInputChange}
                                error={errors.newBirthDate} />
                            <Input
                                name="newUsername"
                                label="Novo nome de usuário - max 33 letras"
                                type="text"
                                placeholder="João Embaixadinha"
                                value={form.newUsername}
                                image='/svgs/username.svg'
                                handleOnChange={handleInputChange}
                                error={errors.newUsername} />
                            <Input
                                name="newPassword"
                                label="Nova senha - min 4, max 33 letras"
                                type={`${showPassword ? 'text' : 'password'}`}
                                placeholder="Senha"
                                value={form.newPassword}
                                image={`${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`}
                                handleOnChange={handleInputChange}
                                handleOnClick={toggleShowPassword}
                                error={errors.newPassword}
                                repeat={{
                                    name: "repeat",
                                    type: `${showPassword ? 'text' : 'password'}`,
                                    placeholder: "Repetir senha",
                                    image: `${showPassword ? "/svgs/eye-off.svg" : "/svgs/eye.svg"}`,
                                    handleOnChange: (e) => setRepeatPassword(e.target.value),
                                    handleOnClick: toggleShowPassword,
                                    error: errors.newPassword
                                }} />
                            <Button text={!requesting ? "Editar" : "Editando..."} />
                        </form>
                    </div>
                </>}
        </div>
    )
}

export default Edit
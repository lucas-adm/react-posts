import '../styles/pages/psswr.scss';

import Art from '../components/art/Art';
import MessageHeader from '../components/message/MessageHeader';
import Input from '../components/form/Input';
import Button from '../components/form/Button';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import axios from 'axios';

import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../redux/user/slice';

interface DecodedToken {
    iss: string;
    sub: string;
    exp: number;
}

const Psswrd = () => {

    const navigate = useNavigate();

    const param = useParams();

    useEffect(() => {
        if (param && param.token) {
            try {
                const decoded = jwtDecode<DecodedToken>(param.token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) localStorage.removeItem("requested"), navigate('/');
            }
            catch {
                navigate('/');
            }
        }
    }, [])

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const [data, setData] = useState({
        password: ""
    });
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const [errors, setErrors] = useState({
        password: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            ...errors,
            [event.target.name]: ""
        })
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const [requesting, setRequesting] = useState<boolean>(false);

    const dispatch = useDispatch();

    const submit = (event: React.FormEvent) => {
        event.preventDefault(), setRequesting(true);

        if (repeatPassword !== data.password) return setErrors({ ...errors, password: "Senhas diferentes" }), setRequesting(false);

        const API = import.meta.env.VITE_API;
        axios.patch(`${API}/users/psswrd`, data, {
            headers: {
                Authorization: `Bearer ${param.token}`
            }
        })
            .then(() => {
                localStorage.removeItem("requested"), setRequesting(false), dispatch(logoutUser()), navigate('/');
            })
            .catch((error) => {
                const serverErrors = error.response.data;
                if (Array.isArray(serverErrors)) {
                    serverErrors.forEach(error => {
                        setErrors(errors => ({
                            ...errors,
                            [error.field]: error.message
                        }))
                    })
                }
                if (error.response.status === 403) {
                    setErrors({ ...errors, password: "Unknow token." });
                }
                setRequesting(false);
            })
    }

    return (
        <Art component={
            <div className="container-psswrd">
                <form onSubmit={submit}>
                    <MessageHeader text="" />
                    <Input
                        name="password"
                        label="Nova senha - min 4 letras"
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
                    {requesting ?
                        <>
                            <Button text="Trocando..." />
                        </> :
                        <>
                            <Button text="Trocar" transparent />
                        </>}
                </form>
            </div>
        }>
        </Art>
    )
}

export default Psswrd
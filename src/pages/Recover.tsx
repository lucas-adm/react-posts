import '../styles/pages/recover.scss';

import Art from "../components/art/Art"
import MessageHeader from '../components/message/MessageHeader';
import Input from "../components/form/Input"
import Button from "../components/form/Button"

import { useState } from 'react';

import axios from 'axios';

const Recover = () => {

    const [requested, setRequested] = useState<boolean>(
        localStorage.getItem("requested") === "true"
    );

    const [requesting, setRequesting] = useState<boolean>(false);

    const [data, setData] = useState({
        email: ""
    });

    const [errors, setErrors] = useState({
        email: ""
    })

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

    const submit = (event: React.FormEvent) => {
        event.preventDefault(), setRequesting(true);

        const API = import.meta.env.VITE_API;
        axios.post(`${API}/users/recover`, data)
            .then(() => {
                setRequesting(false), setRequested(true), localStorage.setItem("requested", "true");
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
                if (error.response.status === 404) {
                    setErrors({
                        ...errors,
                        email: "Conta não registrada."
                    })
                }
                setRequesting(false);
            })
    }

    return (
        <Art component={
            <div className="container-recover">
                <MessageHeader text="" />
                {!requested ?
                    <>
                        <form onSubmit={submit}>
                            <Input
                                name="email"
                                label="Email utilizado para o cadastro"
                                type="text"
                                placeholder="exemplo@email.com"
                                image='/svgs/mail.svg'
                                handleOnChange={handleInputChange}
                                error={errors.email}
                            />
                            {requesting ?
                                <>
                                    <Button text="Carregando..." />
                                </> :
                                <>
                                    <Button text="Prosseguir" transparent handleOnClick={submit} />
                                </>}
                        </form>
                    </> :
                    <>
                        <p>Confira seu email.</p>
                    </>}
            </div>
        }>
        </Art>
    )
}

export default Recover
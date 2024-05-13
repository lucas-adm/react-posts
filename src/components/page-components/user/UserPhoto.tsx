import '../../../styles/components/page-components/user/user-photo.scss';

import Button from '../../form/Button';

import { useUser } from '../../../context/UserProvider';
import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ChangePhoto = () => {

    const user = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        user?.username === "Demo" && (navigate('/'))
    }, [user])

    const [current, setCurrent] = useState(user?.photo);

    const [generating, setGenerating] = useState<boolean>(false);

    const generate = () => {
        const KEY = import.meta.env.VITE_API_KEY;
        const randomId = Math.random().toString(36).substring(2);
        setGenerating(true);

        axios.get(`https://api.multiavatar.com/${randomId}.svg?apikey=${KEY}`)
            .then(() => {
                setGenerating(false);
                setCurrent(`https://api.multiavatar.com/${randomId}.svg?apikey=${KEY}`);
            })
            .catch(error => {
                setGenerating(false);
                console.error(error)
            });

    }

    const [requesting, setRequesting] = useState<boolean>(false);

    function submit(event: FormEvent) {
        event.preventDefault()

        const API = import.meta.env.VITE_API;
        const token = localStorage.getItem('token')

        setRequesting(true);

        axios.patch(`${API}/users/edit/${user?.id}`, { photo: current }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setRequesting(false);
                navigate(`/user/${user?.username}`)
                window.location.reload()
            })
            .catch(() => {
                setRequesting(false);
            })
    }

    return (
        <div className="container-change-photo">
            <div className="container-photo">
                <img src={current} alt="foto de perfil do usuário" />
                <Button text={`${generating ? "Gerando..." : "Gerar"}`} handleOnClick={generate} />
                <form onSubmit={submit}>
                    <Button text={!requesting ? "Salvar" : "Salvando..."} transparent />
                </form>
            </div>
        </div>
    )
}

export default ChangePhoto
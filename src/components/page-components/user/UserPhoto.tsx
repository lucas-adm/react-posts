import '../../../styles/components/page-components/user/user-photo.scss';

import Button from '../../form/Button';

import { useUser } from '../../../context/UserProvider';
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ChangePhoto = () => {

    const user = useUser();

    const [current, setCurrent] = useState(user?.photo);

    const navigate = useNavigate();

    const generate = () => {
        const KEY = import.meta.env.API_KEY;
        const randomId = Math.random().toString(36).substring(2);
        setCurrent(`https://api.multiavatar.com/${randomId}.svg?apikey=${KEY}`);
    }

    function submit(event: FormEvent) {
        event.preventDefault()
        const API = import.meta.env.VITE_API;
        const token = localStorage.getItem('token')
        axios.patch(`${API}/users/edit/${user?.id}`, { photo: current }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                navigate(`/user/${user?.username}`)
                window.location.reload()
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="container-change-photo">
            <div className="container-photo">
                <img src={current} alt="foto de perfil do usuário" />
                <Button text="Gerar" transparent handleOnClick={generate} />
                <form onSubmit={submit}>
                    <Button text="Salvar" />
                </form>
            </div>
        </div>
    )
}

export default ChangePhoto
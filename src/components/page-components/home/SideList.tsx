import '../../../styles/components/page-components/home/sider-list.scss';

import Input from '../../form/Input'
import Button from '../../form/Button'
import UserIndex from '../user/UserIndex'

import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserState {
    username: string;
    photo: string;
}

const SideList = () => {

    const [users, setUsers] = useState<UserState[]>([])

    useEffect(() => {
        axios.get(`${API}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    function submit(event: React.FormEvent) {
        event.preventDefault()
    }

    const API = import.meta.env.VITE_API;

    return (
        <div className="container-side-users">
            <form className="search-user-posts" onSubmit={submit}>
                <Input
                    name="nome"
                    label="Encontrar posts"
                    type="text"
                    placeholder="Nome do usuário"
                    image="/svgs/username.svg"
                />
                <Button text="Encontrar" transparent />
            </form>
            <div className="users-list">
                <h1>Outros usuários:</h1>
                {users.map(user => (
                    <UserIndex username={user.username} photo={user.photo} />
                ))}
            </div>
        </div>
    )
}

export default SideList
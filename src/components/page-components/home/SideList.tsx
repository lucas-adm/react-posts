import '../../../styles/components/page-components/home/sider-list.scss';

import Input from '../../form/Input'
import Button from '../../form/Button'
import UserIndex from '../user/UserIndex'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface UserState {
    username: string;
    photo: string;
}

const SideList = () => {

    const [users, setUsers] = useState<UserState[]>([])

    useEffect(() => {
        const API = import.meta.env.VITE_API;
        axios.get(`${API}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const navigate = useNavigate();

    const [inputText, setInputText] = useState<string>("");

    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    function submit(event: React.FormEvent) {
        event.preventDefault();
        navigate(`/posts/${inputText}`);
        setInputText("");
    }

    return (
        <div className="container-side-users">
            <form className="search-user-posts" onSubmit={submit}>
                <Input
                    name="nome"
                    label="Encontrar posts"
                    type="text"
                    placeholder="Nome do usuário"
                    image="/svgs/username.svg"
                    value={inputText}
                    handleOnChange={handleText}
                />
                <Button text="Encontrar" transparent />
            </form>
            <div className="users-list">
                <h1>Todos usuários:</h1>
                {users.slice(0, 5).map(user => (
                    <UserIndex key={user.username} param={user.username} username={user.username} photo={user.photo} />
                ))}
            </div>
            <Link to={'/users'}><Button text="Ver todos" /></Link>
        </div>
    )
}

export default SideList
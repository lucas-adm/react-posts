import '../../../styles/components/page-components/home/sider-list.scss';

import Input from '../../form/Input'
import Button from '../../form/Button'
import UserIndex from '../user/UserIndex'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type SideListProps = {
    className?: string;
    onClose?: () => void;
}

interface UserState {
    username: string;
    photo: string;
}

const SideList: React.FC<SideListProps> = ({ className, onClose }) => {

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
        onClose && onClose();
        navigate(`/posts/${inputText}`);
        setInputText("");
    }

    const findAll = () => {
        navigate('/users');
        onClose && onClose();
    }

    return (
        <div className={`container-side-users ${className}`}>
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
            <div className="find-all-btn">
                <Button text="Ver todos" handleOnClick={findAll} />
            </div>
        </div>
    )
}

export default SideList
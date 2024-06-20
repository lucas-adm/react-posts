import '../../../styles/components/page-components/home/sider-list.scss';

import Input from '../../form/Input'
import Button from '../../form/Button'
import UserIndex from '../user/UserIndex'

import { useSelector, useDispatch } from 'react-redux';
import { useUsers, getUsers } from '../../../redux/users/slice';

import { useState, useEffect, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

type SideListProps = {
    className?: string;
    onClose?: () => void;
}

const SideList = forwardRef<HTMLDivElement, SideListProps>(({ className, onClose }, ref) => {

    const users = useSelector(useUsers);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (users.length) return;
        const API = import.meta.env.VITE_API;
        setLoading(true);
        axios.get(`${API}/users`)
            .then((response) => {
                setLoading(false);
                dispatch(getUsers(response.data))
            })
            .catch(() => setLoading(false));
    }, []);

    const navigate = useNavigate();

    const location = useLocation();

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

    useEffect(() => {
        onClose && onClose();
    }, [location])

    const findAll = () => {
        navigate('/users');
        onClose && onClose();
    }

    return (
        <div className={`container-side-users ${className}`} ref={ref}>
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
                {loading && (
                    <div className="loading-svg" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="/svgs/loading.svg" />
                    </div>
                )}
                {users.slice(0, 5).map(user => (
                    <UserIndex key={user.username} param={user.username} username={user.username.slice(0, 12)} photo={user.photo} />
                ))}
            </div>
            <div className="find-all-btn">
                <Button text="Ver todos" handleOnClick={findAll} />
            </div>
        </div>
    )
})

export default SideList
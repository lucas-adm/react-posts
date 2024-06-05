import '../styles/pages/users.scss';

import SideProfile from "../components/page-components/home/SideProfile"
import SideList from "../components/page-components/home/SideList"
import SVGButton from '../components/action/SVGButton';
import UserIndex from "../components/page-components/user/UserIndex"

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

interface UserState {
    id: string;
    username: string;
    photo: string
}

const Users = () => {
    const [users, setUsers] = useState<UserState[]>([])

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        const API = import.meta.env.VITE_API;
        axios.get(`${API}/users`)
            .then((response) => {
                setLoading(false);
                setUsers(response.data);
            })
            .catch(() => setLoading(false));
    }, [])

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className="container-users">
            <SideProfile />
            <div className="container-center">
                {loading ? (
                    <div className="loading-svg" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="/svgs/loading.svg" />
                    </div>
                ) : (
                    <>
                        <SVGButton path="/svgs/back.svg" handleOnClick={goBack} />
                        <div className="users">
                            {users.map(user => (
                                <div className="user">
                                    <UserIndex key={user.id} param={user.username} username={user.username.length > 7 ? `${user.username.slice(0, 7)}...` : user.username} photo={user.photo} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <SideList />
        </div>
    )
}

export default Users
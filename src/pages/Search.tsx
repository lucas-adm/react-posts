import '../styles/pages/search.scss';

import SideProfile from '../components/page-components/home/SideProfile'
import UserIndex from '../components/page-components/user/UserIndex'
import UserPosts from '../components/page-components/user/UserPosts'
import SideList from '../components/page-components/home/SideList'
import SVGButton from '../components/action/SVGButton';

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

interface UserState {
    id: string;
    username: string;
    photo: string;
}

const Search = () => {

    const param = useParams();

    const username = param.username;

    const navigate = useNavigate();

    const [user, setUser] = useState<UserState>({
        id: "",
        username: "",
        photo: ""
    });

    const [loading, setLoading] = useState<boolean>(false);

    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        const API = import.meta.env.VITE_API;
        setLoading(true);
        axios.get(`${API}/users/${username}`)
            .then((response) => {
                setLoading(false);
                setNotFound(false);
                setUser(response.data);
            })
            .catch((error) => {
                setLoading(false);
                error.response.status === 404 ? setNotFound(true) : setNotFound(false);
            })
    }, [username])

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className="container-search">
            <SideProfile />
            {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <img src="/svgs/loading.svg" />
                </div>
            ) : (
                <div className="container-center">
                    <div className="user">
                        <SVGButton path="/svgs/back.svg" handleOnClick={goBack} />
                        {!notFound ?
                            <>
                                <UserIndex key={user.username} param={user.username} username={user.username} photo={user.photo} />
                            </> :
                            <>
                                <div className="not-found">
                                    <img src="/imgs/user.png" alt="Usuário não encontrado" />
                                    <h1>Não registrado ou excluído</h1>
                                </div>
                            </>}
                    </div>
                    <div className="posts">
                        <UserPosts key={user.id} param={username} />
                    </div>
                </div>
            )}
            <SideList />
        </div>
    )
}

export default Search
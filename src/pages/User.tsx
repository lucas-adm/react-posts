import '../styles/pages/user.scss';

import UserPosts from '../components/page-components/user/UserPosts';
import SVGButton from '../components/action/SVGButton';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {

  const [user, setUser] = useState({
    username: "",
    photo: "",
    birthDate: ""
  })

  const [loading, setLoading] = useState<boolean>(false);

  const param = useParams();

  const username = param.username;

  const [notFound, setNotFound] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const API = import.meta.env.VITE_API;
    axios.get(`${API}/users/${username}`)
      .then(response => {
        setLoading(false);
        setUser(response.data)
        setNotFound(false);
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
    <div className="container-user-page">
      {loading ? (
        <img src="/svgs/loading.svg" alt="" />
      ) :
        (<>
          <div className="container-user">
            <SVGButton path="/svgs/back.svg" handleOnClick={goBack} />
            {!notFound ?
              <>
                <img src={user.photo} alt={`Foto do ${user.username}`} />
                <div className="user-info">
                  <h1>@{user.username}</h1>
                  <div className="infos">
                    <div className="user-email">
                    </div>
                    <div className="user-birthdate">
                      <img src="/svgs/cake.svg" alt="ícone de bolo de aniversário" />
                      <h2>{user.birthDate}</h2>
                    </div>
                  </div>
                </div>
              </> :
              <>
                <img src="/imgs/user.png" alt="Usuário não encontrado" />
                <div className="user-info">
                  <h1 className="none">Não registrado ou excluído</h1>
                </div>
              </>}
          </div>
          <UserPosts param={username} />
        </>
        )}
    </div>
  )
}

export default User
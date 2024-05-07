import '../styles/pages/user.scss';

import Posts from "../components/page-components/post/Posts"

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {

  const [user, setUser] = useState({
    username: "",
    photo: "",
    birthDate: ""
  })

  const param = useParams();
  const username = param.username;

  const navigate = useNavigate();

  useEffect(() => {
    const API = import.meta.env.VITE_API;
    axios.get(`${API}/users/${username}`)
      .then(response => {
        setUser(response.data)
      })
      .catch(() => navigate('/404'))
  }, [])

  return (
    <div className="container-user-page">
      <div className="container-user">
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
      </div>
      <Posts />
    </div>
  )
}

export default User
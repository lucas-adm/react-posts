import '../styles/pages/user.scss';

import Posts from "../components/page-components/post/Posts"

const User = () => {
  return (
    <div className="container-user-page">
      <div className="container-user">
        <img src="/imgs/logo.png" alt="foto de perfil do usuário" />
        <div className="user-info">
          <h1>@João Embaixadinha</h1>
          <div className="infos">
            <div className="user-email">
              <h2>email@example.com</h2>
            </div>
            <div className="user-birthdate">
              <img src="/svgs/cake.svg" alt="ícone de bolo de aniversário" />
              <h2>2002/06/22</h2>
            </div>
          </div>
        </div>
      </div>
      <Posts />
    </div>
  )
}

export default User
import '../../../styles/components/page-components/user/user-index.scss';

import { Link } from 'react-router-dom';

type UserIndexProps = {
    username: string,
    photo: string
};

const UserIndex: React.FC<UserIndexProps> = ({ username, photo }) => {
    return (
        <Link to={`/user/${username}`} className="user-link">
            <div className="user">
                <img src={photo} alt={`Foto de usuário de ${username}`} />
                <h1>{username}</h1>
            </div>
        </Link>
    )
}

export default UserIndex
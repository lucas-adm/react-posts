import '../../../styles/components/page-components/user/user-index.scss';

import { Link } from 'react-router-dom';

type UserIndexProps = {
    param: string;
    username: string;
    photo: string;
};

const UserIndex: React.FC<UserIndexProps> = ({ param, username, photo }) => {
    return (
        <Link to={`/user/${param}`} className="user-link">
            <div className="user">
                <img src={photo} alt={`Foto de usuário de ${username}`} />
                <h1>{username}</h1>
            </div>
        </Link>
    )
}

export default UserIndex
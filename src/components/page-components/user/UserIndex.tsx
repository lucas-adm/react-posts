import '../../../styles/components/page-components/user/user-index.scss';

import { Link } from 'react-router-dom';

type UserIndexProps = {
    username: string
};

const UserIndex: React.FC<UserIndexProps> = ({ username }) => {
    return (
        <Link to={`/user/${username}`} className="user-link">
            <div className="user">
                <img src="/imgs/logo.png" alt="foto de usuário" />
                <h1>{username}</h1>
            </div>
        </Link>
    )
}

export default UserIndex
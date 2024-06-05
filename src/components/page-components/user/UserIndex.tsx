import '../../../styles/components/page-components/user/user-index.scss';

import Picture from '../../picture/Picture';

import { Link } from 'react-router-dom';

type UserIndexProps = {
    param: string;
    username: string;
    photo: string;
};

const UserIndex = ({ param, username, photo }: UserIndexProps) => {
    return (
        <Link to={`/user/${param}`} className="user-link">
            <div className="user">
                <Picture src={photo} username={username} width="5.55rem" />
                <h1>{username}</h1>
            </div>
        </Link>
    )
}

export default UserIndex
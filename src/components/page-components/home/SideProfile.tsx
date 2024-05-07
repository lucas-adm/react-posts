import '../../../styles/components/page-components/home/side-profile.scss'

import Button from "../../form/Button"

import { useUser } from '../../../context/UserProvider';

import { Link } from "react-router-dom";

const SideProfile = () => {

    const user = useUser();

    return (
        <div className="user-detail">
            <Link to={'/user/photo'} className="hover-action"><img src={user?.photo} alt={`Foto do ${user?.username}`} /></Link>
            <div className="info">
                <p>{user?.email}</p>
            </div>
            <div className="info">
                <p>@{user?.username}</p>
            </div>
            <Link to={'/validate'}><Button text="Editar"></Button></Link>
            <Link to={`/user/${user?.username}`}><Button text="Meus Posts!" transparent></Button></Link>
        </div>
    )
}

export default SideProfile
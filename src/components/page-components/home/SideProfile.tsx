import '../../../styles/components/page-components/home/side-profile.scss'

import Button from "../../form/Button"

import { Link } from "react-router-dom"

const SideProfile = () => {
    return (
        <div className="user-detail">
            <Link to={'/user/photo'} className="hover-action"><img src="/imgs/logo.png" alt="" /></Link>
            <div className="info">
                <p>João Embaixadinha</p>
            </div>
            <div className="info">
                <p>example@email.com</p>
            </div>
            <Link to={'/user/edit'}><Button text="Editar"></Button></Link>
            <Link to={'/user/João Embaixadinha'}><Button text="Meus Posts!" transparent></Button></Link>
        </div>
    )
}

export default SideProfile
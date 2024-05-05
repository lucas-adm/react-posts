import '../../../styles/components/page-components/user/user-photo.scss';

import Button from '../../form/Button';

import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const ChangePhoto = () => {

    const navigate = useNavigate();

    function submit(event: FormEvent) {
        event.preventDefault()
        navigate('/user/João Embaixadinha')
    }

    return (
        <div className="container-change-photo">
            <div className="container-photo">
                <img src="/imgs/logo.png" alt="foto de perfil do usuário" />
                <Button text="Gerar" transparent />
                <form onSubmit={submit}>
                    <Button text="Salvar" />
                </form>
            </div>
        </div>
    )
}

export default ChangePhoto
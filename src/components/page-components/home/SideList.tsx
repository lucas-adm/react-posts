import '../../../styles/components/page-components/home/sider-list.scss';

import Input from '../../form/Input'
import Button from '../../form/Button'
import UserIndex from '../user/UserIndex'

import { useNavigate } from 'react-router-dom'
import { FormEvent } from 'react'

const SideList = () => {

    const navigate = useNavigate();
    function submit(event: FormEvent) {
        event.preventDefault()
        navigate('/user/João Embaixadinha')
    }

    return (
        <div className="container-side-users">
            <form className="search-user-posts" onSubmit={submit}>
                <Input
                    name="nome"
                    label="Encontrar posts"
                    type="text"
                    placeholder="Nome do usuário"
                    image="/svgs/username.svg"
                />
                <Button text="Encontrar" transparent />
            </form>
            <div className="users-list">
                <h1>Outros usuários:</h1>
                <UserIndex username="@João Embaixadinha" />
                <UserIndex username='@KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK' />
            </div>
        </div>
    )
}

export default SideList
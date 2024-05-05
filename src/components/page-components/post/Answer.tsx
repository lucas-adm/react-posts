import '../../../styles/components/page-components/post/answer.scss';

import { Link } from "react-router-dom"

const Answer = () => {
    return (
        <div className="answer">
            <div className="top">
                <img src="/imgs/logo.png" alt="foto de usuário" />
                <Link to={'/user/João Embaixadinha'}><h1>@KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</h1></Link>
                <p>10 abril,24 18:57</p>
            </div>
            <div className="content">
                <p>KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</p>
            </div>
        </div>
    )
}

export default Answer
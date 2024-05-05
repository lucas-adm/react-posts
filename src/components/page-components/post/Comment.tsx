import '../../../styles/components/page-components/post/comment.scss';

import SVGButton from '../../action/SVGButton';
import Answer from './Answer'

import { useState } from 'react';
import { Link } from "react-router-dom"

const Comment = () => {

    const [showAnswers, setShowAnswers] = useState(false);

    const getAnswers = () => {
        setShowAnswers(!showAnswers);
    }

    return (
        <div className="comment">
            <div className="top">
                <img src="/imgs/logo.png" alt="foto de usuário" />
                <Link to={'/'}><h1>@KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</h1></Link>
                <p>10 abril,24 18:57</p>
            </div>
            <div className="content">
                <p>KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</p>
            </div>
            <div className="bottom">
                {!showAnswers
                    ?
                    <SVGButton path="/svgs/load-more.svg" text="Ver respostas" handleOnClick={getAnswers} />
                    :
                    <>
                        <SVGButton path="/svgs/hide.svg" text="Ocultar respostas" handleOnClick={getAnswers} />
                        <Answer />
                        <SVGButton spacing path="/svgs/load-more.svg" text="Carregar mais" />
                    </>
                }
            </div>
        </div>
    )
}

export default Comment
import '../../../styles/components/page-components/post/comment.scss';

import Picture from '../../picture/Picture';
import Button from '../../form/Button';
import SVGButton from '../../action/SVGButton';
import BlurMessage from './BlurMessage';
import Textarea from '../../form/Textarea';
import Answers from './Answers';

import { useUser } from '../../../context/UserProvider';
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

type CommentProps = {
    id: string;
    username: string;
    photo: string;
    text: string;
    dateComment: string;
    answers: number;
    onDelete: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({ id, username, photo, text, dateComment, answers, onDelete }) => {

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    const user = useUser();

    const [editing, setEditing] = useState(false)

    const edit = () => {
        setEditing(!editing);
    }

    const [commentText, setCommentText] = useState(text);
    const [newCommentText, setNewCommentText] = useState(text);
    const [error, setError] = useState("");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("");
        setNewCommentText(event.target.value);
    };

    const saveEdit = () => {
        axios.patch(`${API}/posts/post/comments/${id}`, { text: newCommentText }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setEditing(false);
                setCommentText(newCommentText);
            })
            .catch(() => setError("ué"));
    }

    const [removing, setRemoving] = useState(false)

    useEffect(() => {
        if (removing) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [removing]);

    const remove = () => {
        setEditing(false);
        setAnswering(false);
        setRemoving(true);
    }

    const warningRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent | KeyboardEvent) => {
            if (warningRef.current && !warningRef.current.contains(event.target as Node)) {
                setRemoving(false);
            }
        }
        document.addEventListener('mousedown', handler);
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                handler(event);
            }
        });
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    handler(event);
                }
            });
        }
    }, [])

    const saveRemove = () => {
        axios.delete(`${API}/posts/post/comments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setRemoving(false);
                onDelete(id);
            })
            .catch(error => console.error(error));
    }

    const [answering, setAnswering] = useState(false);

    const [answerText, setAnswerText] = useState("");

    const answer = () => {
        setEditing(false);
        setAnswering(!answering);
    }

    const handleAnswerText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("");
        setAnswerText(event.target.value);
    }

    const [key, setKey] = useState(0);

    const [currentAnswers, setCurrentAnswers] = useState(answers);

    const postAnswer = () => {
        axios.post(`${API}/posts/post/comments/${id}`, { text: answerText }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setAnswerText("");
                setAnswering(false);
                setKey(prevKey => prevKey + 1);
                setShowAnswers(true);
                setCurrentAnswers(prevAnswers => prevAnswers + 1);
            })
            .catch(() => setError("ué"))
    }

    const [showAnswers, setShowAnswers] = useState(false);

    const getAnswers = () => {
        setShowAnswers(!showAnswers);
    }

    return (
        <div className="container-comment">
            <div className="comment">
                {username === user?.username && user.username !== "Demo" && (
                    <>
                        {!answering ?
                            <>
                                <div className="owner">
                                    <Button text="Apagar" transparent handleOnClick={remove} />
                                    <Button text={`${editing ? "Voltar" : "Editar"}`} transparent handleOnClick={edit} />
                                </div>
                            </> :
                            <></>
                        }
                    </>
                )}
                <div className={`${removing ? "background-warning" : ""}`}>
                    <div ref={warningRef}>
                        {removing && (
                            <BlurMessage message="Ainda quer apagar?" text={`Apagando este comentário ele não poderá ser recuperado.`} handleOnClick={saveRemove} />
                        )}
                    </div>
                </div>
                <div className="top">
                    <Picture src={photo} username={username} width="6.66rem" />
                    <Link to={`/user/${username}`}><h1>{username}</h1></Link>
                    <p>{dateComment}</p>
                </div>
                {!editing ? (
                    <>
                        <div className="content">
                            <p>{commentText}</p>
                        </div>
                    </>
                ) :
                    <>
                        <Textarea action="Salvar" value={newCommentText} error={error} handleOnChange={handleTextChange} handleOnClick={saveEdit} />
                    </>}
                <div className="bottom">
                    <SVGButton text={`${!answering ? "Responder" : "Cancelar"}`} handleOnClick={answer} />
                    {answering && (
                        <>
                            < Textarea action="Responder" error={error} handleOnChange={handleAnswerText} handleOnClick={postAnswer} />
                        </>
                    )}
                </div>

            </div>
            {!showAnswers
                ?
                <>
                    {currentAnswers > 0 && (
                        <SVGButton path="/svgs/load-more.svg" text={`${currentAnswers > 1 ? `Ver ${currentAnswers} respostas` : "Ver 1 resposta"}`} handleOnClick={getAnswers} />
                    )}
                </>
                :
                <>
                    <SVGButton path="/svgs/hide.svg" text="Ocultar respostas" handleOnClick={getAnswers} />
                    <Answers key={key} comment={id} />
                </>
            }
        </div>
    )
}

export default Comment
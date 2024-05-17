import '../../../styles/components/page-components/post/answer.scss';

import Button from '../../form/Button';
import BlurMessage from './BlurMessage';
import Textarea from '../../form/Textarea';

import { useUser } from '../../../context/UserProvider';
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

type AnswerProps = {
    id: string;
    username: string;
    photo: string;
    text: string;
    dateAnswer: string;
    onDelete?: (id: string) => void;
}

const Answer: React.FC<AnswerProps> = ({ id, username, photo, text, dateAnswer, onDelete }) => {

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    const user = useUser();

    const [editing, setEditing] = useState(false)

    const edit = () => {
        setEditing(!editing);
    }

    const [answerText, setAnswerText] = useState(text);
    const [newAnswerText, setNewAnswerText] = useState(text);
    const [error, setError] = useState("");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("");
        setNewAnswerText(event.target.value);
    };

    const saveEdit = () => {
        axios.patch(`${API}/posts/post/comments/answers/${id}`, { text: newAnswerText }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setEditing(false);
                setAnswerText(newAnswerText);
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
        axios.delete(`${API}/posts/post/comments/answers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setRemoving(false);
                onDelete && (onDelete(id));
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="answer">
            <div className={`${removing ? "background-warning" : ""}`}>
                <div ref={warningRef}>
                    {removing && (
                        <BlurMessage message="Ainda quer apagar?" text={`Apagando esta resposta ela não poderá ser recuperada.`} handleOnClick={saveRemove} />
                    )}
                </div>
            </div>
            <div className="top">
                <img src={photo} alt={`Foto de usuário de ${username}`} />
                <Link to={`/user/${username}`}><h1>{username}</h1></Link>
                <p>{dateAnswer}</p>
            </div>
            {!editing ? (
                <>
                    <div className="content">
                        <p>{answerText}</p>
                    </div>
                </>
            ) :
                <>
                    <Textarea action="Salvar" value={newAnswerText} error={error} handleOnChange={handleTextChange} handleOnClick={saveEdit} />
                </>}
            {username === user?.username && user.username !== "Demo" && (
                <div className="owner">
                    <Button text="Apagar" transparent handleOnClick={remove} />
                    <Button text={`${editing ? "Voltar" : "Editar"}`} transparent handleOnClick={edit} />
                </div>
            )}
        </div>
    )
}

export default Answer
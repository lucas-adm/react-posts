import '../styles/pages/post.scss';

import SideProfile from '../components/page-components/home/SideProfile';
import Post from '../components/page-components/post/Post';
import SideUsers from '../components/page-components/home/SideList';
import SVGButton from '../components/action/SVGButton';
import Button from '../components/form/Button';
import BlurMessage from '../components/page-components/post/BlurMessage';
import Textarea from '../components/form/Textarea';
import Comment from '../components/page-components/post/Comment';

import { useUser } from '../context/UserProvider';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

type PostType = {
    id: string;
    username: string;
    photo: string;
    text: string;
    datePost: string;
    status: string;
    upvotes: number;
    comments: CommentType[];
};

type CommentType = {
    id: string;
    username: string;
    photo: string;
    text: string;
    dateComment: string;
    answers: number;
};

const PostPage = () => {

    const user = useUser();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const [loading, setLoading] = useState<boolean>(false);

    const API = import.meta.env.VITE_API;

    const token = localStorage.getItem('token');

    const param = useParams();
    const id = param.id;

    const [post, setPost] = useState<PostType>({
        id: '',
        username: '',
        photo: '',
        text: '',
        datePost: '',
        status: '',
        upvotes: 0,
        comments: []
    });

    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        axios.get(`${API}/posts/post/${id}`)
            .then((response) => {
                setLoading(false);
                setPost(response.data);
                setStatus(response.data.status);
            })
            .catch(() => {
                setLoading(false);
                navigate('/');
            });
    }, [])

    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("");
        setText(event.target.value);
    }

    const comment = () => {
        axios.post(`${API}/posts/post/${post.id}/comments`, { text: text }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                axios.get(`${API}/posts/post/${id}`)
                    .then(response => setPost(response.data))
            })
            .catch(() => {
                navigate('/');
            })
    }

    const handleDeleteComment = (id: string) => {
        setPost(prevPost => ({
            ...prevPost,
            comments: prevPost.comments.filter(comment => comment.id !== id)
        }));
    };

    const [removing, setRemoving] = useState<boolean>(false);

    useEffect(() => {
        if (removing) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [removing]);

    const close = () => {
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

    const patch = () => {
        axios.patch(`${API}/posts/post/${post.id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setStatus("CLOSED");
                setRemoving(false);
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="container-post">
            <SideProfile />
            {loading ? (
                <img src="/svgs/loading.svg" />
            ) : (
                <div className="container-center">
                    <div className="goBack">
                        <SVGButton path="/svgs/back.svg" handleOnClick={goBack} />
                    </div>
                    <Post key={post.id} id={post.id} username={post.username} photo={post.photo} text={post.text} time={post.datePost} status={status} upvotes={post.upvotes} comments={post.comments.length} />
                    <div className="container-comments">
                        {status === "OPEN" ?
                            <>
                                <div className="top">
                                    <h1>Comentários</h1>
                                </div>
                                {post.username === user?.username && user.username !== "Demo" && (
                                    <><Button text="Trancar comentários" transparent handleOnClick={close} />
                                        <div className={`${removing ? "background-warning" : ""}`}>
                                            <div ref={warningRef}>
                                                {removing && (
                                                    <BlurMessage message="Trancar?" text="Fechar uma postagem bloqueia todos os futuros comentários e respostas." handleOnClick={patch} />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <Textarea action="Comentar" error={error} handleOnChange={handleTextarea} handleOnClick={comment} />
                            </> :
                            <>
                                <div className="top">
                                    <h1 className="advise">Conversa fechada</h1>
                                </div>
                            </>}
                        <div className="comments">
                            {post.comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    username={comment.username}
                                    photo={comment.photo}
                                    text={comment.text}
                                    dateComment={comment.dateComment}
                                    answers={comment.answers}
                                    onDelete={handleDeleteComment}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <SideUsers />
        </div>
    )
}

export default PostPage
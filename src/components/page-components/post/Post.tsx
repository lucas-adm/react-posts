import '../../../styles/components/page-components/post/post.scss';

import Picture from '../../picture/Picture';
import SVGButton from '../../action/SVGButton';
import Button from '../../form/Button';
import Textarea from '../../form/Textarea';
import BlurMessage from './BlurMessage';

import { useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/slice';

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

type PostProps = {
  id: string;
  username: string;
  photo: string;
  text: string;
  time: string;
  status?: string;
  upvotes?: number;
  comments?: number | Array<Comment>;
  onDelete?: (id: string) => void;
};

const Post = ({ id, username, photo, text, time, upvotes, comments, status, onDelete }: PostProps) => {

  const user = useSelector(useUser);

  const API = import.meta.env.VITE_API;

  const token = localStorage.getItem('token');

  const [editing, setEditing] = useState(false)

  const edit = () => {
    setEditing(!editing);
  }

  const [postText, setPostText] = useState(text);
  const [newText, setNewText] = useState(text);
  const [error, setError] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    setNewText(event.target.value);
  };

  const saveEdit = () => {
    axios.put(`${API}/posts/post/${id}`, { text: newText }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setEditing(false);
        setPostText(newText);
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

  const navigate = useNavigate();
  const location = useLocation();
  const saveRemove = () => {
    axios.delete(`${API}/posts/post/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setRemoving(false);
        onDelete && (onDelete(id));
        location.pathname === (`/post/${id}`) && (navigate('/'));
      })
      .catch(error => console.error(error));
  }

  const [upvoted, setUpvoted] = useState(false);

  const [upvote, setUpvote] = useState<number>(upvotes ? upvotes : 0);

  useEffect(() => {
    axios.get(`${API}/posts/post/upvotes/${id}?username=${user?.username}`)
      .then(response => setUpvoted(response.data))
      .catch(() => { return })
  }, [id, user?.id])

  const increase = () => {
    axios.post(`${API}/posts/post/upvotes/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setUpvote(upvote + 1);
        setUpvoted(true);
      })
      .catch(() => {
        return;
      })
  }

  const decrease = () => {
    axios.delete(`${API}/posts/post/upvotes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setUpvote(upvote - 1);
        setUpvoted(false);
      })
      .catch(() => {
        return;
      })
  }

  return (
    <div className="post">
      {username === user?.username && user.username !== "Demo" && (
        <div className="owner">
          <Button text="Apagar" transparent handleOnClick={remove} />
          <Button text={`${editing ? "Voltar" : "Editar"}`} transparent handleOnClick={edit} />
        </div>
      )}
      <div className={`${removing ? "background-warning" : ""}`}>
        <div ref={warningRef}>
          {removing && (
            <BlurMessage message="Ainda quer apagar?" text={`Apagando esta postagem ela não poderá ser recuperada.`} handleOnClick={saveRemove} />
          )}
        </div>
      </div>
      <div className="top">
        <Picture src={photo} username={username} width="6.66rem" />
        <Link to={`/user/${username}`}><h1>{username}</h1></Link>
        <p>{time}</p>
      </div>
      {!editing ?
        <>
          <div className="content">
            <Link to={`/post/${id}`}><p>{postText}</p></Link>
          </div>
        </> :
        <>
          <Textarea action="Salvar" value={newText} error={error} handleOnChange={handleTextChange} handleOnClick={saveEdit} />
        </>}
      <div className="bottom">
        {upvoted ?
          <>
            <SVGButton path="/svgs/upvoted.svg" number={upvote} handleOnClick={decrease} />
          </> :
          <>
            <SVGButton path="/svgs/upvote.svg" number={upvote} handleOnClick={increase} />
          </>}
        <Link to={`/post/${id}`}>
          <SVGButton path={status === "ATIVO" ? "/svgs/chat-open.svg" : "/svgs/chat-off.svg"} number={comments} border />
        </Link>
        <Link to={`/post/${id}`}>
          <SVGButton text={status} />
        </Link>
      </div>
    </div>
  )
}

export default Post
import '../styles/pages/home.scss';

import SideProfile from '../components/page-components/home/SideProfile';
import SideUsers from '../components/page-components/home/SideList';
import Textarea from '../components/form/Textarea';
import Posts from '../components/page-components/post/Posts';

import { useState } from 'react';
import axios from 'axios';

const Home = () => {

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem('token');

  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    setText(event.target.value);
  }

  const [requesting, setRequesting] = useState<boolean>(false);

  const [key, setKey] = useState(0);

  const post = () => {
    setRequesting(true);
    axios.post(`${API}/posts`, { text: text }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      setKey(prevKey => prevKey + 1);
      setText("");
      setRequesting(false);
    })
      .catch(() => {
        setError("ué");
        setRequesting(false);
      })
  }

  return (
    <main className="container-home">
      <SideProfile />
      <div className="container-center">
        <Textarea action={`${requesting ? "..." : "Post"}`} error={error} handleOnChange={handleTextarea} handleOnClick={post} />
        <Posts key={key} />
      </div>
      <SideUsers />
    </main >
  )
}

export default Home
import '../styles/pages/home.scss';

import SideProfile from '../components/page-components/home/SideProfile';
import SideUsers from '../components/page-components/home/SideList';
import Posts from '../components/page-components/post/Posts';

import { ChangeEvent, useState } from 'react';

const Home = () => {

  const [isFull, setIsFull] = useState(false);

  const count = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsFull(event.target.value.length === 255);
  }

  return (
    <main className="container-home">
      <SideProfile />
      <div className="container-center">
        <div className="create-post">
          <textarea maxLength={255} placeholder="No que cê tá pensano?" onChange={count} />
          <div className="new-post">
            <p>{`${isFull ? 'Limite de 255 caracteres.' : ''}`}</p>
            <button>Post</button>
          </div>
        </div>
        <Posts />
      </div>
      <SideUsers />
    </main >
  )
}

export default Home
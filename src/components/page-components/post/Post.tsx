import '../../../styles/components/page-components/post/post.scss';

import SVGButton from '../../action/SVGButton';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Post = () => {

  const [upvoted, setUpvoted] = useState(false);

  const upvote = () => {
    setUpvoted(!upvoted);
  }

  return (
    <div className="post">
      <div className="top">
        <img src="/imgs/logo.png" alt="foto de usuário" />
        <Link to={'/user/João Embaixadinha'}><h1>@KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</h1></Link>
        <p>10 abril,24 18:57</p>
      </div>
      <div className="content">
        <Link to={'/post/uuid'}><p>KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</p></Link>
      </div>
      <div className="bottom">
        <SVGButton path={`${upvoted ? '/svgs/upvoted.svg' : '/svgs/upvotes.svg'}`} number="333" handleOnClick={upvote} border />
        <Link to={'/post/uuid'}>
          <SVGButton path="/svgs/comments.svg" number='333' border />
        </Link>
      </div>
    </div>
  )
}

export default Post
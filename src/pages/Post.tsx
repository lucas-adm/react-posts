import '../styles/pages/post.scss';

import SideProfile from '../components/page-components/home/SideProfile';
import Post from '../components/page-components/post/Post';
import Comment from '../components/page-components/post/Comment';
import SideUsers from '../components/page-components/home/SideList';
import SVGButton from '../components/action/SVGButton';

import { useNavigate } from 'react-router-dom';

const PostPage = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="container-post">
            <SideProfile />
            <div className="container-center">
                <div className="goBack">
                    <SVGButton path="/svgs/back.svg" handleOnClick={goBack} />
                </div>
                <Post />
                <div className="comments">
                    <div className="top">
                        <h1>Comentários</h1>
                    </div>
                    <Comment />
                </div>
            </div>
            <SideUsers />
        </div>
    )
}

export default PostPage
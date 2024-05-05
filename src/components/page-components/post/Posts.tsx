import '../../../styles/components/page-components/post/posts.scss';

import SVGButton from '../../action/SVGButton'
import Post from './Post'

const Posts = () => {
    return (
        <div className="posts">
            <div className="top">
                <h1 className="current">Relevantes</h1>
                <h1>+Votados</h1>
                <h1>Recentes</h1>
            </div>
            <Post />
            <SVGButton path="/svgs/load-more.svg" />
        </div>
    )
}

export default Posts
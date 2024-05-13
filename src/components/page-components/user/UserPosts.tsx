import SVGButton from '../../action/SVGButton';
import Post from '../post/Post';

import { useState, useEffect } from 'react';
import axios from 'axios';

type UserPostsProps = {
    param: string | undefined;
}

interface PostState {
    id: string;
    username: string;
    photo: string;
    text: string;
    datePost: string;
    status?: string;
    upvotes?: string;
    comments?: number | Array<Comment>;
}

const UserPosts: React.FC<UserPostsProps> = ({ param }) => {

    const [posts, setPosts] = useState<PostState[]>([]);

    const [search, setSearch] = useState('recent');

    const [page, setPage] = useState(0);

    const [max, setMax] = useState(false);

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        let url: string = '';
        const currentPage = 0;
        setPage(currentPage);
        setPosts([]);

        if (search === 'relevant') {
            url = `${API}/posts/${param}?page=${currentPage}&size=2&sortBy=commentCount`;
        }

        if (search === 'trending') {
            url = `${API}/posts/${param}?page=${currentPage}&size=2&sortBy=upvoteCount`;
        }

        if (search === 'recent') {
            url = `${API}/posts/${param}?page=${currentPage}&size=2&`;
        }

        axios.get(url)
            .then((response) => {
                setPosts(response.data);
                response.data.length === 10 ? setMax(false) : setMax(true);
            })
            .catch(error => console.log(error));
    }, [search, param]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);

        let url: string = '';

        if (search === 'relevant') {
            url = `${API}/posts/${param}?page=${nextPage}&size=10&sortBy=commentCount`;
        }

        if (search === 'trending') {
            url = `${API}/posts/${param}?page=${nextPage}&size=10&sortBy=upvoteCount`;
        }

        if (search === 'recent') {
            url = `${API}/posts/${param}?page=${nextPage}&size=10&`;
        }

        axios.get(url)
            .then((response) => {
                setPosts(prevPosts => [...prevPosts, ...response.data]);
                response.data.length === 10 ? setMax(false) : setMax(true);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="posts">
            {posts.length > 0 ?
                <>
                    <div className="top">
                        <button className={search === 'relevant' ? 'current' : ''} onClick={() => setSearch('relevant')}>Relevantes</button>
                        <button className={search === 'trending' ? 'current' : ''} onClick={() => setSearch('trending')}>+Votados</button>
                        <button className={search === 'recent' ? 'current' : ''} onClick={() => setSearch('recent')}>Recentes</button>
                    </div>
                    {posts.map(post => (
                        <Post
                            id={post.id}
                            username={post.username}
                            photo={post.photo}
                            text={post.text}
                            time={post.datePost}
                            upvotes={post.upvotes}
                            comments={post.comments}
                            status={post.status}
                        />
                    ))}
                    {!max && (
                        <SVGButton path="/svgs/load-more.svg" handleOnClick={loadMore} />
                    )}
                </> :
                <>
                    <div className="empty">
                        <img src="/svgs/ghost.svg" alt="Imagem de um fantasma" />
                        <h1>Nunca postou nada</h1>
                    </div>
                </>
            }
        </div>
    )
}

export default UserPosts
import '../../../styles/components/page-components/post/posts.scss';

import SVGButton from '../../action/SVGButton'
import Post from './Post'

import { useState, useEffect } from 'react';
import axios from 'axios';

interface PostState {
    id: string;
    username: string;
    photo: string;
    text: string;
    datePost: string;
    status?: string;
    upvotes?: string | number;
    comments?: number | Array<Comment>;
}

const Posts = () => {

    const [posts, setPosts] = useState<PostState[]>([]);

    const [search, setSearch] = useState('recent');

    const [page, setPage] = useState(0);

    const [max, setMax] = useState(false);

    const API = import.meta.env.VITE_API;

    const [deleted, setDeleted] = useState(false);

    const handleDeletePost = (id: string) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        setDeleted(true);
    }

    useEffect(() => {
        let url: string = '';
        const currentPage = 0;
        setPage(currentPage);
        setPosts([]);

        if (search === 'relevant') {
            url = `${API}/posts?page=${currentPage}&size=10&sortBy=commentCount`;
        }

        if (search === 'trending') {
            url = `${API}/posts?page=${currentPage}&size=10&sortBy=upvoteCount`;
        }

        if (search === 'recent') {
            url = `${API}/posts?page=${currentPage}&size=10&`;
        }

        axios.get(url)
            .then((response) => {
                setPosts(response.data);
                response.data.length === 10 ? setMax(false) : setMax(true);
            })
            .catch(error => console.log(error));
    }, [search, deleted]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);

        let url: string = '';

        if (search === 'relevant') {
            url = `${API}/posts?page=${nextPage}&size=10&sortBy=commentCount`;
        }

        if (search === 'trending') {
            url = `${API}/posts?page=${nextPage}&size=10&sortBy=upvoteCount`;
        }

        if (search === 'recent') {
            url = `${API}/posts?page=${nextPage}&size=10&`;
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
            <div className="top">
                <button className={search === 'relevant' ? 'current' : ''} onClick={() => setSearch('relevant')}>Relevantes</button>
                <button className={search === 'trending' ? 'current' : ''} onClick={() => setSearch('trending')}>+Votados</button>
                <button className={search === 'recent' ? 'current' : ''} onClick={() => setSearch('recent')}>Recentes</button>
            </div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    photo={post.photo}
                    text={post.text}
                    time={post.datePost}
                    upvotes={post.upvotes}
                    comments={post.comments}
                    status={post.status}
                    onDelete={handleDeletePost}
                />
            ))}
            {!max && (
                <SVGButton path="/svgs/load-more.svg" handleOnClick={loadMore} />
            )}
        </div>
    )
}

export default Posts
import '../../../styles/components/page-components/post/answers.scss';

import SVGButton from "../../action/SVGButton";
import Answer from "./Answer";

import { useState, useEffect } from "react"
import axios from "axios"

type AnswerProps = {
    comment: string;
}

interface AnswerState {
    id: string
    username: string
    photo: string
    text: string
    dateAnswer: string
    onDelete: (id: string) => void;
}

const Answers: React.FC<AnswerProps> = ({ comment }) => {

    const [answers, setAnswers] = useState<AnswerState[]>([]);

    const [page, setPage] = useState(0);

    const [max, setMax] = useState(false);

    const API = import.meta.env.VITE_API;

    const [deleted, setDeleted] = useState(false);

    const handleDeleteAnswer = (id: string) => {
        setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== id));
        setDeleted(true);
    }

    useEffect(() => {
        const currentPage = 0;
        setPage(currentPage);
        const url: string = `${API}/posts/post/comments/${comment}?page=${currentPage}&size=5`;
        setAnswers([]);
        setMax(false);

        axios.get(url)
            .then((response) => {
                if (response.data.length < 5) {
                    setMax(true);
                }
                setAnswers(response.data);
            })
            .catch(error => console.log(error));
    }, [deleted]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const url: string = `${API}/posts/post/comments/${comment}?page=${nextPage}&size=5`;

        axios.get(url)
            .then((response) => {
                if (response.data.length < 5) {
                    setMax(true);
                }
                setAnswers(prevAnswers => [...prevAnswers, ...response.data]);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="container-answers">
            {answers.map(answer => (
                <Answer
                    key={answer.id}
                    id={answer.id}
                    username={answer.username}
                    photo={answer.photo}
                    text={answer.text}
                    dateAnswer={answer.dateAnswer}
                    onDelete={handleDeleteAnswer}
                />
            ))}
            {!max && (
                <SVGButton path="/svgs/load-more.svg" spacing text="Mostrar mais" handleOnClick={loadMore} />
            )}
        </div>
    )
}

export default Answers
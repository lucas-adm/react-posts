import '../../styles/components/form/textarea.scss';

import { useState, useRef } from 'react';

type TextareaProps = {
    action: string;
    value?: string;
    handleOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ action, value, error, handleOnChange, handleOnClick }) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [isFull, setIsFull] = useState(false);

    const count = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsFull(event.target.value.length === 255);
        if (handleOnChange) {
            handleOnChange(event);
        }
    }

    const click = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
        if (handleOnClick) {
            handleOnClick(event);
        }
    }

    return (
        <div className="container-text">
            <textarea maxLength={255} placeholder="Dá o papo" onChange={count} value={value} ref={textareaRef} />
            <div className="new-post">
                <p>{isFull ? 'Limite de 255 caracteres.' : ''} {error}</p>
                <button onClick={click}>{action}</button>
            </div>
        </div>
    )
}

export default Textarea
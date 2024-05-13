import '../../../styles/components/page-components/post/blur-message.scss';


type BlurMessageProps = {
    message: string;
    text: string;
    handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const BlurMessage: React.FC<BlurMessageProps> = ({ message, text, handleOnClick }) => {
    return (
        <div className="container-message">
            <p><i>{text}</i></p>
            <p>{message}</p>
            <div className="options">
                <button onClick={handleOnClick}>Sim</button>
            </div>
        </div>
    )
}

export default BlurMessage
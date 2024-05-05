import '../../styles/components/action/svg-button.scss';

type SVGButtonProps = {
    border?: boolean,
    spacing?: boolean,
    path: string,
    number?: string,
    text?: string,
    handleOnClick?: (event: React.MouseEvent<HTMLElement>) => void
};

const SVGButton: React.FC<SVGButtonProps> = ({ border, spacing, path, number, text, handleOnClick }) => {
    return (
        <div className={`${spacing ? 'spacing' : ''} svg-button`}>
            <button className={`${border ? 'border' : ''}`} onClick={handleOnClick}>
                <img src={path} alt="botão de ação" />
                <p>{number} {text}</p>
            </button>
        </div>
    )
}

export default SVGButton
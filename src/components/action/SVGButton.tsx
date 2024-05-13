import '../../styles/components/action/svg-button.scss';

type SVGButtonProps = {
    border?: boolean;
    spacing?: boolean;
    path?: string;
    number?: number | string | Array<any>;
    text?: string;
    handleOnClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const SVGButton: React.FC<SVGButtonProps> = ({ border, spacing, path, number, text, handleOnClick }) => {
    return (
        <div className={`svg-button ${spacing ? 'spacing' : ''}`}>
            <button className={`${border ? 'border' : ''}`} onClick={handleOnClick}>
                {path ? (
                    <>
                        <img src={path} alt="botão de ação" />
                        <p>{number} {text}</p>
                    </>
                ) :
                    <>
                        <>
                            <p>{text}</p>
                        </>
                    </>}
            </button>
        </div>
    )
}

export default SVGButton
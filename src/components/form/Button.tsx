import '../../styles/components/form/button.scss'

type ButtonProps = {
    text: string;
    transparent?: boolean;
    handleOnClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ text, transparent, handleOnClick }) => {
    return (
        <div className="button">
            <button className={`${transparent ? 'transparent' : ''}`} onClick={handleOnClick}>
                {text}
            </button>
        </div>
    )
}

export default Button;
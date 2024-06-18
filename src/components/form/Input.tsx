import '../../styles/components/form/input.scss'

type InputProps = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    value?: string;
    image: string;
    handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleOnClick?: (event: React.MouseEvent<HTMLElement>) => void;
    error?: string;
    repeat?: {
        name: string;
        type: string;
        placeholder: string;
        value?: string;
        image: string;
        handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleOnClick?: (event: React.MouseEvent<HTMLElement>) => void;
        error?: string;
    };
};

const Input = ({ name, label, type, placeholder, value, image, handleOnChange, handleOnKeyDown, handleOnClick, error, repeat }: InputProps) => {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <div className="input-content">
                <input required name={name} type={type} placeholder={placeholder} value={value} onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
                <img src={image} alt="imagem do input" onClick={handleOnClick} />
            </div>
            {error && <div className="error">{error}</div>}
            {repeat &&
                <>
                    <div className="input-content password">
                        <input required name={repeat.name} type={repeat.type} placeholder={repeat.placeholder} onChange={repeat.handleOnChange} />
                        <img src={repeat.image} alt="imagem do input" onClick={repeat.handleOnClick} />
                    </div>
                    {error && <div className="error">{repeat.error}</div>}
                </>
            }
        </div>
    );
};

export default Input;
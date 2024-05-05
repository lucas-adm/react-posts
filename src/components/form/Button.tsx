import '../../styles/components/form/button.scss'

type ButtonProps = {
    text: string,
    transparent?: boolean
};

const Button: React.FC<ButtonProps> = ({ text, transparent }) => {
    return (
        <div className="button">
            <button className={`${transparent ? 'transparent' : ''}`}>{text}</button>
        </div>
    )
}

export default Button;
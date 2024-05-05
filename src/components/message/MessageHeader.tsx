import '../../styles/components/message/message-header.scss'

type MessageHeaderProps = {
    text: string;
};

const MessageHeader: React.FC<MessageHeaderProps> = ({ text }) => {
    return (
        <div className="msg-header">
            <div className="logo">
                <img src="/imgs/logo.png" alt="Logo" />
                <h1>Posts!</h1>
            </div>
            <h1>{text}</h1>
        </div>
    )
}

export default MessageHeader;

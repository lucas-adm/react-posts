import '../../styles/components/picture/picture.scss';

type PictureProps = {
    src: string | undefined;
    username: string | undefined;
    width: string;
}

const Picture = ({ src, username, width }: PictureProps) => {
    return (
        <div className="container-picture" style={{ width: width }}>
            <img src={src} alt={`Foto de perfil do usuário ${username}`} />
        </div>
    )
}

export default Picture
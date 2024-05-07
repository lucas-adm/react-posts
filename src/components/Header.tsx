import '../styles/components/header.scss';

import { useUser } from '../context/UserProvider';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const user = useUser();

    const [open, setOpen] = useState(false);

    const openMenu = () => {
        setOpen(!open);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => {
            if (menuRef.current) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <header>
            <nav>
                <Link to={'/'}>
                    <div className="logo">
                        <img src="/imgs/logo.png" alt="Posts logo" />
                    </div>
                </Link>
                <div className="profile" ref={menuRef}>
                    <img src={user?.photo} alt="Posts logo" onClick={openMenu} />
                    <ul className={`${open ? 'active' : 'inactive'}`}>
                        <li className="border-bottom"><Link to={`/user/${user?.username}`}>{user?.username}</Link></li>
                        <li><Link to={'/user/photo'}>Trocar foto</Link></li>
                        <li><Link to={'/validate'}>Editar informações</Link></li>
                        <li><Link to={'/user/delete'}>Deletar conta</Link></li>
                        <li className="border-top" onClick={logout}><Link to={'/'} >Desconectar</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
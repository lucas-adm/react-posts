import '../styles/components/header.scss';

import SVGButton from './action/SVGButton';
import SideList from './page-components/home/SideList';

import { useUser } from '../context/UserProvider';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const user = useUser();

    const [open, setOpen] = useState(false);

    const openMenu = () => {
        setOpen(!open);
    };

    const [closed, setClosed] = useState(true);

    const closeSidebar = () => {
        setClosed(true);
    };

    const openSearch = () => {
        setClosed(!closed);
    }

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
                <SideList className={`${closed ? "inactive" : "active"}`} onClose={closeSidebar}/>
                <div className={`go-back ${closed ? "inactive" : "active"}`}>
                    <SVGButton path="/svgs/back.svg" handleOnClick={openSearch} />
                </div>
                <Link to={'/'}>
                    <div className="logo">
                        <img src="/imgs/logo.png" alt="Posts logo" />
                    </div>
                </Link>
                <SVGButton path="/svgs/search.svg" handleOnClick={openSearch} />
                <div className="profile" ref={menuRef}>
                    {user?.username !== "Demo" ?
                        <>
                            <img src={user?.photo} alt="Posts logo" onClick={openMenu} />
                            <ul className={`${open ? 'active' : 'inactive'}`}>
                                <li className="border-bottom"><Link to={`/user/${user?.username}`}>{user?.username}</Link></li>
                                <li><Link to={'/user/photo'}>Trocar foto</Link></li>
                                <li><Link to={'/user/edit'}>Editar informações</Link></li>
                                <li><Link to={'/user/delete'}>Deletar conta</Link></li>
                                <li className="border-top" onClick={logout}><Link to={'/'} >Desconectar</Link></li>
                            </ul>
                        </> :
                        <>
                            <img src={user?.photo} alt="Posts logo" onClick={openMenu} />
                            <ul className={`${open ? 'active' : 'inactive'}`}>
                                <li className="border-bottom"><Link to={`/user/${user?.username}`}>{user?.username}</Link></li>
                                <li><Link to={'/register'}>Criar conta</Link></li>
                                <li className="border-top" onClick={logout}><Link to={'/'} >Desconectar</Link></li>
                            </ul>
                        </>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
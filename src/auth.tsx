import { ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logoutUser } from './redux/user/slice';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    let isAuthenticated = false;

    const navigate = useNavigate();

    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
            isAuthenticated = true;
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated || !username) {
            dispatch(logoutUser());
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated || !username) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
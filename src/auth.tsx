import { ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logoutUser } from './redux/user/slice';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let isAuthenticated = false;

    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
            isAuthenticated = true;
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(logoutUser());
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
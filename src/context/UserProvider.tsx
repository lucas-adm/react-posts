import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    username: string;
    photo: string;
    birthDate: string;
    role: string;
}

interface ProtectedRouteProps {
    children: ReactNode;
}

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<ProtectedRouteProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<{ sub: string }>(token);
            const username = decoded.sub;

            const API = import.meta.env.VITE_API as string;
            axios.get<User>(`${API}/users/${username}`)
                .then((response) => {
                    setUser(response.data)
                })
                .catch(() => {
                    navigate('/');
                })
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): User | null => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};
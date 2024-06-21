import { useSelector, useDispatch } from "react-redux";
import { useUser, setUser, logoutUser } from "./slice";

import axios from "axios";
import { ReactNode, useEffect } from "react";

const UserProvider = ({ children }: { children: ReactNode }) => {
    const user = useSelector(useUser);

    const dispatch = useDispatch();

    const API = import.meta.env.VITE_API;

    const username = localStorage.getItem('username');

    useEffect(() => {
        if (user !== null) return;
        axios.get(`${API}/users/${username}`)
            .then((response) => {
                dispatch(setUser(response.data));
            })
            .catch(() => dispatch(logoutUser()));
    }, [])

    return (
        <>{children}</>
    )
}

export default UserProvider
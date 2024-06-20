import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

interface UserState {
    id: string;
    email: string;
    username: string;
    photo: string;
    birthDate: string;
    role: string;
}

const initialState = {
    user: null as UserState | null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
});

export const useUser = (state: RootState) => state.userReducer.user;

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
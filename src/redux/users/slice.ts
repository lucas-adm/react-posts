import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../redux/rootReducer';

const initialState = {
    users: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        }
    }
});

export const useUsers = (state: RootState) => state.usersReducer.users;

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;
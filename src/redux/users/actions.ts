import UsersActionTypes from "./actionsType";

interface UserState {
    username: string;
    photo: string;
}

export const getUsers = (payload: UserState[]) => ({
    type: UsersActionTypes.GET_USERS,
    payload
});
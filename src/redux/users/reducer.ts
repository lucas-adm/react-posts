import UsersActionTypes from "./actionsType";

interface UserState {
    username: string;
    photo: string;
}

interface FetchUsersAction {
    type: typeof UsersActionTypes.GET_USERS;
    payload: UserState[];
}

const initialState: { users: UserState[] } = {
    users: []
}

const usersReducer = (state = initialState, action: FetchUsersAction) => {
    switch (action.type) {
        case UsersActionTypes.GET_USERS:
            return { ...state, users: action.payload }
        default:
            return state
    }
}

export default usersReducer
import { combineReducers } from "redux";

import userReducer from "./user/slice.ts";
import usersReducer from "./users/slice.ts";

const rootReducer = combineReducers({ userReducer, usersReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
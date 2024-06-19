import { combineReducers } from "redux";

import usersReducer from "./users/reducer.ts";

const rootReducer = combineReducers({ usersReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
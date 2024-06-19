import { createStore } from "redux";

import rootReducer from './rootReducer.ts';

const store = createStore(rootReducer);

export default store;
import { combineReducers, createStore } from "redux";
import authReducer from "./auth/reducer";

const reducer = combineReducers({
  authUser: authReducer,
});

export const store = createStore(reducer);

export default store;

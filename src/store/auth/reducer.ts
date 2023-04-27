import { AUTH_LOGGED_IN, AUTH_LOGGED_OUT } from "./actions";

const reducer = (state = false, action: any) => {
  if (action.type === AUTH_LOGGED_IN) {
    return action.payload.user;
  }
  if (action.type === AUTH_LOGGED_OUT) {
    return false;
  }
  return state;
};

export default reducer;

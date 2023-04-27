export const AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export const AUTH_LOGGED_OUT = "AUTH_LOGGED_OUT";

export const authLoggedIn = (user: any) => ({
  type: AUTH_LOGGED_IN,
  payload: {
    user,
  },
});

export const authLoggedOut = () => ({
  type: AUTH_LOGGED_OUT,
});

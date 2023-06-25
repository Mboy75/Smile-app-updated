export const isLogin = (state) => state.auth.isLoggedIn;

export const userName = (state) => state.auth.user.name;

export const userEmail = (state) => state.auth.user.email;

export const userPhoto = (state) => state.auth.user.photo;

export const id = (state) => state.auth.user.id;

export const checkError = (state) => state.auth.error;

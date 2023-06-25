import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "./Posts/postsApi";
import { authReducer } from "./Auth/authSlice";


const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }).concat(postsApi.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

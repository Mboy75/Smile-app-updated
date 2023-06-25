import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { postsApi } from "./Posts/postsApi";
import { authReducer } from "./Auth/authSlice";

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Specify the reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

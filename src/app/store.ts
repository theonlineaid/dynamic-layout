import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slice/authSlice';
import layoutReducer from './slice/layoutSlice';

import { persistReducer, persistStore, REHYDRATE, PERSIST, REGISTER } from 'redux-persist'
// import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'layout'], // Persist both auth and layout slices
};

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [REHYDRATE, PERSIST, REGISTER],
        },
      }
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;

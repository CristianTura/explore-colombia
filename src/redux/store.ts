import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/auth';
import dashboardReducer from './slices/dashboard';
import pagesReducer from './slices/pages';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken']
};

const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistAuthConfig,
      authReducer
    ),
    dashboard: dashboardReducer,
    pages: pagesReducer,

  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk<T = void> = ThunkAction<
  Promise<T>,
  RootState,
  undefined,
  Action<string>
>;

export const persistor = persistStore(store);

export default store;

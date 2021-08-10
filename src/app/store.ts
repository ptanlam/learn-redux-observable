import {
  Action,
  configureStore,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { UserApi } from '../apis/userApi';
import { rootEpic } from './rootEpic';
import { rootReducer } from './rootReducer';

const epicMiddleware = createEpicMiddleware<PayloadAction>({
  dependencies: {
    userApi: new UserApi(),
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

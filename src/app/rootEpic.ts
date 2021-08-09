import { PayloadAction } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from '../features/user/userEpics';

export const rootEpic = combineEpics<PayloadAction<any>>(fetchUserEpic);

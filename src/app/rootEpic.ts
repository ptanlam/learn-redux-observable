import { PayloadAction } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { fetchListEpic, fetchUserEpic } from '../features/user/userEpics';

export const rootEpic = combineEpics<PayloadAction<any>>(
  fetchUserEpic,
  fetchListEpic
);

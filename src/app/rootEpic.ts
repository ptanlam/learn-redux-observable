import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from '../features/user/userEpics';

export const rootEpic = combineEpics(fetchUserEpic);

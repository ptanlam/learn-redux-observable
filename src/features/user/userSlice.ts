import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';
import { RootState } from '../../app/store';
import { User } from './models/user.model';

export interface UserState {
  fetching: boolean;
  profile: User;
  errorMessage: string;
  list: User[];
}

const initialState: UserState = {
  fetching: false,
  profile: {},
  errorMessage: '',
  list: [],
};

export type FetchUserAction = PayloadAction<{ login: string }>;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetch(state, action: FetchUserAction) {
      state.fetching = true;
      state.errorMessage = '';
    },

    fetchFulfilled(state, action: PayloadAction<User>) {
      state.fetching = false;
      state.profile = action.payload;
    },

    fetchList(state) {
      state.fetching = true;
    },

    fetchListFulfilled(state, action: PayloadAction<User[]>) {
      state.fetching = false;
      state.list = action.payload;
    },

    fetchRejected(state, action: PayloadAction<AjaxError>) {
      state.fetching = false;
      state.errorMessage = action.payload.message;
    },

    cancelFetch(state) {
      state.fetching = false;
    },
  },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const userProfileSelector = (state: RootState) => state.user.profile;
export const userFetchSelector = (state: RootState) => state.user.fetching;
export const userLisSelector = (state: RootState) => state.user.list;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;

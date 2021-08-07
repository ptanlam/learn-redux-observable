import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';
import { RootState } from '../../app/store';
import { User } from './models/user.model';

export interface UserState {
  fetching: boolean;
  profile: User;
  errorMessage: string;
}

const initialState: UserState = {
  fetching: false,
  profile: {},
  errorMessage: '',
};

export type FetchUserAction = PayloadAction<{ login?: string }>;

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
    fetchRejected(state, action: PayloadAction<AjaxError>) {
      state.fetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const userActions = userSlice.actions;

export const userProfileSelector = (state: RootState) => state.user.profile;
export const userFetchSelector = (state: RootState) => state.user.fetching;

const userReducer = userSlice.reducer;
export default userReducer;

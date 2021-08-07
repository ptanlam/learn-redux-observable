import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState } from '../../app/store';
import { User } from './models/user.model';

export interface UserState {
  fetching: boolean;
  profile: User;
}

const initialState: UserState = {
  fetching: false,
  profile: {},
};

export interface FetchUserPayload {
  login?: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetch(state, action: PayloadAction<FetchUserPayload>) {
      state.fetching = true;
    },
    fetchFulfilled(state, action: PayloadAction<User>) {
      state.fetching = false;
      state.profile = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userProfileSelector = (state: RootState) => state.user.profile;
export const userFetchSelector = (state: RootState) => state.user.fetching;

const userReducer = userSlice.reducer;
export default userReducer;

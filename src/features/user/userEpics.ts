import { PayloadAction } from '@reduxjs/toolkit';
import { ofType } from 'redux-observable';
import { Observable, map, mergeMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { FetchUserPayload, userActions } from './userSlice';
import { User } from './models/user.model';

export const fetchUserEpic = (
  action$: Observable<PayloadAction<FetchUserPayload>>
) =>
  action$.pipe(
    ofType(userActions.fetch.type),
    mergeMap((action) =>
      ajax
        .getJSON<User>(`https://api.github.com/users/${action.payload.login}`)
        .pipe(map((response) => userActions.fetchFulfilled(response)))
    )
  );

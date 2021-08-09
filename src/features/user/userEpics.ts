import { PayloadAction } from '@reduxjs/toolkit';
import { ofType } from 'redux-observable';
import {
  catchError,
  debounce,
  map,
  mergeMap,
  Observable,
  of,
  takeUntil,
  timer,
} from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { User } from './models/user.model';
import { FetchUserAction, userActions } from './userSlice';

export const fetchUserEpic = (action$: Observable<FetchUserAction>) =>
  action$.pipe(
    ofType(userActions.fetch.type),
    debounce(() => timer(400)),
    mergeMap((action) =>
      ajax
        .getJSON<User>(`https://api.github.com/users/${action.payload.login}`)
        .pipe(
          map((response) => userActions.fetchFulfilled(response)),
          takeUntil(action$.pipe(ofType(userActions.cancelFetch.type))),
          catchError((error: AjaxError) => {
            return of({
              type: userActions.fetchRejected.type,
              payload: error.xhr.response,
              error: true,
            });
          })
        )
    )
  );

export const fetchListEpic = (action$: Observable<PayloadAction>) =>
  action$.pipe(
    ofType(userActions.fetchList.type),
    mergeMap((action) =>
      ajax.getJSON<User[]>('https://api.github.com/users').pipe(
        map((response) => userActions.fetchListFulfilled(response)),
        takeUntil(action$.pipe(ofType(userActions.cancelFetch.type))),
        catchError((error: AjaxError) => {
          return of({
            type: userActions.fetchRejected.type,
            payload: error.xhr.response,
            error: true,
          });
        })
      )
    )
  );

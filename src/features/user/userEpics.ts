import { Action, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { ofType, StateObservable } from 'redux-observable';
import {
  catchError,
  debounceTime,
  map,
  mergeMap,
  Observable,
  of,
  takeUntil,
} from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { UserApi } from '../../apis/userApi';
import { FetchUserAction, userActions } from './userSlice';

interface Props {
  userApi: UserApi;
}

export const fetchUserEpic = (
  action$: Observable<FetchUserAction>,
  _state$: StateObservable<RootStateOrAny> | null,
  { userApi }: Props
) =>
  action$.pipe(
    ofType(userActions.fetch.type),
    debounceTime(400),
    mergeMap((action) =>
      userApi.getUserByName(action.payload.login).pipe(
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

export const fetchListEpic = (
  action$: Observable<Action>,
  _state$: StateObservable<RootStateOrAny> | null,
  { userApi }: Props
) =>
  action$.pipe(
    ofType(userActions.fetchList.type),
    mergeMap(() =>
      userApi.getUserList().pipe(
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

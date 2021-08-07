import { ofType } from 'redux-observable';
import {
  catchError,
  debounce,
  map,
  mergeMap,
  Observable,
  of,
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

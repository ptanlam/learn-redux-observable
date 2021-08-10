import { TestScheduler } from 'rxjs/testing';
import { UserApi } from '../../apis/userApi';
import { fetchUserEpic } from './userEpics';
import { userActions } from './userSlice';

describe('User epics test', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toStrictEqual(expected);
    });
  });

  it('return a list of users', () => {
    scheduler.run((helpers) => {
      // Arrange
      const action$ = helpers.hot('-a', {
        a: {
          type: userActions.fetch.type,
          payload: {
            login: 'ptanlam',
          },
        },
      });
      const state$ = null;
      const dependencies = {
        userApi: new UserApi(),
      };

      // Action
      const output$ = fetchUserEpic(action$, state$, dependencies);

      // Assert
      helpers.expectObservable(output$).toBe('----a', {
        a: {
          type: userActions.fetch.type,
          response: {
            url: 'https://api.github.com/users/ptanlam',
          },
        },
      });
    });
  });
});

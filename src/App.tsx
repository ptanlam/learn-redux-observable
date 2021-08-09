import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './features/user/models/user.model';
import {
  userActions,
  userFetchSelector,
  userLisSelector,
  userProfileSelector,
} from './features/user/userSlice';

function App() {
  const [username, setUsername] = useState<string>('');

  const dispatch = useAppDispatch();

  const fetching = useAppSelector(userFetchSelector);
  const userProfile = useAppSelector(userProfileSelector);
  const userList = useAppSelector(userLisSelector);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  useEffect(() => {
    if (!username) return;
    dispatch(userActions.fetch({ login: username }));
  }, [username, dispatch]);

  const onCancelClick = () => {
    dispatch(userActions.cancelFetch());
  };

  const renderUser = (user: User) => (
    <>
      <img
        src={user.avatar_url}
        alt={user.login}
        width={200}
        style={{ borderRadius: '50%' }}
      />
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
    </>
  );

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <h1>Hello</h1>

      <input
        type="text"
        onChange={(e) => setUsername(e.currentTarget.value)}
        value={username}
      />

      <div>
        <button onClick={() => dispatch(userActions.fetchList())}>
          Get List
        </button>
      </div>

      <div>
        <button onClick={onCancelClick}>Cancel</button>
      </div>

      {fetching && <p>loading...</p>}

      {userList.length && userList.map((user) => renderUser(user))}

      {Object.keys(userProfile) && renderUser(userProfile)}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;

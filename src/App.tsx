import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  userActions,
  userFetchSelector,
  userProfileSelector,
} from './features/user/userSlice';

function App() {
  const [username, setUsername] = useState<string>('');

  const dispatch = useAppDispatch();

  const userFetching = useAppSelector(userFetchSelector);
  const userProfile = useAppSelector(userProfileSelector);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  useEffect(() => {
    if (!username) return;
    dispatch(userActions.fetch({ login: username }));
  }, [username, dispatch]);

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

      {userFetching ? (
        <p>loading...</p>
      ) : (
        <>
          <img
            src={userProfile.avatar_url}
            alt={userProfile.login}
            width={200}
          />
          <pre>{JSON.stringify(userProfile, undefined, 2)}</pre>
        </>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  userActions,
  userFetchSelector,
  userProfileSelector,
} from './features/user/userSlice';

function App() {
  const dispatch = useAppDispatch();

  const userFetching = useAppSelector(userFetchSelector);
  const userProfile = useAppSelector(userProfileSelector);

  console.log({ userProfile, userFetching });

  useEffect(() => {
    dispatch(userActions.fetch({ login: 'ptanlam' }));
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>

      <pre>{JSON.stringify(userProfile, undefined, 2)}</pre>
    </div>
  );
}

export default App;

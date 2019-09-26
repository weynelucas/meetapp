import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const Routes = createRouter(isSignedIn);

  return <Routes />;
}

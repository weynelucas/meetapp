import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';
import DefaultLayout from './pages/_layout/default';
import AuthLayout from './pages/_layout/auth';

export default function App() {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const Routes = createRouter(isSignedIn);
  const Layout = isSignedIn ? DefaultLayout : AuthLayout;

  return (
    <Layout>
      <Routes />
    </Layout>
  );
}

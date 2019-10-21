import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';
import DefaultLayout from './pages/_layout/default';

export default function App() {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const Routes = createRouter(isSignedIn);
  const Layout = isSignedIn ? DefaultLayout : ({ children }) => <>{children}</>;

  if (isSignedIn) {
    return (
      <Layout>
        <Routes />
      </Layout>
    );
  }

  return <Routes />;
}

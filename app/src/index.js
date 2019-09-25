import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#000" ba />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

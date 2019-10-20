import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import App from './App';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <App />
      </PersistGate>
    </Provider>
  );
};

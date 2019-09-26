import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

export default isSignedIn =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              labelStyle: {
                fontSize: 12,
                marginTop: 5,
              },
              style: {
                backgroundColor: '#2B1A2F',
                paddingHorizontal: 50,
                paddingTop: 13,
                paddingBottom: 12,
                borderTopWidth: 0,
                height: 64,
              },
            },
          },
        ),
      },
      { initialRouteName: isSignedIn ? 'App' : 'Sign' },
    ),
  );

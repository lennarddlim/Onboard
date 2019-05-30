import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Splash from '../screens/Splash';
import Main from '../screens/Main';

export default class Router extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Splash: Splash,
  Main: Main
});

const AppContainer = createAppContainer(AppSwitchNavigator);

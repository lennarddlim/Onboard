import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';

import logo from '../assets/img/logo.png';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <Image style={styles.logo} source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 400,
    width: 400
  }
});

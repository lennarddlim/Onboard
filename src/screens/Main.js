import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Share,
  StatusBar
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      images: [],
      scale: new Animated.Value(1),
      isImageFocused: false
    };

    this.scale = {
      transform: [{ scale: this.state.scale }]
    };

    this.actionBarY = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, -80]
    });

    this.borderRadius = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [30, 0]
    });
  }

  loadWallpapers = () => {
    axios
      .get(
        'https://api.unsplash.com/photos/random?count=20&client_id=9c917451d0ecb4f0a1d3ca051765307a57aec4a0fe7f2891267142be9ac4b54b'
      )
      .then(
        function(response) {
          console.log(response.data);
          this.setState({ images: response.data, isLoading: false });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log('request completed');
      });
  };

  componentDidMount() {
    this.loadWallpapers();
  }

  showControls = item => {
    this.setState(
      state => ({
        isImageFocused: !state.isImageFocused
      }),
      () => {
        if (this.state.isImageFocused) {
          Animated.spring(this.state.scale, {
            toValue: 0.9
          }).start();
        } else {
          Animated.spring(this.state.scale, {
            toValue: 1
          }).start();
        }
      }
    );
  };

  shareWallpaper = async image => {
    try {
      await Share.share({
        message: 'Checkout this wallpaper' + image.urls.full
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size='large' color='#ff5c5c' />
        </View>
        <TouchableWithoutFeedback onPress={() => this.showControls(item)}>
          <Animated.View style={[{ height, width }, this.scale]}>
            <Animated.Image
              style={{
                flex: 1,
                height: null,
                width: null,
                borderRadius: this.borderRadius
              }}
              source={{ uri: item.urls.regular }}
              resizeMode='cover'
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: this.actionBarY,
            height: 80,
            backgroundColor: 'black',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.loadWallpapers()}
            >
              <Icon name='ios-refresh' color='#ff5c5c' size={40} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.shareWallpaper(item)}
            >
              <Icon name='ios-share' color='#ff5c5c' size={40} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => alert('saveimage')}
            >
              <Icon name='ios-save' color='#ff5c5c' size={40} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#ff5c5c' />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <FlatList
          scrollEnabled={!this.state.isImageFocused}
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

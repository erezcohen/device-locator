import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';

// Send notifications from
// https://console.firebase.google.com/project/perfectush/notification

export default class App extends Component<{}> {

  constructor () {
    super();
    this.state = {
      active: false,
      on: true
    };
    this.intervalId = setInterval(() => {
      this.setState(previousState => ({on: !previousState.on}));
    }, 200);
    this.onButtonPressed = this.onButtonPressed.bind(this);
  }

  componentDidMount() {
    this.notificationListener = FCM.on(FCMEvent.Notification, async () => {
      this.setState({active: true});
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.notificationListener.remove();
  }

  onButtonPressed() {
    this.setState(previousState => ({active: !previousState.active}));
  }

  render () {
    const {active, on} = this.state;
    return (
      <View style={[styles.container, active && on && styles.on, active && !on && styles.off]}>
        <Button onPress={this.onButtonPressed}
                style={styles.found}
                title='Ok! I got it!'
        />
      </View>
    )
      ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  on: {
    backgroundColor: 'red',
  },
  off: {
    backgroundColor: 'black',
  },
  found: {
    width: 200,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  }
});

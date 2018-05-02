/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native'
import {WalletConnector} from 'walletconnect'
import Camera from 'react-native-camera'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

type Props = {}
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      qrFound: false,
      opened: false // camera is closed
    }
  }

  onBarCodeRead = async e => {
    this.setState({
      qrFound: true,
      opened: false
    })

    // set session
    const data = JSON.parse(e.data)
    const {sessionId, sharedKey} = data

    try {
      const walletConnector = new WalletConnector(
        'https://walletconnect.matic.network',
        {
          sessionId,
          sharedKey,
          dappName: 'Walletconnect test'
        }
      )

      // sending session data
      await walletConnector.sendSessionStatus({
        fcmToken: '1234', // TODO use real fcm token
        walletWebhook: 'https://walletconnect.matic.network/notification/new',
        data: {
          address: '0x123' // TODO use real address :)
        }
      })

      // success alert
      Alert.alert('Connected', 'Successfully connected with app')
    } catch (e) {
      console.log(e)

      // success alert
      Alert.alert('Failed', 'Connection with app failed. Please try again.')
    }
  }

  scan = () => {
    this.setState({
      opened: true
    })
  }

  render() {
    let mainView = null
    if (this.state.opened && !this.state.qrFound) {
      mainView = (
        <Camera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          aspect={Camera.constants.Aspect.fill}
        />
      )
    } else {
      mainView = (
        <View style={styles.buttonContainer}>
          <Button
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
            title="Scan DApp QR"
            onPress={this.scan}
          />
        </View>
      )
    }
    return <View style={styles.container}>{mainView}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1, // pushes the footer to the end of the screen
    alignItems: 'center',
    justifyContent: 'center'
  }
})

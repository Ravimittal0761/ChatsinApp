import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';

// Only import CometChat on native platforms (Android/iOS)
let CometChat: any;
let COMETCHAT_CONSTANTS: any;

if (Platform.OS !== 'web') {
  CometChat = require('@cometchat-pro/react-native-chat').CometChat;
  COMETCHAT_CONSTANTS = require('./cometchat.config').COMETCHAT_CONSTANTS;
}

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .build();

      CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting)
        .then(() => {
          console.log('CometChat initialized successfully');
        })
        .catch(error => {
          console.log('CometChat initialization failed:', error);
        });
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CometChat App {Platform.OS === 'web' ? '(Web Mode)' : '(Native Mode)'}</Text>
    </View>
  );
}

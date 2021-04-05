import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

const NotificationsScreen = () => {
const [pushToken, setPushToken] = useState('')

  const triggerNotifHandler = async () => {
    // LOCAL NOTIFICATIONS
    // Notifications.scheduleNotificationAsync({
    //   content: { title: 'My first local Notif', body: 'This is the first local notif we are sending!' },
    //   trigger: { seconds: 3 },
    // });

    const message = {
        to: pushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
      };
    
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  };

  const getExpoNotificationsToken = async () => {
    const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (permission.status !== 'granted') {
      const askPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (askPermission.status !== 'granted') {
        throw new Error('Permission not granted!');
      }
    }
    const response = await Notifications.getExpoPushTokenAsync()
    // Http request to save the push token in the user DB
    setPushToken(response.data)
  };

  useEffect(() => {
    getExpoNotificationsToken().catch(err => console.log({err}))
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      // Any code we want here, navigate / http requests ...
      console.log({ response });
    });

    const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
      // Any code we want here, navigate / http requests ...
      console.log(notification);
    });
    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Button title='Trigger notification' onPress={triggerNotifHandler} />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

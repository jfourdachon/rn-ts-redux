import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: true
        }
    }
})

const NotificationsScreen = () => {
  const triggerNotifHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: { title: 'My first local Notif', body: 'This is the first local notif we are sending!' },
      trigger: { seconds: 3 },
    });
  };

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let askPermission;
      if (permission.status !== 'granted') {
        askPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      if (askPermission?.status !== 'granted') {
        // User grants no permission for notifications
        return;
      }
    };
    checkPermission();
  }, []);

useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        // Any code we want here, navigate / http requests ...
        console.log({response})
    })

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
        // Any code we want here, navigate / http requests ...
        console.log(notification)
    })
    return () => {
        foregroundSubscription.remove()
        backgroundSubscription.remove()
    }
},[])

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

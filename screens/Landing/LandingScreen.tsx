import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import { authenticate, setDidTryAutoLogin } from '../../store/actions/auth.actions'

const LandingScreen: NavigationStackScreenComponent = ({navigation}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const tryLogin = async() => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData) {
                dispatch(setDidTryAutoLogin())
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            if(expirationDate <= new Date() || !token || !userId) {
                dispatch(setDidTryAutoLogin())
                return
            }
            const expirationTime = expirationDate.getTime() - new Date().getTime()
            // navigation.navigate('Shop')
            dispatch(authenticate(userId, token, expirationTime))
        }
        tryLogin()
    }, [dispatch])
    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

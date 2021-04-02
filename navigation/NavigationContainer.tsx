import React, { useEffect, useRef } from 'react'
import { NavigationActions, NavigationSwitchProp } from 'react-navigation'
import { NavigationDrawerProp } from 'react-navigation-drawer'
import { useSelector } from 'react-redux'
import { ROOT_STATE } from '../store/combineReducers'
import MainNavigator from './MainNavigator'

const NavigationContainer = () => {
    const isAuth = useSelector((state: ROOT_STATE) => !!state.auth.token)
    const navRef = useRef<any>()

    useEffect(() => {
        if(!isAuth) {
            navRef.current?.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
        }
    },[isAuth])

    return (
        <MainNavigator ref={navRef} />
    )
}

export default NavigationContainer
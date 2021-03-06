import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import { ROOT_STATE } from '../../store/combineReducers'


const ProductDetailsScreen: NavigationStackScreenComponent = ({navigation}) => {
    const productId = navigation.getParam('productId')
    const selectedProduct = useSelector((state: ROOT_STATE) => state.products.availableProducts.find(product => product.id === productId))

    return (
        <View>
            <Text>{selectedProduct?.title}</Text>
        </View>
    )
}

ProductDetailsScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: navigation.getParam('productTitle')
    }
}

export default ProductDetailsScreen

const styles = StyleSheet.create({})

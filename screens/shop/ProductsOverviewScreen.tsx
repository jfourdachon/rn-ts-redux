import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import { ROOT_STATE } from '../../store/combineReducers'


const ProductsOverviewScreen: NavigationStackScreenComponent = () => {

    const products = useSelector((state:ROOT_STATE) => state.products.availableProducts)
    return (
        <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
    )
}

ProductsOverviewScreen.navigationOptions = () => {
    return {
        headerTitle: 'All Products',
    }
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})

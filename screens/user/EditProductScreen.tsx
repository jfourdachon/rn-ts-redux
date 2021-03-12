import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

type IProps = {

}

const EditProductScreen: NavigationStackScreenComponent = () => {
    return (
        <View>
            <Text>The Edit product screen</Text>
        </View>
    )
}

EditProductScreen.navigationOptions = ({navigation}) => {
    const id = navigation.getParam('productId')
    return {
        headerTitle: id ? 'Edit you product' : 'Add a product'
    }
}
export default EditProductScreen

const styles = StyleSheet.create({})

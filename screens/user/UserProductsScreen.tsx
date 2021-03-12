import React from 'react'
import { FlatList, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { ROOT_STATE } from '../../store/combineReducers'

const UserProductsScreen: NavigationStackScreenComponent = () => {

    const userProducts = useSelector((state: ROOT_STATE) => state.products.userProducts)
    return (
       <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} onAddToCart={() => {}} onViewDetail={() => {}} />} />
    )
}

UserProductsScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Your products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Cart'
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        )
    }
}

export default UserProductsScreen


import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'

type IProps = {
    title: string
    price: number
    imageUrl: string
    onViewDetail: () => void
    onAddToCart: () => void
}

const ProductItem = ({title, price, imageUrl, onViewDetail, onAddToCart}: IProps) => {
    return (
        <View style={styles.product}>
            <Image style={styles.iamge} source={{uri: imageUrl}}/>
            <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="View Details" onPress={onViewDetail} color={Colors.primary} />
                <Button title="To Cart" onPress={onAddToCart} color={Colors.primary} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation:5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    iamge: {
        width: '100%',
        height: '60%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
})

export default ProductItem


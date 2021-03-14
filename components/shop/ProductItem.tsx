import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Touchable from '../touchable/Touchable';
import Card from '../UI/Card';

type IProps = {
  title: string;
  price: number;
  imageUrl: string;
  onSelect: () => void;
  children: React.ReactNode;
}

const ProductItem = ({ title, price, imageUrl, onSelect, children }: IProps) => {
  return (
    <Card style={styles.product}>
      <Touchable onPress={onSelect} useForeground>
        <View>
          <Image style={styles.iamge} source={{ uri: imageUrl }} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
           {children}
          </View>
        </View>
      </Touchable>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  iamge: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily:  'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily:  'open-sans'

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});

export default ProductItem;

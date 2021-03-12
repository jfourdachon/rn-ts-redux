import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Touchable from '../touchable/Touchable';

type IProps = {
  title: string;
  price: number;
  imageUrl: string;
  onSelect: () => void;
  children: React.ReactNode;
}

const ProductItem = ({ title, price, imageUrl, onSelect, children }: IProps) => {
  return (
    <View style={styles.product}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  iamge: {
    width: '100%',
    height: '60%',
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

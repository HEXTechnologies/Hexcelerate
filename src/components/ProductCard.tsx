import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import styles from "../stylesheet/ProductCardStyles";
import { RFValue } from "react-native-responsive-fontsize";
import useDimensions from '../components/useDimensions';

// Define the props type for ProductCard
interface ProductCardProps {
  product: {
    click: number;
    id: string;
    name: string;
    price: string;
    image: any;
    hoverImage: any;
  };
  onPress: (product: ProductCardProps["product"]) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onPress }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const scaleValue = useState(new Animated.Value(1))[0];
    const opacityValue = useState(new Animated.Value(1))[0];
    const { width } = useDimensions();
    const isLargeScreen = width > 768;

    /**
     * Handles the mouse enter event, setting the hovered state to true
     * and initiating a parallel animation for scaling and opacity.
     * @return {void}
     */
    const handleMouseEnter = () => {
      setIsHovered(true);
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.7,
          friction: 3,
          tension: 50,
          useNativeDriver: false,
        }).start(),
        Animated.timing(opacityValue, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: false,
        }).start(),
      ]);
    };

    /**
     * Handles the touch in event, setting the touched state to true
     * and initiating a parallel animation for scaling and opacity.
     * @return {void}
     */
    const handleTouchIn = () => {
      setIsTouched(true);
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0.9, // Slight scale for smooth interaction
          duration: 100, // Smooth duration
          useNativeDriver: false,
        }).start(),
        Animated.timing(opacityValue, {
          toValue: 0.6,
          duration: 150, // Smooth duration
          useNativeDriver: false,
        }).start(),
      ]);
    };

    /**
     * Handles the mouse leave event, setting the hovered state to false
     * and initiating a parallel animation for scaling and opacity.
     * @return {void}
     */
    const handleMouseLeave = () => {
      setIsHovered(false);
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 50,
          useNativeDriver: false,
        }).start(),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start(),
      ]);
    };

    /**
     * Handles the touch out event, setting the touched state to false
     * and initiating a parallel animation for scaling and opacity.
     * @return {void}
     */
    const handleTouchOut = () => {
      setIsTouched(false);
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 150, // Smooth duration
          useNativeDriver: false,
        }).start(),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 150, // Smooth duration
          useNativeDriver: false,
        }).start(),
      ]);
    };

    return (
      <Pressable
        style={[styles.card,
            { width: isLargeScreen ? RFValue(140) : 160,
              height: isLargeScreen ? RFValue('auto') : 225
            }]}
        onPress={() => onPress(product)}
        onPressIn={handleTouchIn}
        onPressOut={handleTouchOut}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onLongPress={handleTouchIn}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            { transform: [{ scale: scaleValue }], opacity: opacityValue },
          ]}
        >
          <Image
            source={isHovered && !isTouched ? product.image : product.image}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
        <Text
          style={[styles.name,
          {fontSize: isLargeScreen ? 13 : 12}]}
        >
          {product.name}</Text>
        <Text
          style={[styles.price,
          {fontSize: isLargeScreen ? 11 : 10}]}
        >
          {product.price}
        </Text>
        <Text
          style={[styles.click,
          {fontSize: isLargeScreen ? 9 : 9}]}
        >
          Views: {product.click}
        </Text>
      </Pressable>
    );
  }
);

export default ProductCard;

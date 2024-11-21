import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Dimensions, Animated, Easing } from "react-native";
import ChevronDown from 'react-native-bootstrap-icons/icons/chevron-down';
import ChevronUp from 'react-native-bootstrap-icons/icons/chevron-up';
import styles from "../stylesheet/FilterProductsStyles";

const CATEGORIES = ["All", "Clothing", "Accessories", "Apps", "Services", "Collectibles"];

interface FilterProductsProps {
  filter: string;
  handleFilterChange: (category: string) => void;
  hoveredFilter: string;
  setHoveredFilter: (category: string) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({
  filter,
  handleFilterChange,
  hoveredFilter,
  setHoveredFilter,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(CATEGORIES.map(() => new Animated.Value(-100))).current;
  const danceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      setIsMobile(screenWidth < 768); // Set breakpoint at 768px
    };

    // Attach listener to detect screen size changes
    Dimensions.addEventListener("change", updateLayout);

    // Initial check
    updateLayout();

    // Clean up event listener on unmount
    return () => Dimensions.removeEventListener("change", updateLayout);
  }, []);

  // Animation to rotate the icon when the menu is toggled
  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: menuOpen ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Trigger sliding animation whenever the component mounts or menu is opened
    slideAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 0, // Slide in
        duration: 300 + index * 100, // Stagger animations
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [menuOpen, rotationAnim, slideAnim]);

  // Start dancing animation
  useEffect(() => {
    const startDancing = () => {
      danceAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(danceAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.sin,
            useNativeDriver: true,
          }),
          Animated.timing(danceAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.sin,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 } // Infinite loop
      ).start();
    };

    startDancing();
  }, [danceAnim]);

  // Rotation interpolation (rotates the icon in place)
  const rotateIcon = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Rotates 360 degrees
  });

  // Dance animation interpolation
  const translateX = danceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0], // Move right by 5
  });

  const translateY = danceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4], // Move up by 5
  });

  return (
    <View style={styles.container}>
      {/* Hamburger Button (only visible on small screens) */}
      {isMobile && (
        <Pressable
          style={styles.hamburgerButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {/* Apply Animated.View only to the icon for smooth in-place rotation */}
          <Animated.View style={{ transform: [{ rotate: rotateIcon }, { translateX }, { translateY }] }}>
            {menuOpen ? (
              <ChevronUp height={27} color="black" />
            ) : (
              <ChevronDown color="black" />
            )}
          </Animated.View>
        </Pressable>
      )}

      {/* Filter Menu (Collapsible with sliding text animation, applies on all screen sizes) */}
      {(!isMobile || menuOpen) && (
        <View style={styles.filterContainer}>
          {CATEGORIES.map((category, index) => {
            const isActive = filter === category;
            const isHovered = hoveredFilter === category;

            return (
              <Pressable
                key={category}
                onPress={() => {
                  handleFilterChange(category);
                  setMenuOpen(false); // Close menu on selection (for mobile)
                }}
                onMouseEnter={() => setHoveredFilter(category)}
                onMouseLeave={() => setHoveredFilter("")}
                style={[
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                  isHovered && styles.filterTextHovered,
                ]}
              >
                <Animated.View style={{ transform: [{ translateX: slideAnim[index] }] }}>
                  <Text style={styles.filterText}>{category}</Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default FilterProducts;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Linking,
  Animated,
  ImageBackground,
} from "react-native";
import Search from "react-native-bootstrap-icons/icons/search";
import ProductCard from "../src/components/ProductCard";
import { firestore, auth } from "../.firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  DocumentData,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { RFValue } from "react-native-responsive-fontsize";
import SocialMediaLinks from "../src/components/SocialMediaLinks";
import useFetchProducts from "../src/components/FetchProducts";
import LoadingScreen from "../src/components/LoadingScreen";
import FilterProducts from "../src/components/FilterProducts";
import useDimensions from '../src/components/useDimensions';
import styles from "../src/stylesheet/indexStyles";

interface Product {
  click: number;
  id: string;
  category: string[];
  description: string;
  hoverImage: string;
  image: string;
  link: string;
  name: string;
  price: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity value of 0
  const translateY = useState(new Animated.Value(20))[0]; // Initial vertical position
  const scaleAnim = useState(new Animated.Value(1))[0]; // Initial scale value of 1
  const [translateYAnim, setTranslateYAnim] = useState(new Animated.Value(0));
  const [filter, setFilter] = useState("All");
  const [hoveredFilter, setHoveredFilter] = useState("");
  const { products, loading, error, setProducts, setLoading, refetchProducts } =
    useFetchProducts();
  const { width } = useDimensions();
  const isLargeScreen = width > 768;

  /**
   * Animates the component's fade-in and translation effects when fadeAnim or translateY changes.
   * @param - none
   * @return {void}
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  /**
   * Handles the press event on a product card.
   * @param {Object} product - The product object that was pressed.
   * @return {void}
   */
  const handleProductPress = async (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    try {
      const productRef = doc(firestore, "products", product.id);
      await updateDoc(productRef, {
        click: increment(1),
      });

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, click: p.click + 1 } : p
        )
      );
    } catch (error) {
      console.log("Error updating product click count:", error);
    }
  };

  /**
   * Changes the product filter category and animates the transition.
   * @param {string} category - The category to filter products by.
   * @return {void}
   */
  const handleFilterChange = (category) => {
    setFilter(category);
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      friction: 3,
      useNativeDriver: false,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }).start();
    });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    });
  };

  /**
   * Filters products based on search query and selected category.
   * @param {Object} product - The product object to filter.
   * @return {boolean} - True if the product matches the search query and category; otherwise, false.
   */
  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      (product.description.toLowerCase().includes(lowerCaseSearchQuery) ||
        product.name.toLowerCase().includes(lowerCaseSearchQuery)) &&
      (filter === "All" || product.category.includes(filter))
    );
  });

  // Loading and error handling
  if (loading) {
    return <LoadingScreen onFinish={undefined} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <SocialMediaLinks styles={styles} />
      <View style={styles.searchContainer}>
        <Pressable
          onPress={() => {
            refetchProducts();
            handleFilterChange("All");
          }}
        >
          <Image source={require("../assets/UHS2.png")} style={styles.logo} />
        </Pressable>
        <TextInput
          placeholder="Search HEX"
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Search size={20} color="#888" style={styles.searchIcon} />
      </View>

      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <FilterProducts
          filter={filter}
          handleFilterChange={handleFilterChange}
          hoveredFilter={hoveredFilter}
          setHoveredFilter={setHoveredFilter}
        />

        <Animated.View
          style={[
            styles.scrollViewContainer,
            { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          <ImageBackground
            source={require("../assets/indexBackground.png")}
            style={styles.backgroundImage}
            imageStyle={styles.imageOpacity}
            resizeMode="repeat"
          >
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.scrollViewContent}
            >
              <Text
                style={[
                  styles.tagline,
                  {
                    marginTop: 20,
                    color: "#006400",
                    fontWeight: 700,
                    fontSize: isLargeScreen ? RFValue(25) : RFValue(35),
                    borderWidth: 3,
                    borderColor: "#013220",
                    borderRadius: 5,
                    padding: 20,
                    backgroundColor: 'rgba(245, 245, 220, 0.5)',
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                  },
                ]}
              >
                Empowering Students, One Product at a Time
              </Text>
              <Text style={[styles.tagline, { fontSize: isLargeScreen ? RFValue(15) : RFValue(20) }]}>
                Transform the Digital Space with Haumāna Projects and Brands
              </Text>
              <View style={styles.productList}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => handleProductPress(product)}
                  />
                ))}
              </View>
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>
                  Disclaimer: The products and services listed on Haumāna
                  Exchange are offered by other businesses. Haumāna Exchange
                  does not endorse or guarantee any of the products or services
                  provided. Users are encouraged to perform their own due
                  diligence before making any purchases or entering into any
                  agreements. Although the registered organization has members
                  who are university students, the registered organization is
                  independent of the university and does not represent the views
                  of the university. The registered organization is responsible
                  for its own contracts, acts, or omissions.
                </Text>
                <Text style={styles.disclaimerText}>
                  © 2024 haumanaexchange.org
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </Animated.View>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {selectedProduct && (
              <View style={styles.modalContent}>
                <View style={styles.modalLeftContent}>
                  <Image
                    source={selectedProduct.hoverImage}
                    style={styles.modalImage}
                  />
                  <View style={styles.modalButtonContainer}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => Linking.openURL(selectedProduct.link)}
                    >
                      <Text style={styles.modalButtonText}>View More</Text>
                    </Pressable>
                    <Pressable
                      style={styles.modalCloseButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalCloseButtonText}>Close</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.modalTextContainer}>
                  <Text
                    style={[styles.modalName,
                    {fontSize: isLargeScreen ? RFValue(14) : RFValue(15)}]}
                  >
                    {selectedProduct.name}
                  </Text>
                  <Text
                    style={[styles.modalPrice,
                    {fontSize: isLargeScreen ? RFValue(12) : RFValue(14)}]}
                  >
                    {selectedProduct.price}
                  </Text>
                  <Text
                    style={[styles.modalDescription,
                    {fontSize: isLargeScreen ? RFValue(9) : RFValue(11)}]}
                  >
                    {selectedProduct.description}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </Animated.View>
    </>
  );
}

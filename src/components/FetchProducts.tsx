import { useState, useEffect, useCallback } from "react";
import { firestore } from "../../.firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a TypeScript interface for the product data
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

/**
 * Custom hook that fetches products from Firestore and manages their state.
 * It handles loading states, error states, and caching of products in local storage.
 *
 * @return {Object} An object containing products and their associated states:
 * @return {Product[]} products - The list of fetched products.
 * @return {boolean} loading - Indicates whether the products are currently being loaded.
 * @return {string | null} error - Any error message encountered during fetching, or null if no error.
 * @return {Function} setProducts - Function to manually set the products state.
 * @return {Function} setLoading - Function to manually set the loading state.
 * @return {Function} refetchProducts - Function to re-fetch products from Firestore.
 */
const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refetches products from Firestore, updates the product state,
   * and caches the fetched products in local storage.
   * Initiates loading state while fetching and handles any errors encountered.
   * @return {Promise<void>}
   */
  const refetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch products from Firestore
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productsList = querySnapshot.docs.map((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        } as Product;

        return data;
      });

      // Preload images
      const imageLoadPromises = productsList.map(async (product) => {
        if (product.image) {
          await Image.prefetch(product.image); // Preload main image
        }
        if (product.hoverImage) {
          await Image.prefetch(product.hoverImage); // Preload hover image
        }
      });

      // Wait for all images to load
      await Promise.all(imageLoadPromises);

      // Cache the fetched products in local storage
      await AsyncStorage.setItem("products", JSON.stringify(productsList));
      setProducts(productsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after images are loaded
    }
  }, []);

  /**
   * Fetches products, checking for cached products in local storage.
   * If cached products are available, they are set to the state.
   * Otherwise, it initiates a refetch of products from Firestore.
   * @return {Promise<void>}
   */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Check if products are cached in local storage
        const cachedProducts = await AsyncStorage.getItem("products");
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts)); // Use cached products
        }

        // Initial fetch
        await refetchProducts();
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [refetchProducts]);

  return { products, loading, error, setProducts, setLoading, refetchProducts };
};

export default useFetchProducts;

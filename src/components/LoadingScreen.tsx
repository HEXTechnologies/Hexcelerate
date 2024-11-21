import React, { useEffect, useRef, useState } from "react";
import styles from "../stylesheet/LoadingScreenStyles";
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";

const LoadingScreen = ({ onFinish }) => {
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dotCount, setDotCount] = useState(1);
  const [loadingMessage, setLoadingMessage] = useState(
    "Please wait while we set up your experience"
  );
  const confettiRef = useRef(null);
  const { width } = Dimensions.get("window");
  const originX = width / 2;
  const originY = 0;

  /**
   * Effect that handles the display of a message with a fade-in animation.
   * After a delay of 1 second, it shows the message and animates it.
   * Once the animation completes, it triggers the onFinish callback after an additional delay.
   * @return {void}
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(onFinish, 2000);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  /**
   * Effect that manages the animation of dots and cycling through loading messages.
   * When the showMessage state is true, it starts intervals for both dot animation and loading message updates.
   * @return {void}
   */
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (showMessage) {
      interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 1));
      }, 300);

      const messageInterval = setInterval(() => {
        setLoadingMessage((prevMessage) => {
          if (prevMessage === "Please wait while we set up your experience") {
            return "Chasing the chicken that crossed the road";
          } else if (
            prevMessage === "Chasing the chicken that crossed the road"
          ) {
            return "Practicing my dance moves with Raygun";
          } else if (prevMessage === "Practicing my dance moves with Raygun") {
            return "Debating whether a hotdog is a sandwich";
          } else if (
            prevMessage === "Debating whether a hotdog is a sandwich"
          ) {
            return "I want it that way, tell me why";
          } else if (prevMessage === "I want it that way, tell me why") {
            return "Today I don't feel like doing";
          } else if (prevMessage === "Today I don't feel like doing") {
            return "Just a small-town girl, living in a lonely world, she took the midnight train";
          } else if (
            prevMessage ===
            "Just a small-town girl, living in a lonely world, she took the midnight train"
          ) {
            return "If you liked it then you should have put a";
          } else if (
            prevMessage === "If you liked it then you should have put a"
          ) {
            return "Hello from the other side, I must have called a thousand";
          } else if (
            prevMessage ===
            "Hello from the other side, I must have called a thousand"
          ) {
            return "Mamma mia, here I go again, my my, how can I";
          } else if (
            prevMessage === "Mamma mia, here I go again, my my, how can I"
          ) {
            return "You are not alone, I am here with";
          } else if (prevMessage === "You are not alone, I am here with") {
            return "Cause you were Romeo, you were throwing pebbles, and my daddy said";
          } else {
            return "Please wait while we set up your experience";
          }
        });
      }, 5000);

      return () => {
        clearInterval(interval);
        clearInterval(messageInterval);
      };
    }
  }, [showMessage]);

  return (
    <ImageBackground
      source={require("../../assets/LoadScreen2.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageOpacity}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.titleText}>HEX</Text>
        <Text style={styles.titleHeader}> Marketplace</Text>
        <Text style={styles.subtitleText}>University of Hawaiʻi at Mānoa</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/UHS2.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.hawaiianText}>
          E kūkulu ana i ke ala o nā ʻāina e hoʻokumu ʻia e nā haumāna
        </Text>
        {!showMessage ? (
          <ActivityIndicator size="large" color="#006400" />
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.messageText}>
              {loadingMessage}
              {".".repeat(dotCount)}
            </Text>
          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;

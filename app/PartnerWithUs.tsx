import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  Linking,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swal from "sweetalert2";
import Globe from "react-native-bootstrap-icons/icons/globe";
import Linkedin from "react-native-bootstrap-icons/icons/linkedin";
import Instagram from "react-native-bootstrap-icons/icons/instagram";
import Envelope from "react-native-bootstrap-icons/icons/envelope";
import styles from "../src/stylesheet/PartnerWithUsStyles";

const partners = [
  {
    name: "Antigo Mode",
    image: require("../assets/partners/antigoLogo.png"),
    website: "https://antigomode.com/",
    linkedin: "https://linkedin.com/in/geraldine-joy-javier-a25886296",
    instagram: "https://www.instagram.com/antigomode/",
    email: null,
  },
  {
    name: "JewelrybyKnL",
    image: require("../assets/partners/jewelryByKnL.png"),
    website: "https://www.etsy.com/ca/shop/JewelrybyKnL",
    linkedin: null,
    instagram: "https://www.instagram.com/jewelryby.knl/",
    email: "mailto:Jewelrybyknl@gmail.com",
  },
  {
    name: "Jhayz Creations",
    image: require("../assets/partners/jhayzcreations.png"),
    website: null,
    linkedin: null,
    instagram: "https://www.instagram.com/jhayzcreations/",
    email: "mailto:jhayzcreations@gmail.com",
  },
  {
    name: "8Bit UHM",
    image: require("../assets/partners/8bit.png"),
    website: "https://www.8bituhm.org/",
    linkedin: "https://www.linkedin.com/company/8bit-uhm/",
    instagram: "https://www.instagram.com/8bituhm/",
    email: "mailto:8bituhmanoa@gmail.com",
  },
  {
    name: "SHARAI Swimwear",
    image: require("../assets/partners/Sharaiswim.png"),
    website: "https://sharaiswim.com/",
    linkedin: "https://www.linkedin.com/in/alexandria-buchanan/",
    instagram: "https://www.instagram.com/sharaiswim/",
    email: "mailto:support@sharaiswim.com",
  },
  {
    name: "illicitlover",
    image: require("../assets/partners/illicitlover1.png"),
    website: "https://www.illicitloverjp.com/",
    linkedin: "https://www.linkedin.com/in/daniella-pasion/",
    instagram: "https://www.instagram.com/illicitlover.jp/",
    email: null,
  },
  {
    name: "SurfersConnect.net",
    image: require("../assets/partners/surfers.png"),
    website: "https://surfersconnect.net",
    linkedin: "https://www.linkedin.com/in/steve-harper-669aa4240",
    instagram: null,
    email: "mailto:steve@surfersconnect.net",
  },
  {
    name: "Hawaii Entrepreneurs",
    image: require("../assets/partners/hawaiientrepreneurs.png"),
    website: "https://www.hawaiientrepreneurs.com/",
    linkedin: null,
    instagram: "https://www.instagram.com/hawaiientrepreneurs/",
    email: null,
  },
  {
    name: "Hawaiiverse",
    image: require("../assets/partners/hawaiiverse.png"),
    website:
      "https://hawaiiverse.com/?srsltid=AfmBOorIzVxvmmuZclh2sH7uL7_IKGNi6wHg1DZoDxPaoZwnd07Uk7OR",
    linkedin:
      "https://www.linkedin.com/company/hawaiiverse/posts/?feedView=all",
    instagram: "https://www.instagram.com/hawaiiverse/",
    email: "https://airtable.com/app7uNAZkiA8uWX4L/shrjhuvPj9mvXCnjk",
  },
  {
    name: "Hawai'i Student Entrepreneurs",
    image: require("../assets/partners/hse.png"),
    website: "https://hsentrepreneurs.org/",
    linkedin:
      "https://www.linkedin.com/company/hawai'i-student-entrepreneurs/posts/?feedView=all",
    instagram: "https://www.instagram.com/hsentrepreneurs/",
    email: "mailto:hawaiistudententrepreneurs@gmail.com",
  },
  // Add more partners as needed
];

export default function Partnership() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial opacity value of 0
  const translateY = React.useRef(new Animated.Value(20)).current; // Initial vertical position

  /**
   * Animates the component's fade-in and translation effects.
   * @param - none
   * @return {void}
   */
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 2,
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
   * Handles the press event on a link.
   * Opens the URL if it is valid; otherwise, shows an error message.
   * @param {string} url - The URL to be opened.
   * @return {void}
   */
  const handleLinkPress = async (url: string): Promise<void> => {
    if (!url) {
      // Handle case where URL is null or undefined
      Swal.fire(
        "Error",
        "Apologies! Haumana Exchange does not have access to this page.",
        "error"
      );
      return;
    }
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Swal.fire("Error", "Link Not Supported", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      <Image
        source={require("../assets/UHS4.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Pressable
          onPress={() => navigation.navigate("index")}
          style={styles.logoContainer}
        >
          <Image
            source={require("../assets/UHS2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>Join Our Network!</Text>
          <Text style={styles.text}>
            <strong>
              Are you looking to showcase your products or services to UHM
              students?
            </strong>{" "}
            Reach out to us through our social media platforms—Instagram,
            Discord, or LinkedIn—or send an email to any of our team members
            listed on the About Us page.
          </Text>
          <Text style={styles.text}>
            <strong>We believe in the power of collaboration.</strong> By
            forging strategic partnerships, we broaden our reach, enhance our
            services, and empower our community with top-notch resources and
            opportunities. Our partners are integral to our mission, and we are
            honored to collaborate with industry leaders, innovative startups,
            and educational institutions.
          </Text>
          <Text style={styles.text}>
            <strong>Join us in making a difference.</strong> Connect with us
            today and discover how we can work together to support and elevate
            student entrepreneurship.
          </Text>
          <View style={styles.profileSection}>
            <Text style={styles.profileHeader}>
              Meet Our Partners and Clients
            </Text>
            <View style={styles.profileContainer}>
              {partners.map((partner, index) => (
                <View key={index} style={styles.profileCard}>
                  <Image source={partner.image} style={styles.profileImage} />
                  <Text style={styles.profileName}>{partner.name}</Text>
                  <View style={styles.socialContainer}>
                    <Pressable onPress={() => handleLinkPress(partner.website)}>
                      <Globe size={18} color="black" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleLinkPress(partner.linkedin)}
                    >
                      <Linkedin size={18} color="black" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleLinkPress(partner.instagram)}
                    >
                      <Instagram size={18} color="black" />
                    </Pressable>
                    <Pressable onPress={() => handleLinkPress(partner.email)}>
                      <Envelope size={18} color="black" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              Disclaimer: The products and services listed on Haumāna Exchange
              are offered by other businesses. Haumāna Exchange does not endorse
              or guarantee any of the products or services provided. Users are
              encouraged to perform their own due diligence before making any
              purchases or entering into any agreements. Although the registered
              organization has members who are university students, the
              registered organization is independent of the university and does
              not represent the views of the university. The registered
              organization is responsible for its own contracts, acts, or
              omissions.
            </Text>
            <Text style={styles.disclaimerText}>
              <strong>© 2024 haumanaexchange.org</strong>
            </Text>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
}

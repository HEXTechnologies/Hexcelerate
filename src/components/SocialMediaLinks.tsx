import React, { useEffect, useRef } from "react";
import { View, Pressable, Linking, Animated, Easing } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

// Import specific Bootstrap icons
import InfoCircle from "react-native-bootstrap-icons/icons/info-circle";
import People from "react-native-bootstrap-icons/icons/people";
import Discord from "react-native-bootstrap-icons/icons/discord";
import Instagram from "react-native-bootstrap-icons/icons/instagram";
import Linkedin from "react-native-bootstrap-icons/icons/linkedin";
import Book from "react-native-bootstrap-icons/icons/book";

const SocialMediaLinks = ({ styles }) => {
    const navigation = useNavigation();
    const slideAnim = useRef(Array(5).fill(0).map(() => new Animated.Value(0))).current;

    useEffect(() => {
        slideAnim.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                delay: index * 100,
                easing: Easing.out(Easing.ease),
            }).start();
        });
    }, [slideAnim]);

    return (
        <View style={styles.header}>
            <View style={styles.headerOptions}>
                {/* Hyperlink to Blog Page */}
                <Pressable onPress={() => navigation.navigate("blog")}>
                    <Animated.View style={{ transform: [{ translateY: slideAnim[0].interpolate({
                      inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                      <Book width={18} height={18} fill='rgba(245, 245, 220, 1)' />
                    </Animated.View>
                </Pressable>
                {/*Hyperlink to About Us Page*/}
                <Pressable onPress={() => navigation.navigate("AboutUs")}>
                    <Animated.View style={{ transform: [{ translateY: slideAnim[0].interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                        <InfoCircle width={18} height={18} fill='rgba(245, 245, 220, 1)' />
                    </Animated.View>
                </Pressable>
                {/* Hyperlink to Partner Page */}
                <Pressable onPress={() => navigation.navigate("PartnerWithUs")}>
                    <Animated.View style={{ transform: [{ translateY: slideAnim[1].interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                        <People width={18} height={18} fill='rgba(245, 245, 220, 1)' />
                    </Animated.View>
                </Pressable>
                {/* Hyperlink to Discord */}
                <Pressable
                    onPress={() => Linking.openURL("https://discord.gg/azmwpvq5kp")}
                    style={styles.link}
                >
                    <Animated.View style={{ transform: [{ translateY: slideAnim[2].interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                        <Discord width={18} height={18} fill='rgba(245, 245, 220, 1)' />
                    </Animated.View>
                </Pressable>
                {/* Hyperlink to Instagram */}
                <Pressable
                    onPress={() => Linking.openURL("https://www.instagram.com/haumanaexchange/")}
                    style={styles.link}
                >
                    <Animated.View style={{ transform: [{ translateY: slideAnim[3].interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                        <Instagram width={18} height={18} fill="white" />
                    </Animated.View>
                </Pressable>
                {/* Hyperlink to LinkedIn */}
                <Pressable
                    onPress={() => Linking.openURL("https://linkedin.com/company/haumanaexchange")}
                    style={styles.link}
                >
                    <Animated.View style={{ transform: [{ translateY: slideAnim[4].interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
                        <Linkedin width={18} height={18} fill='rgba(245, 245, 220, 1)' />
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
};

export default SocialMediaLinks;

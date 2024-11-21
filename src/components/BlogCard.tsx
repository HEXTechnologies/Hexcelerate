import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import styles from "../stylesheet/BlogCardStyles"; // Import a stylesheet for BlogCard

// Define the props type for BlogCard
interface BlogCardProps {
    blog: {
        id: string;
        title: string;
        author: string;
        content: string;
    };
    onPress: (blog: BlogCardProps["blog"]) => void;
}

const BlogCard: React.FC<BlogCardProps> = React.memo(
    ({ blog, onPress }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isTouched, setIsTouched] = useState(false);
        const scaleValue = useState(new Animated.Value(1))[0];
        const opacityValue = useState(new Animated.Value(1))[0];

        /**
         * Handles the mouse enter event, setting the hovered state to true
         * and initiating a parallel animation for scaling and opacity.
         * @return {void}
         */
        const handleMouseEnter = () => {
            setIsHovered(true);
            Animated.parallel([
                Animated.spring(scaleValue, {
                    toValue: 1.1, // Slightly larger scale for hover effect
                    friction: 3,
                    tension: 50,
                    useNativeDriver: false,
                }).start(),
                Animated.timing(opacityValue, {
                    toValue: 0.9,
                    duration: 200,
                    useNativeDriver: false,
                }).start(),
            ]);
        };

        /**
         * Handles the touch in event for smooth touch interactions.
         * @return {void}
         */
        const handleTouchIn = () => {
            setIsTouched(true);
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 0.95, // Slight scale for touch interaction
                    duration: 100,
                    useNativeDriver: false,
                }).start(),
                Animated.timing(opacityValue, {
                    toValue: 0.7,
                    duration: 150,
                    useNativeDriver: false,
                }).start(),
            ]);
        };

        /**
         * Handles the mouse leave event, resetting the hover state.
         * @return {void}
         */
        const handleMouseLeave = () => {
            setIsHovered(false);
            Animated.parallel([
                Animated.spring(scaleValue, {
                    toValue: 1, // Reset to original size
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
         * Handles the touch out event, resetting the touch state.
         * @return {void}
         */
        const handleTouchOut = () => {
            setIsTouched(false);
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                }).start(),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                }).start(),
            ]);
        };

        return (
            <Pressable
                style={styles.card}
            >
                <Animated.View>
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.author}>By {blog.author}</Text>
                    <Text style={styles.content}>
                        {blog.content.length > 100
                            ? blog.content.substring(0, 100) + "..."
                            : blog.content}
                    </Text>
                </Animated.View>
            </Pressable>
        );
    }
);

export default BlogCard;

import React from "react";
import BlogCard from "../src/components/BlogCard";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from "react-native";
import styles from "../src/stylesheet/BlogStyles"; // Import a stylesheet for Blog
import Blog from "@/app/blog";

const BlogPage = () => {
    // Sample data for blog posts
    const blogPosts = [
        {
            id: "1",
            title: "Understanding React Native",
            author: "John Doe",
            content: "Learn the fundamentals of React Native and how to build mobile apps...",
        },
        {
            id: "2",
            title: "Tips for Optimizing Your React App",
            author: "Jane Smith",
            content: "Here are some essential tips to make your React app more efficient...",
        },
        {
            id: "3",
            title: "Exploring React Navigation",
            author: "Chris Evans",
            content: "Navigation in React Native can be tricky, but with React Navigation...",
        },
        {
            id: "4",
            title: "Understanding React Native",
            author: "John Doe",
            content: "Learn the fundamentals of React Native and how to build mobile apps...",
        },
        {
            id: "5",
            title: "Tips for Optimizing Your React App",
            author: "Jane Smith",
            content: "Here are some essential tips to make your React app more efficient...",
        },
        {
            id: "6",
            title: "Exploring React Navigation",
            author: "Chris Evans",
            content: "Navigation in React Native can be tricky, but with React Navigation...",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Haumana Exchange Blog Page</Text>
            <View style={styles.blogList}>
                {blogPosts.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default BlogPage;

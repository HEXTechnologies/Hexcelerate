import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    blogList: {
        flexDirection: "row",
        flexWrap: "wrap", // Allow wrapping to the next line
        justifyContent: "space-between", // Distribute space evenly
        paddingHorizontal: 150, // Optional padding for horizontal edges
    },
    blogTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    blogAuthor: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },
    blogContent: {
        fontSize: 16,
        color: "#333",
    },
});

export default styles;
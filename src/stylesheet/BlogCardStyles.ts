import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '30%',
    height: 300,
    marginBottom: 20,
    padding: 15, // Add padding inside the card for better spacing
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: 'gray',
    cursor: "pointer",
    justifyContent: 'space-between', // Ensure content is spaced vertically
    backgroundColor: '#fff', // Optional: Add a background color for contrast
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 8, // Add a bit more space between title and author
    textAlign: 'center', // Center title
  },
  author: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10, // Adjust margin for better spacing
    textAlign: 'center', // Center author
  },
  content: {
    fontSize: 14,
    color: "#333",
    textAlign: 'justify', // Align content better
    marginBottom: 10, // Space the content from the next element
  },
});

export default styles;

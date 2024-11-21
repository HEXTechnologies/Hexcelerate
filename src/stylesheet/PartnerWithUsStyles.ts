import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9, // Reduced opacity for a softer background
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly less opaque overlay for better readability
    padding: 20,
  },
  logoContainer: {
    alignSelf: "center",
    marginBottom: 15, // Increased for more space
    paddingVertical: 8, // Vertical padding for breathing space
    paddingHorizontal: 10, // Horizontal padding to make it wider
    borderRadius: 10, // Rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
    backgroundColor: "#f8f8f8", // Light background color
  },
  logo: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#006400",
    borderWidth: 3,
    borderColor: "#333",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 20,
    marginHorizontal: 20,
    color: "#555",
    lineHeight: 24,
  },
  profileSection: {
    marginTop: 20,
  },
  profileHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#006400",
    borderBottomWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  profileCard: {
    width: 225, // Fixed width
    height: 300, // Fixed height
    marginBottom: 20, // Space between rows
    marginHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  profileImage: {
    width: "100%", // Use percentage width to be responsive
    height: "80%", // Responsive height to maintain aspect ratio
    borderRadius: 10,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  disclaimerText: {
    fontWeight: "300",
    fontSize: 10,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
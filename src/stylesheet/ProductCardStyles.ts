import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(245, 245, 220, 0.5)',
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    cursor: "pointer",
  },
  imageContainer: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 170,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#013220",
  },
  price: {
    color: "#013220",
    marginTop: 2,
    textAlign: "center",
  },
  click: {
    color: "#006400",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default styles;
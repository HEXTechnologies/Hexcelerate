import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  hamburgerButton: {
    marginTop: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#e0e0d1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    marginTop: -10,
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  filterButton: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  filterText: {
    fontSize: 12,
    color: "#333",
  },
  filterTextHovered: {
    color: "#006400",
    borderBottomWidth: 2,
  },
  filterButtonActive: {
    borderBottomWidth: 2,
    borderColor: "#006400",
  },
});

export default styles;
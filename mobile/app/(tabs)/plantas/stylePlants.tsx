import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C9F60",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0,  // sem sombra

  },

  horizontal: {
    position: "absolute",
    width: 30,
    height: 6,
    backgroundColor: "#5C9F60",
    borderRadius: 3,
  },

  vertical: {
    position: "absolute",
    width: 6,
    height: 30,
    backgroundColor: "#5C9F60",
    borderRadius: 3,
  },

  /* FILTROS */
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#5C9F60",
    left: -8,
  },

  activeFilter: {
    backgroundColor: "#5C9F60",
  },

  filterText: {
    color: "#5C9F60",
    fontFamily: "Poppins-Medium",
    alignContent: "center",
    fontSize: 12,
  },

  activeFilterText: {
    color: "#fff",
  },

  filterContent: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},

});

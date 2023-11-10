import { StyleSheet } from "react-native";

const CreateCategoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  searchTltInput: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 10,
    padding: 5,
    marginTop: 7,
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
  },

  searchIcon: {
    position: "absolute",
    top: 10,
    left: 8,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: -37,
  },
  horizontal: {
    flexDirection: "row",
    marginBottom: 25,
  },
  row: {
    height: 40,
    padding: 6,
    paddingHorizontal: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "##7C7C7C",
    borderRadius: 8,
  },
  btnWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  addBtn: {
    backgroundColor: "#5DB075",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 120,
    height: 60,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateCategoryStyle;

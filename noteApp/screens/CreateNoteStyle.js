import { StyleSheet } from "react-native";

const CreateNoteStyle = StyleSheet.create({
  createContainers: {
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
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    paddingBottom: 20,
  },
  categoryText: {
    fontSize: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#F6F6F6",
    height: 380,
    textAlignVertical: "top",
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

export default CreateNoteStyle;

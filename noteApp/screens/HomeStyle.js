import { StyleSheet } from 'react-native';

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
      },
      searchInput: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 20,
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
        height: 50,
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
      addCategoryBtn: {
        position: "relative",
        right: 10,
        top: 5,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9B9B9B",
        borderRadius: 50,
        width: 30,
        height: 30,
      },
      addCategoryBtnText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
      },
      noteList: {
        marginBottom: 10,
      },
      emptyListText: {
        fontSize: 50,
        justifyContent: "center",
        alignItems: "center"
      },

      addButton: {
        position: "absolute",
        right: 15,
        bottom: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1F2937",
        borderRadius: 50,
        width: 60,
        height: 60,
      },
      addButtonText: {
        color: "white",
        fontSize: 30,
      },
      
});

export default HomeStyle; 

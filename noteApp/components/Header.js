import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Header = ({ title }) => {
  const navigation = useNavigation();
  const noteAppText = "NOTE APP .";
  const textColors = [
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#900C3F",
    "#C70039",
    "#FF5733",
    "#900C3F",
    "#900C3F",
    "#000",
  ];

  const currentRouteName =
    navigation.getState().routes[navigation.getState().index].name;

  return (
    <View style={styles.header}>
      {currentRouteName !== "Home" && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={28} color="#071e3d" />
        </TouchableOpacity>
      )}
      <View style={styles.headerTextContainer}>
        {noteAppText.split("").map((letter, index) => (
          <Text
            key={index}
            style={[styles.headerText, { color: textColors[index] }]}
          >
            {letter}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: StatusBar.currentHeight + 25,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Header;

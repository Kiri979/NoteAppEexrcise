import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colorList } from "../util/Color";

const NoteList = ({ renderItem, renderDeleteButton, colorIndex, onEdit }) => {
  const selectedColor = colorList[colorIndex % colorList.length];

  const handleEdit = () => {
    onEdit(renderItem);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        <View style={[styles.item, { backgroundColor: selectedColor }]}>
          <View style={styles.dateTime}>
            <Text style={styles.date}>{renderItem.date}</Text>
            <Text style={styles.time}>{renderItem.time}</Text>
          </View>
          <Text style={styles.titleContent}>{renderItem.title}</Text>
          <Text style={styles.paraTxt}>{renderItem.content}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={renderDeleteButton}>
              <AntDesign
                style={styles.deleteButton}
                name="delete"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit()}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  column: {
    width: Dimensions.get("window").width / 2 - 20,
  },
  item: {
    borderColor: "#fee330",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: 150,
  },
  dateTime: {
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#3d5af1",
  },
  time: {
    fontSize: 10,
    color: "#eac100",
    fontWeight: "bold",
  },
  titleContent: {
    fontSize: 16,
    color: "#492540",
    fontWeight: "bold",
    fontStyle: "italic",
    paddingBottom: 8,
  },
  paraTxt: {
    fontSize: 14,
    color: "#6e3b3b",
  },
  icons: {
    flexDirection: "row",
    paddingTop: 10,
  },
  deleteButton: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    paddingRight: 10,
  },
});

export default NoteList;

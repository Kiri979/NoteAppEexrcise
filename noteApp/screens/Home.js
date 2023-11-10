import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteList from "../components/NoteList";
import CategoryList from "../components/CategoryList";
import CreateCategoryScreen from "./CreateCategory";
import HomeStyle from "./HomeStyle";

const HomeScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const clearText = () => {
    setText("");
  };

  const [, forceUpdate] = useForceUpdate();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (text) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [text, notes]);

  const [categories, setCategories] = useState([
    "All",
    "Important",
    "Lecture notes",
    "To-do lists",
    "Shopping list",
  ]);

  const { newCategory } = route.params || {};

  const addNewCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setActiveCategory(newCategory);
      AsyncStorage.setItem("categoryTitles", JSON.stringify(updatedCategories));
    }
  };

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory");
  };

  useEffect(() => {
    if (newCategory && !categories.includes(newCategory)) {
      addNewCategory(newCategory);
    }
  }, [newCategory]);

  const [activeCategory, setActiveCategory] = useState("All");

  const deleteNote = async (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
    forceUpdate();
  };

  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  const deleteNoteAlert = (index) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteNote(index),
        },
      ],
      { cancelable: false }
    );
  };

  const editNote = (editedNote) => {
    navigation.navigate("CreateNote", { initialNote: editedNote });
  };

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.searchInput}>
        <TextInput
          style={{ padding: 10, paddingLeft: 20 }}
          placeholder="Search for note"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
          placeholderTextColor="#000"
        />
        <EvilIcons
          style={HomeStyle.searchIcon}
          name="search"
          size={30}
          color="black"
        />
        {text ? (
          <TouchableOpacity onPress={clearText}>
            <AntDesign
              style={HomeStyle.icon}
              name="close"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          navigation={navigation}
          addNewCategory={addNewCategory}
          style={HomeStyle}
        />
      </View>

      <View style={HomeStyle.noteList}>
        <FlatList
          data={text ? filteredNotes : notes}
          renderItem={({ item, index }) => (
            <NoteList
              renderItem={item}
              renderDeleteButton={() => deleteNoteAlert(index)}
              onEdit={editNote}
              colorIndex={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeStyle.noteList}
          ListEmptyComponent={() => (
            <View style={HomeStyle.emptyListText}>
              <AntDesign name="frowno" size={24} color="black" />
              <Text>No notes found</Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={HomeStyle.addButton}
        onPress={() => {
          navigation.navigate("CreateNote");
          // console.log("CreateNote");
        }}
      >
        <AntDesign
          style={HomeStyle.addButtonText}
          name="plus"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

function useForceUpdate() {
  const [, setValue] = useState(0);
  return [() => setValue((value) => ++value), {}];
}

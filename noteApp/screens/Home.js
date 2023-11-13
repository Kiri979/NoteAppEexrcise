import React, { useState, useEffect } from "react";
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
import HomeStyle from "./HomeStyle";

const HomeScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const clearText = () => {
    setText("");
  };
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };

    const focusListener = navigation.addListener("focus", () => {
      loadNotes();
    });

    return () => {
      focusListener.remove();
    };
  }, [navigation]);

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

  useEffect(() => {
    if (newCategory && !categories.includes(newCategory)) {
      addNewCategory(newCategory);
    }
  }, [newCategory]);

  useEffect(() => {
    if (route.params && route.params.editedNote) {
      handleNoteEdit(route.params.editedNote);
    }
  }, [route.params]);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      loadCategories();
      loadNotes();
    });

    return () => {
      focusListener.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (newCategory) {
      addNewCategory(newCategory);
    }
  }, [newCategory]);

  const [categories, setCategories] = useState([
    "All",
    "Important",
    "Lecture notes",
    "To-do lists",
    "Shopping list",
  ]);

  
  const { newCategory } = route.params || {};

  const addNewCategory = async (newCategory) => {
    try {
      if (!categories.includes(newCategory)) {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        setActiveCategory(newCategory);
        await AsyncStorage.setItem(
          "categoryTitles",
          JSON.stringify(updatedCategories)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotes = async () => {
    const storedCategories = await AsyncStorage.getItem("categoryTitles");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    const storedNotes = await AsyncStorage.getItem(activeCategory);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  const loadCategories = async () => {
    const storedCategories = await AsyncStorage.getItem("categoryTitles");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  };

  const addNewNote = async (newNote) => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const existingNotes = storedNotes ? JSON.parse(storedNotes) : [];
      const newNotes = [...existingNotes, newNote];
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
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

  const handleEdit = (note, index) => {
    navigation.navigate("CreateNote", { initialNote: note, noteIndex: index });
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
              onEdit={() => handleEdit(item, index)}
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

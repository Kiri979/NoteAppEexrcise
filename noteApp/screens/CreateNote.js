import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateNoteStyle from "./CreateNoteStyle";
import CategoryList from "../components/CategoryList";

const CreateNoteScreen = ({ navigation, route }) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (route.params && route.params.initialNote) {
      setNote({
        title: route.params.initialNote.title,
        content: route.params.initialNote.content,
      });
    }
  }, [route.params]);

  const saveNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const existingNotes = storedNotes ? JSON.parse(storedNotes) : [];

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      const newNote = {
        title: note.title,
        content: note.content,
        date: formattedDate,
        time: formattedTime,
      };

      if (route.params && route.params.noteIndex !== undefined) {
        existingNotes[route.params.noteIndex] = newNote;
      } else {
        existingNotes.push(newNote);
      }
      await AsyncStorage.setItem("notes", JSON.stringify(existingNotes));
      setNotes(existingNotes);
      setNote({ title: "", content: "" });
      navigation.navigate("Home", { newNote: newNote });
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const [categories, setCategories] = useState([
    "All",
    "Important",
    "Lecture notes",
    "To-do lists",
    "Shopping list",
  ]);

  const [activeCategory, setActiveCategory] = useState("All");

  const [newCategory, setNewCategory] = useState("");

  const addNewCategoryFromNoteScreen = () => {
    if (newCategory.trim() !== "") {
      addNewCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <View style={CreateNoteStyle.createContainers}>
      <Text>Title</Text>
      <View style={CreateNoteStyle.searchTltInput}>
        <TextInput
          style={{ padding: 10, paddingLeft: 20 }}
          placeholder="Enter Title"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
          placeholderTextColor="#BDBDBD"
        />
      </View>

      <Text>Category</Text>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={CreateNoteStyle.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={CreateNoteStyle.category}
            >
              <RadioButton
                value={category}
                status={activeCategory === category ? "checked" : "unchecked"}
                color="#5DB075"
                onPress={() => setActiveCategory(category)}
              />
              <Text style={CreateNoteStyle.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text>Detail</Text>
      <View>
        <TextInput
          style={CreateNoteStyle.contentInput}
          multiline={true}
          numberOfLines={4}
          value={note.content}
          onChangeText={(text) => setNote({ ...note, content: text })}
          placeholderTextColor="#BDBDBD"
        />
      </View>

      <View style={CreateNoteStyle.btnWrap}>
        <TouchableOpacity style={CreateNoteStyle.addBtn} onPress={saveNote}>
          <Text style={CreateNoteStyle.addBtnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNoteScreen;

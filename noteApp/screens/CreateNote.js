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

  const [categories, setCategories] = useState([
    "All",
    "Important",
    "Lecture notes",
    "To-do lists",
    "Shopping list",
  ]);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (route.params && route.params.initialNote) {
      const { title, content, category } = route.params.initialNote;
      setNote({
        title: title || "",
        content: content || "",
        category: category || "All",
      });
      setActiveCategory(category || "All");
    }
  }, [route.params]);

  const saveNote = async () => {
    const newNotes = [...notes, note];
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
    setNote({ title: "", content: "" });
  };

  const addNewCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setActiveCategory(newCategory);
      AsyncStorage.setItem("categoryTitles", JSON.stringify(updatedCategories));
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

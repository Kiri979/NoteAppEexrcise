import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import CreateCategoryStyle from "./CreateCategoryStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CreateCategoryScreen = ({ navigation }) => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const saveCategoryItem = async () => {
    if (categoryTitle.trim() !== "") {
      const storedCategories = await AsyncStorage.getItem("categoryTitles");
      const categories = storedCategories ? JSON.parse(storedCategories) : [];  
      categories.push(categoryTitle);
      await AsyncStorage.setItem("categoryTitles", JSON.stringify(categories));
      navigation.navigate("Home", { newCategory: categoryTitle });
    }
  };
  
  return (
    <View style={CreateCategoryStyle.container}>
      <Text>Title</Text>
      <View style={CreateCategoryStyle.searchTltInput}>
        <TextInput
          style={{ padding: 10, paddingLeft: 20 }}
          placeholder="Enter Title"
          value={categoryTitle}
          onChangeText={(text) => setCategoryTitle(text)}
          placeholderTextColor="#BDBDBD"
        />
      </View>

      <View style={CreateCategoryStyle.btnWrap}>
        <TouchableOpacity
          style={CreateCategoryStyle.addBtn}
          onPress={saveCategoryItem}
          // onPress={() => {
          //   console.log('Input Text Value:', categoryTitle);
          //   saveCategoryItem();
          // }}
        >
          <Text style={CreateCategoryStyle.addBtnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCategoryScreen;

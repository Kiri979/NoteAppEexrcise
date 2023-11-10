import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CategoryList = ({
  categories,
  activeCategory,
  setActiveCategory,
  navigation,
  style,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={style}
    >
      <View style={style.horizontal}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveCategory(category)}
          >
            <View
              style={[
                style.row,
                activeCategory === category && { backgroundColor: "#1F2937" },
              ]}
            >
              <Text
                style={
                  activeCategory === category
                    ? { color: "#fff" }
                    : { color: "#7C7C7C" }
                }
              >
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={style.addCategoryBtn}
          onPress={() => navigation.navigate("CreateCategory")}
        >
          <AntDesign
            style={style.addCategoryBtnText}
            name="plus"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CategoryList;

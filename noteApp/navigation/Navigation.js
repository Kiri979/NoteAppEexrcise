import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import CreateNoteScreen from "../screens/CreateNote";
import CreateCategoryScreen from "../screens/CreateCategory";
import Header from "../components/Header";

const Stack = createStackNavigator();

const NavigationScreen = ({ navigation }) => {
  const screens = [
    { name: "Home", component: HomeScreen },
    { name: "CreateNote", component: CreateNoteScreen },
    { name: "CreateCategory", component: CreateCategoryScreen },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              header: () => <Header title={screen.title} />,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;

import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
// 
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";

const Home = () => {
  const Tabs = createBottomTabNavigator();

  const renderTabBarIcon = (name, size, focused) => {
    const iconColor = focused ? "#394467" : "gray";

    return (
      <View style={styles.tabBarButton}>
        <Ionicons
          name={name}
          size={size}
          style={[styles.tabIcon, { color: iconColor }]}
        />
      </View>
    );
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 5,
        },
        tabBarLabel: () => null,
      }}
    >
      <Tabs.Screen
        name="Menu"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            renderTabBarIcon("grid-outline", 24, focused),
        }}
      />
      <Tabs.Screen
        name="Add"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={styles.mainButton}>
              <Ionicons name="add-outline" size={24} style={styles.icon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            renderTabBarIcon("person-outline", 24, focused),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    color: "gray",
  },
  mainButton: {
    position: "relative",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#394467",
  },
  icon: {
    position: "absolute",
    left: 24,
    top: 7,
    color: "#fff",
  },
});

export default Home;


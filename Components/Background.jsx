import React from "react";
import { Image, StyleSheet } from "react-native";

const Background = () => {
  return (
    <Image
      source={require("../images/PhotoBG.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Background;

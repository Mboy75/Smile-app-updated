import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const IconCamera = ({ transparent = false, takePhoto }) => {
  return (
    <View style={!transparent ? styles.photoIcon : styles.photoIconTransparent}>
      <TouchableOpacity style={styles.iconCam} onPress={takePhoto}>
        <Ionicons
          name="camera-outline"
          size={24}
          color={transparent ? "#FFFFFF" : "#394467"}
          
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  photoIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 60 }, { translateY: -0.5 * 60 }],
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
  photoIconTransparent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 60 }, { translateY: -0.5 * 60 }],
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  iconCam: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 24 }, { translateY: -0.5 * 24 }],
  },
});

export default IconCamera;

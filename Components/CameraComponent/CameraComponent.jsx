import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconCamera from "../IconCamera/IconCamera";

const CameraComponent = ({ onPhotoTaken }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      onPhotoTaken(uri);
    }
  };

  return (
    <>
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Camera>
      <IconCamera takePhoto={takePhoto} />
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  cameraActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  flipContainer: {
    paddingHorizontal: 12,
  },
  photoIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 60 }, { translateY: -0.5 * 60 }],
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#394467",
  },

  iconCam: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 24 }, { translateY: -0.5 * 24 }],
    
  },
});

export default CameraComponent;

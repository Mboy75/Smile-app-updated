import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
//
import { id } from "../Redux/Selectors/selectors";
import { useAddPostMutation } from "../Redux/Posts/postsApi";
//
import CameraComponent from "../Components/CameraComponent/CameraComponent";
import IconCamera from "../Components/IconCamera/IconCamera";

const CreatePostsScreen = () => {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  const navigation = useNavigation();

  const userId = useSelector(id);

  const [addPost] = useAddPostMutation();

  const handleSubmit = async () => {
    const newPost = {
      postId: userId,
      name,
      address,
      photo: photoUri,
      location,
      comments: [],
    };

    addPost({ userId, newPost });
    navigation.navigate("Menu");

    setPhotoUri(null);
    setAddress("");
    setName("");
  };

  const handlePhotoTaken = async (uri) => {
    await MediaLibrary.createAssetAsync(uri);
    setPhotoUri(uri);
  };

  const deletePhoto = () => {
    if (photoUri) {
      setPhotoUri(null);
      return;
    }
  };

  const choosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.didCancel) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const checkLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const clearAll = () => {
    setPhotoUri(null);
    setAddress("");
    setName("");
  };

  checkLocation();

  const submitButtonCheck = name === "" || address === "" || photoUri === null;

  const clearButtonCheck = name === "" && address === "" && photoUri === null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create a publication</Text>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.photoThumb}>
            <View style={styles.photoPlace}>
              {photoUri ? (
                <>
                  <Image style={styles.camera} source={{ uri: photoUri }} />
                  <IconCamera transparent={true} takePhoto={deletePhoto} />
                </>
              ) : (
                <CameraComponent
                  onPhotoTaken={handlePhotoTaken}
                  photoUri={photoUri}
                />
              )}
            </View>
            <TouchableOpacity onPress={choosePhoto}>
              <Text style={styles.photoText}>Upload a photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Title..."
              placeholderTextColor="#BDBDBD"
              value={name}
              onChangeText={handleNameChange}
              keyboardType="email-address"
            />

            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.locationInput}
                placeholder="Location..."
                placeholderTextColor="#BDBDBD"
                value={address}
                onChangeText={handleAddressChange}
              />
              <Ionicons
                name="location-outline"
                size={24}
                color="#BDBDBD"
                style={styles.locationIcon}
              />
            </View>
            <TouchableOpacity
              style={
                !submitButtonCheck ? styles.submitButton : styles.disabledButton
              }
              onPress={handleSubmit}
              disabled={submitButtonCheck}
            >
              <Text
                style={
                  !submitButtonCheck
                    ? styles.submitButtonText
                    : styles.disabledButtonText
                }
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={clearAll}
            style={
              !clearButtonCheck
                ? styles.trashButton
                : styles.trashButtonDisabled
            }
          >
            <Ionicons
              name="trash-outline"
              size={24}
              color="#DADADA"
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 55,
    paddingBottom: 11,

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  camera: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },

  goBackBtn: {
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  photoThumb: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 32,
  },
  photoPlace: {
    position: "relative",
    width: "100%",
    height: 240,

    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoText: {
    marginTop: 8,

    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  form: {
    display: "flex",
    gap: 22,
  },
  input: {
    width: "100%",
    paddingVertical: 15,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationInput: {
    width: "100%",
    paddingVertical: 15,
    paddingLeft: 26,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    transform: [{ translateY: 0.5 * 24 }],
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 16,

    color: "#FFFFFF",
  },
  submitButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,

    backgroundColor: "#394467",
  },
  disabledButtonText: {
    textAlign: "center",
    fontSize: 16,

    color: "#BDBDBD",
  },
  disabledButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,

    backgroundColor: "#F6F6F6",
  },
  trashButton: {
    flex: 1,
    position: "absolute",
    width: 70,
    height: 40,
    bottom: 34,
    left: "50%",
    transform: [{ translateX: -0.3 * 70 }],

    borderRadius: 100,
    backgroundColor: "#394467",
  },
  trashButtonDisabled: {
    flex: 1,
    position: "absolute",
    width: 70,
    height: 40,
    bottom: 34,
    left: "50%",
    transform: [{ translateX: -0.3 * 70 }],

    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  trashIcon: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: [{ translateY: 0.5 * 24 }, { translateX: -0.5 * 24 }],
  },
});

export default CreatePostsScreen;

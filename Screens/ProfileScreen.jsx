import { useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
//
import { userName, userPhoto, id } from "../Redux/Selectors/selectors";
import { logOut, changePhoto } from "../Redux/Auth/authSlice";
import { updateUser } from "../Redux/operations";
import { useGetUserPostsQuery } from "../Redux/Posts/postsApi";
//
import Background from "../Components/Background";
import ProfileList from "../Components/ProfileList/ProfileList";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const displayName = useSelector(userName);
  const userAvatar = useSelector(userPhoto);
  const userId = useSelector(id);

  const [photoUri, setPhotoUri] = useState(userAvatar ?? null);
  const { data = [] } = useGetUserPostsQuery(userId);

  const onLogOut = () => {
    dispatch(logOut());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const choosePhoto = async () => {
    if (photoUri) {
      dispatch(updateUser({ photoURL: "" }));
      dispatch(changePhoto(""));
      setPhotoUri(null);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.didCancel) {
      setPhotoUri(result.assets[0].uri);
      dispatch(updateUser({ photoURL: result.assets[0].uri }));
      dispatch(changePhoto(result.assets[0].uri));
    }
  };

  return (
    <View style={styles.container}>
      <Background />

      <View style={styles.userContainer}>
        <TouchableOpacity style={styles.logOutBtn} onPress={onLogOut}>
          <Ionicons name="log-out-outline" size={24} />
        </TouchableOpacity>
        <View style={styles.profileIcon}>
          {photoUri ? (
            <Image style={styles.avatar} source={{ uri: photoUri }} />
          ) : (
            <View style={styles.avatar}></View>
          )}
          <TouchableOpacity onPress={choosePhoto}>
            <Ionicons
              name={photoUri ? "close-circle-outline" : "add-circle-outline"}
              size={32}
              color="#394467"
              style={styles.addPicture}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{displayName}</Text>
        <ProfileList array={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    width: "100%",
    position: "absolute",
  },

  userContainer: {
    marginTop: "auto",
    height: "84%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  profileIcon: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -0.4 * 120 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addPicture: {
    position: "absolute",
    bottom: 16,
    right: -18,
  },
  logOutBtn: {
    position: "absolute",
    top: 24,
    right: 20,
  },
  title: {
    marginBottom: 33,

    color: "#20232a",

    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
  },
});

export default ProfileScreen;

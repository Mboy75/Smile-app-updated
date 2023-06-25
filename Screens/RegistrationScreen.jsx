import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
//
import { isLogin, checkError } from "../Redux/Selectors/selectors";
import { signUp } from "../Redux/operations";
import { clearError } from "../Redux/Auth/authSlice";
//
import Background from "../Components/Background";
import RegistrationForm from "../Components/RegistrationForm/RegistrationForm";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  const isLoggedIn = useSelector(isLogin);
  const authError = useSelector(checkError);

  useEffect(() => {
    if (authError) {
      Toast.show({
        type: "error",
        text1: "Error, please try again.",
      });
      dispatch(clearError());
    }
  }, [authError]);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const choosePhoto = async () => {
    if (photoUri) {
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
    }
  };

  const handleSubmit = (user) => {
    const currentUser = {
      email: user.email,
      password: user.password,
      displayName: user.login,
      photoURL: photoUri,
    };

    dispatch(signUp(currentUser));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Background />
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-100}
          >
            <View style={styles.formContainer}>
              <View style={styles.profileIcon}>
                {photoUri && (
                  <Image style={styles.picture} source={{ uri: photoUri }} />
                )}
                <TouchableOpacity onPress={choosePhoto}>
                  <Ionicons
                    name={
                      photoUri ? "close-circle-outline" : "add-circle-outline"
                    }
                    size={32}
                    color="#394467"
                    style={styles.addPicture}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Sign up</Text>
              <RegistrationForm
                formSubmit={handleSubmit}
                keyboardOpen={keyboardOpen}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <Toast />
    </>
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

  formContainer: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",
  },
  picture: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
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

  addPicture: {
    position: "absolute",
    bottom: -105,
    right: -18,
  },

  title: {
    marginBottom: 33,

    color: "#20232a",

    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
  },
});

export default RegistrationScreen;

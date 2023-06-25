import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
//
import { isLogin, checkError } from "../Redux/Selectors/selectors";
import { logIn } from "../Redux/operations";
import { clearError } from "../Redux/Auth/authSlice";
//
import Background from "../Components/Background";
import LoginForm from "../Components/LoginForm/LoginForm";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const isLoggedIn = useSelector(isLogin);
  const loginError = useSelector(checkError);

  useEffect(() => {
    if (loginError) {
      Toast.show({
        type: "error",
        text1: "Incorrect email or password",
      });
      dispatch(clearError());
    }
  }, [loginError]);

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

  const handleSubmit = (user) => {
    const currentUser = { email: user.email, password: user.password };

    dispatch(logIn(currentUser));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-180}
          >
            <Background />
            <View style={styles.formContainer}>
              <Text style={styles.title}>Welcome!</Text>
              <LoginForm
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
    display: "flex",

    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,

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

  addPicture: {
    position: "absolute",
    bottom: -105,
    right: -12.5,
  },

  title: {
    marginBottom: 33,

    color: "#394467",

    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
  },
});

export default LoginScreen;

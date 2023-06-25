import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const schema = yup
  .object({
    login: yup.string().required("Login is required!"),
    email: yup
      .string()
      .email("The email address must be valid")
      .required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(5, "Password must be at least 5 digits")
      .max(12, "Password must not exceed 12 digits"),
  })
  .required();

const RegistrationForm = ({ formSubmit, keyboardOpen }) => {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [loginInputActive, setLoginInputActive] = useState(false);
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    formSubmit(data);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginFocusHandler = () => {
    setLoginInputActive(true);
  };

  const loginBlurHandler = () => {
    setLoginInputActive(false);
  };

  const emailFocusHandler = () => {
    setEmailInputActive(true);
  };

  const emailBlurHandler = () => {
    setEmailInputActive(false);
  };

  const passwordFocusHandler = () => {
    setPasswordInputActive(true);
  };

  const passwordBlurHandler = () => {
    setPasswordInputActive(false);
  };

  return (
    <>
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Login..."
              onBlur={loginBlurHandler}
                onFocus={loginFocusHandler}
              onChangeText={onChange}
              value={value}
              style={loginInputActive ? styles.activeInput : styles.input}
            />
          )}
          name="login"
        />
        {<Text style={styles.error}>{errors.login?.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email..."
              onChangeText={onChange}
              onBlur={emailBlurHandler}
              onFocus={emailFocusHandler}
              value={value}
              style={emailInputActive ? styles.activeInput : styles.input}
            />
          )}
          name="email"
        />
        {<Text style={styles.error}>{errors.email?.message}</Text>}
        <View style={styles.passwordContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password..."
                secureTextEntry={!showPassword}
                onBlur={passwordBlurHandler}
                onFocus={passwordFocusHandler}
                onChangeText={onChange}
                value={value}
                style={passwordInputActive ? styles.activeInput : styles.input}
              />
            )}
            name="password"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.showHideText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {<Text style={styles.error}>{errors.password?.message}</Text>}
      </View>
      {!keyboardOpen && (
        <>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>
              Are you already registered?{" "}
              <Text
                style={styles.loginLink}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  })
                }
              >
                Go to login page.
              </Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    display: "flex",
    gap: 4,
    marginBottom: 43,
  },

  input: {
    width: "100%",
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },

  activeInput: {
    width: "100%",
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,

    backgroundColor: "#F6F6F6",
    borderColor: "#394467",
  },

  showHideText: {
    position: "absolute",
    bottom: 16,
    right: 16,
    transform: [{ translateY: -4 }],

    fontSize: 16,
    textDecorationLine: "underline",

    color: "#1B4371",
  },

  submitButton: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 100,

    backgroundColor: "#394467",
  },

  submitButtonText: {
    textAlign: "center",
    fontSize: 16,

    color: "#FFFFFF",
  },

  loginText: {
    textAlign: "center",
    color: "#1B4371",
  },

  loginLink: {
    textAlign: "center",
    textDecorationLine: "underline",

    color: "#1B4371",
  },
  error: {
    color: "red",
  },
});

export default RegistrationForm;

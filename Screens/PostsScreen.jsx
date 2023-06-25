import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
//
import { id } from "../Redux/Selectors/selectors";
import { logOut } from "../Redux/Auth/authSlice";
import { useGetPostsQuery } from "../Redux/Posts/postsApi";
//
import PostsList from "../Components/PostsList/PostsList";
import PostsUser from "../Components/PostsUser/PostsUser";

const PostsScreen = () => {
  const userId = useSelector(id);

  const { data = [] } = useGetPostsQuery({ userId });

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onLogOut = () => {
    dispatch(logOut());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Publications</Text>
        <View>
          <TouchableOpacity style={styles.logOutBtn} onPress={onLogOut}>
            <Ionicons name="log-out-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <PostsUser />
        <PostsList array={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 55,
    paddingBottom: 11,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#FFFFFF",
  },

  logOutBtn: {
    position: "absolute",
    bottom: 0,
    right: 20,
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
});

export default PostsScreen;

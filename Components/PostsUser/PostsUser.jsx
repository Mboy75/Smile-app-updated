import { View, Text, Image, StyleSheet } from "react-native";

import { useSelector } from "react-redux";
import {
  userName,
  userEmail,
  userPhoto,
} from "../../Redux/Selectors/selectors";

const PostsUser = () => {
  const displayName = useSelector(userName);
  const displayEmail = useSelector(userEmail);

  const userAvatar = useSelector(userPhoto);

  return (
    <View style={styles.user}>
      {userAvatar ? (
        <Image style={styles.avatar} source={{ uri: userAvatar }} />
      ) : <View style={styles.avatar}></View>}
      <View style={styles.thumb}>
        <View>
          <Text style={styles.name}>{displayName}</Text>
        </View>
        <View>
          <Text style={styles.email}>{displayEmail}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 32,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});

export default PostsUser;

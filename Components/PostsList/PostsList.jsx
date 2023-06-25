import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PostsList = ({ array }) => {
  const navigation = useNavigation();
  return (
    array.length > 0 && (
      <ScrollView>
        {array.map((item) => {
          return (
            <View style={styles.post} key={item.id}>
              <Image style={styles.postImage} source={{ uri: item.photo }} />
              <Text style={styles.postName}>{item.name}</Text>
              <View style={styles.postThumb}>
                <TouchableOpacity
                  style={styles.postInfo}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      photo: item.photo,
                      postId: item.id,
                      data: item.comments,
                    })
                  }
                >
                  <Ionicons
                    name="chatbubbles-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text>{item.comments.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Map", item.location)}
                  style={styles.postInfo}
                  disabled={item.location === null}
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                  <Text style={styles.postAddress}>{item.address}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 34,
  },
  postImage: {
    width: "100%",
    height: 240,

    borderWidth: 1,
    borderRadius: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  postThumb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 11,
  },
  postInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
  },
  postAddress: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});

export default PostsList;

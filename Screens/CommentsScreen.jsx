import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
//
import { userPhoto, id } from "../Redux/Selectors/selectors";
import { useAddNewCommentMutation } from "../Redux/Posts/postsApi";
import { useGetCommentsQuery } from "../Redux/Posts/postsApi";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  const userAvatar = useSelector(userPhoto);

  const userId = useSelector(id);

  const { params } = useRoute();

  const { data = [] } = useGetCommentsQuery({ userId, postId: params.postId });

  const comments = data.comments ?? [];

  const navigation = useNavigation();

  const [addNewComment] = useAddNewCommentMutation();

  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      return;
    }

    addNewComment({
      postId: params.postId,
      newComment: { date: Date.now(), text: comment, avatar: userAvatar },
    });
    setComment("");
  };

  const dateFormated = (date) => {
    return format(date, "dd MMMM, yyyy | HH:mm");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-260}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Comments</Text>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {params && (
            <View style={styles.post}>
              <Image style={styles.postImage} source={{ uri: params.photo }} />
            </View>
          )}
          <ScrollView>
            {comments.length > 0 && (
              <View style={styles.comments}>
                {comments.map((el) => {
                  return (
                    <View key={el.date} style={styles.commentsWrap}>
                      {userAvatar ? (
                        <Image
                          style={styles.avatar}
                          source={{ uri: el.avatar }}
                        />
                      ) : (
                        <View style={styles.avatar}></View>
                      )}
                      <View style={styles.commentThumb}>
                        <Text style={styles.commentText}>{el.text}</Text>
                        <Text style={styles.commentDate}>
                          {dateFormated(el.date)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>

          <View style={styles.inputThumb}>
            <TextInput
              style={styles.input}
              placeholder="Leave a comment..."
              placeholderTextColor="#BDBDBD"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={handleCommentSubmit}>
              <View style={styles.arrow}>
                <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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

  post: {
    marginBottom: 34,
  },
  postImage: {
    width: "100%",
    height: 240,

    borderWidth: 1,
    borderRadius: 8,
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    gap: 24,

    paddingBottom: 30,
  },
  commentsWrap: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 28,
    height: 28,
    marginLeft: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  commentThumb: {
    width: "85%",
    minHeight: 70,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    marginLeft: "auto",

    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  inputThumb: {
    position: "relative",
    marginTop: "auto",
    paddingBottom: 16,
  },

  input: {
    width: "100%",
    padding: 16,

    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderColor: "#E8E8E8",

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  arrow: {
    position: "absolute",
    display: "flex",
    right: 8,
    bottom: 14,
    width: 34,
    height: 34,
    transform: [{ translateY: -0.5 * 0 }],
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,

    backgroundColor: "#394467",
  },
});

export default CommentsScreen;

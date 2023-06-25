import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import { db } from "../../config";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://massi-app-default-rtdb.europe-west1.firebasedatabase.app",
  }),
  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn() {
        try {
          const userPostsRef = collection(db, "posts");
          const querySnapshot = await getDocs(userPostsRef);
          let posts = [];
          querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
          });
          return { data: posts };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result, error, userId) => [{ type: "Posts", userId }],
    }),
    getUserPosts: builder.query({
      async queryFn(userID) {
        try {
          const userPostsRef = collection(db, "posts");
          const querySnapshot = await getDocs(userPostsRef);
          let posts = [];
          querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
          });

          const userPosts = posts.filter((el) => el.postId === userID);

          return { data: userPosts };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result, error, userId) => [{ type: "Posts", userId }],
    }),
    addPost: builder.mutation({
      async queryFn({ newPost }) {
        try {
          const userPostsRef = collection(db, "posts");
          const docRef = await addDoc(userPostsRef, newPost);
          return { data: { id: docRef.id, ...newPost } };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "Posts", userId },
      ],
    }),
    getComments: builder.query({
      async queryFn({ postId }) {
        try {
          const postRef = doc(collection(db, "posts"), postId);
          const postSnapshot = await getDoc(postRef);
          const postData = { id: postSnapshot.id, ...postSnapshot.data() };
          return { data: postData };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result, error, { postId }) => [
        { type: "Comments", postId },
      ],
    }),
    addNewComment: builder.mutation({
      async queryFn({ postId, newComment }) {
        try {
          const postRef = doc(collection(db, "posts"), postId);
          await updateDoc(postRef, {
            comments: arrayUnion(newComment),
          });
          return { data: newComment };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", postId },
        { type: "Posts", postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useAddNewCommentMutation,
  useGetCommentsQuery,
  useGetUserPostsQuery,
} = postsApi;


import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Map</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType="standard"
        minZoomLevel={13}
        region={{
          ...params,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: params.latitude,
            longitude: params.longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;

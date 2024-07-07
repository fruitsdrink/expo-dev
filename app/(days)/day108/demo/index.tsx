import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions
} from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [albums, setAlbums] = useState(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permissionMediaLibraryResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  async function getAlbums() {
    if (
      !permissionMediaLibraryResponse ||
      permissionMediaLibraryResponse.status !== "granted"
    ) {
      await requestMediaLibraryPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true
    });
    // console.log("fetchedAlbums: ", fetchedAlbums);
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text>Requesting camera permission</Text>
      </View>
    );
  }

  // console.log("cameraPermission===: ", cameraPermission);

  if (!cameraPermission.granted) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestCameraPermission} title="grant permission" />
        </View>
      </>
    );
  }

  const tackPic = async () => {
    const newPhoto = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
      exif: false
    });

    setPhoto(newPhoto);
  };

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    };

    const savePic = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={{
            alignSelf: "stretch",
            flex: 1
          }}
          source={{ uri: `data:image/jpg:base64,${photo.base64}` }}
        />
        <Button title="Share" onPress={sharePic} />
        {permissionMediaLibraryResponse.granted ? (
          <Button title="Save" onPress={savePic} />
        ) : null}
        <Button title="Discard" onPress={() => setPhoto(null)} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CameraView style={styles.container} ref={cameraRef}>
        <StatusBar hidden />
        <View
          style={{
            backgroundColor: "#fff",
            alignSelf: "flex-end"
          }}
        >
          <Button title="Tack Pic" onPress={tackPic} />
        </View>
      </CameraView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

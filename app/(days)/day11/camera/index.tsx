import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  PhotoFile,
  TakePhotoOptions,
  VideoFile,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  useMicrophonePermission,
} from "react-native-vision-camera";
import { useFocusEffect } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

export default function CameraScreen() {
  const [isActive, setIsActive] = useState(false);
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<PhotoFile>();
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<VideoFile>();
  const [mode, setMode] = useState<"camera" | "qr">("camera");

  const { hasPermission, requestPermission } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  const device = useCameraDevice("back", {
    physicalDevices: [],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log("🚀 ~ CameraScreen ~ codes:", codes);
    },
  });

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        // console.log("🚀 ~ CameraScreen ~ isActive:", isActive);
        setIsActive(false);
      };
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!hasMicrophonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, hasMicrophonePermission]);

  if (!hasPermission || !hasMicrophonePermission) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!device) {
    return (
      <View>
        <Text>Camera device not found</Text>
      </View>
    );
  }

  // console.log("🚀 ~ CameraScreen ~ isActive:", isActive);

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }

    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    console.log("🚀 ~ uploadPhoto ~ data:", data);
  };

  const handleOnTackPicture = async () => {
    if (isRecording) {
      camera.current?.stopRecording();

      return;
    }
    const photo = await camera.current?.takePhoto({
      flash,
    });
    // console.log("🚀 ~ handleOnTackPicture ~ photo:", photo);
    setPhoto(photo);
  };

  const handleRecord = async () => {
    if (!camera.current) {
      return;
    }

    setIsRecording(true);
    camera.current.startRecording({
      onRecordingFinished: (video) => {
        console.log("🚀 ~ handleRecord ~ video:", video);
        flash: device?.hasFlash ? (flash === "on" ? "on" : "off") : "off";
        setIsRecording(false);
        setVideo(video);
      },
      onRecordingError: (error) => {
        console.error(error);
        setIsRecording(false);
      },
    });
  };

  return (
    <View style={styles.container}>
      {video && (
        <>
          <Video
            style={StyleSheet.absoluteFill}
            source={{
              uri: `file://${video.path}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => {
              console.log(status);
            }}
          />
        </>
      )}

      {photo && (
        <>
          <Image
            source={{
              uri: `file://${photo.path}`,
            }}
            style={StyleSheet.absoluteFill}
          />
          <AntDesign
            onPress={() => {
              setPhoto(undefined);
            }}
            name="arrowleft"
            size={24}
            color="white"
            style={{
              position: "absolute",
              top: 50,
              left: 30,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: "rgba(0,0,0, 0.2)",
            }}
          >
            <Pressable
              onPress={uploadPhoto}
              style={{
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 12,
                  color: "white",
                }}
              >
                Upload
              </Text>
            </Pressable>
          </View>
        </>
      )}

      {!photo && !video && (
        <>
          {mode === "camera" ? (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive && !photo && !video}
              photo
              video
              audio
            />
          ) : (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
          )}
          {isActive && !photo && (
            <>
              <View
                style={{
                  position: "absolute",
                  right: 10,
                  top: 50,
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  gap: 12,
                }}
              >
                {device?.hasFlash && (
                  <Ionicons
                    onPress={() => {
                      setFlash((prev) => (prev === "off" ? "on" : "off"));
                    }}
                    name={flash === "off" ? "flash-off-sharp" : "flash-sharp"}
                    size={24}
                    color="white"
                  />
                )}

                <Ionicons
                  onPress={() =>
                    setMode((prev) => (prev === "camera" ? "qr" : "camera"))
                  }
                  name={mode === "camera" ? "qr-code-sharp" : "camera"}
                  size={24}
                  color="white"
                />
              </View>

              <Pressable
                onPress={handleOnTackPicture}
                onLongPress={handleRecord}
                style={{
                  position: "absolute",
                  bottom: 50,
                  width: 75,
                  height: 75,
                  borderRadius: 75,
                  backgroundColor: isRecording ? "red" : "white",
                  alignSelf: "center",
                }}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

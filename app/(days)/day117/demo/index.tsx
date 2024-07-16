import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const pdfs = ["https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf"];

export default function DemoScreen() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileSave = async (uri: string, filename: string) => {
    if (Platform.OS === "android") {
      const directoryUri = FileSystem.cacheDirectory + filename;
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      await FileSystem.writeAsStringAsync(directoryUri, base64File, {
        encoding: FileSystem.EncodingType.Base64
      });

      await Sharing.shareAsync(directoryUri);
    } else {
      Sharing.shareAsync(uri);
    }
  };
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setProgress(0);

      const fileUri = FileSystem.documentDirectory + "sample.pdf";

      const downloadResumable = FileSystem.createDownloadResumable(
        pdfs[0],
        fileUri,
        {},
        async (downloadProgress) => {
          const progress = Math.round(
            (downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite) *
              100
          );
          console.log(progress);
          setProgress(progress);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      if (uri) {
        await fileSave(uri, "sample.pdf");
      }
    } catch (error) {
      Alert.alert("error", "Failed to download pdf");
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        {isDownloading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Button title="Download PDF" onPress={handleDownload} />
        )}
        {isDownloading && <Text style={styles.progress}>{progress}%</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  progress: {}
});

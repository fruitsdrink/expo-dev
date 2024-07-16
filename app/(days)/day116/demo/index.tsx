import { Button, Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import Pdf from "react-native-pdf";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const onPickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true
    });
    if (result.canceled === false && result.assets && result.assets.length) {
      console.log(result.assets[0].uri);
      setSelectedPdf(result.assets[0].uri);
    } else {
      setSelectedPdf(null);
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <View>
          <Button title="Select PDF" onPress={onPickDocument} />
        </View>
        {selectedPdf && (
          <Pdf
            style={{
              flex: 1,
              width: SCREEN_WIDTH
            }}
            source={{ uri: selectedPdf }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              console.log(`File path: ${filePath}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
          />
        )}
      </View>
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

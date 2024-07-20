import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/components/day119/button";

export default function New() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 12
      }}
    >
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 8,
          borderRadius: 8
        }}
      >
        <Image
          source={{
            uri: image
          }}
          style={{
            width: 200,
            height: (200 * 4) / 3,
            alignSelf: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: 8
          }}
        />
      </View>

      <Text
        onPress={() => pickImage}
        style={{
          marginTop: 20,
          fontWeight: "semibold",
          color: "#3b82f6"
        }}
      >
        Change
      </Text>

      <TextInput
        value={caption}
        placeholder="What is on your mind"
        style={{
          width: "100%",
          padding: 12
        }}
        autoCapitalize={"none"}
        autoCorrect={false}
        onChangeText={setCaption}
      />

      <Button title="Share" onPress={() => {}} isMarginTop={true} />
    </View>
  );
}

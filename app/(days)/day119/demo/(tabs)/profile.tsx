import { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/components/day119/button";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

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
    <View className="flex-1 p-3">
      {image ? (
        <Image
          source={{ uri: image }}
          className="self-center w-52 rounded-full aspect-square bg-slate-300"
        />
      ) : (
        <View className="self-center w-52 rounded-full aspect-square bg-slate-300" />
      )}
      <Text
        onPress={pickImage}
        className="self-center m-5 font-semibold text-blue-500"
      >
        Change
      </Text>
      <Text className="mb-2 text-gray-800">Usename</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="p-3 rounded-md border border-gray-300"
      />
      <View className="gap-2 mt-auto">
        <Button title="Update profile" onPress={() => {}} />
        <Button title="Sign out" onPress={() => {}} />
      </View>
    </View>
  );
}

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/components/day119/button";
import { uploadMedia } from "@/lib/day119/cloudinary";
import { supabase } from "@/lib/day119/supabase";
import { useAuth } from "@/providers/day119/AuthProvider";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";

export default function New() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { session } = useAuth();

  useEffect(() => {
    if (!media) {
      pickMedia();
    }
  }, [media]);

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    if (!result.canceled) {
      setMedia(null);
      setMediaType(null);

      if (result.assets[0].type === "image") {
        setMedia(result.assets[0].uri);
        setMediaType("image");
      }
      if (result.assets[0].type === "video") {
        setMedia(result.assets[0].uri);
        setMediaType("video");
      }
    }
  };

  const upload = async () => {
    if (!media || isUploading) {
      return;
    }
    try {
      const res = await uploadMedia({
        media,
        preset: "day119"
      });

      console.log("upload res: ", res);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload image");
    }
  };

  const createPost = async () => {
    try {
      setIsUploading(true);
      const { public_id } = await upload();

      if (public_id) {
        const { data, error } = await supabase
          .from("posts")
          .insert([
            {
              caption,
              image: public_id,
              user_id: session?.user.id,
              media_type: mediaType
            }
          ])
          .select();

        if (error) {
          throw new Error(error.message);
        }

        router.push("/day119/demo/(tabs)");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to create post");
    } finally {
      setIsUploading(false);
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
        {media && mediaType === "image" ? (
          <Image
            source={{
              uri: media
            }}
            style={{
              width: "100%",
              aspectRatio: 4 / 3,
              alignSelf: "center",
              backgroundColor: "#f3f4f6",
              borderRadius: 8
            }}
          />
        ) : media && mediaType === "video" ? (
          <Video
            style={{
              width: "100%",
              aspectRatio: 4 / 3
            }}
            source={{
              uri: media
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <View className="w-full aspect-[4/3] rounded bg-slate-300" />
        )}
      </View>

      <Text
        onPress={pickMedia}
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

      <Button title="Share" onPress={createPost} isMarginTop={true} />
      {isUploading && (
        <ActivityIndicator
          color={"#fff"}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.3)"
            }
          ]}
        />
      )}
    </View>
  );
}

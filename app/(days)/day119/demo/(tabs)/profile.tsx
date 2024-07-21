import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/components/day119/button";
import { supabase } from "@/lib/day119/supabase";
import { useAuth } from "@/providers/day119/AuthProvider";
import { CustomTextInput } from "@/components/day119/custom-textinput";
import { uploadImage } from "@/lib/day119/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { cld } from "@/lib/day119/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarUri, setAvatarUri] = useState<CloudinaryImage | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    try {
      setLoading(true);
      getProfile();
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    console.log("fetch profile:", {
      data,
      error
    });

    if (error) {
      console.log(error);
      Alert.alert("Error", "Could not fetch profile");
    }
    if (data) {
      setUsername(data.username);
      setBio(data.bio);
      if (data.avatar_url) {
        const avatar = cld.image(data.avatar_url);
        avatar.resize(thumbnail().width(300).height(300)).format("png");
        setAvatarUri(avatar);
        console.log({ avatar });
      }
    }
  };

  const updateProfile = async () => {
    console.log("update profile user:", user);
    if (!user || !user.id) {
      console.log("update profile user is empty");
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        username,
        bio
      };

      if (image) {
        const { public_id } = await uploadImage({
          image,
          preset: "day119"
        });

        if (public_id) {
          updateData["avatar_url"] = public_id;
        }
      }
      const { data, error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select();
      console.log("update profile:", {
        data,
        error
      });
      if (error) {
        console.error(error);
        Alert.alert("Error", "Could not update profile");
      } else {
        Alert.alert("Success", "Profile updated successfully");
      }
    } finally {
      setLoading(false);
    }
  };

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
      ) : avatarUri ? (
        <AdvancedImage
          cldImg={avatarUri}
          style={{
            width: 208,
            height: 208,
            borderRadius: 300,
            alignSelf: "center"
          }}
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
      <View className="gap-4">
        <CustomTextInput
          label="Username"
          value={username}
          placeholder="Enter your username"
          onChangeText={setUsername}
        />
        <CustomTextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
          multiline
          numberOfLines={3}
        />
      </View>

      <View className="gap-2 mt-auto">
        <Button title="Update profile" onPress={updateProfile} />
        <Button
          title="Sign out"
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        />
      </View>
      {loading && <ActivityIndicator style={StyleSheet.absoluteFill} />}
    </View>
  );
}

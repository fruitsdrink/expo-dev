import React from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "@/lib/day119/cloudinary";

export interface Post {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  user: User;
}

interface User {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
}

type PostListItemProps = {
  post: Post;
};
export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [loading, setLoading] = React.useState(true);
  const { width } = useWindowDimensions();

  const image = cld.image(post.image);
  image.resize(thumbnail().width(width).height(width)); // Crop the image, focusing on the face.

  const avatar = cld.image(post.user.avatar_url || "avatar/user_drnxsb");
  const avatarWidth = 48;
  avatar
    .resize(
      thumbnail()
        .width(avatarWidth)
        .height(avatarWidth)
        .gravity(focusOn(FocusOn.face()))
    )
    .format("png");

  return (
    <View
      style={{
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          padding: 8
        }}
      >
        <AdvancedImage
          cldImg={avatar}
          style={{
            width: 48,
            borderRadius: 24,
            aspectRatio: 1
          }}
        />
        <Text
          style={{
            fontWeight: "semibold"
          }}
        >
          {post.user.username || "New User"}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AdvancedImage
          cldImg={image}
          style={{
            width: "100%",
            aspectRatio: 4 / 3
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />

        {loading && (
          <ActivityIndicator size={"large"} style={StyleSheet.absoluteFill} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          padding: 12
        }}
      >
        <AntDesign name="hearto" size={20} />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather
          name="bookmark"
          size={20}
          style={{
            marginLeft: "auto"
          }}
        />
      </View>
    </View>
  );
};

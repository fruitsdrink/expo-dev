import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  Alert
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { AdvancedImage, AdvancedVideo } from "cloudinary-react-native";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "@/lib/day119/cloudinary";
import { Post, supabase } from "@/lib/day119/supabase";
import { PostContent } from "./post-content";
import { useAuth } from "@/providers/day119/AuthProvider";

type PostListItemProps = {
  post: Post;
};
export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [isLiked, setIsLiked] = React.useState(post.mylikes.length > 0);
  const [isFetching, setIsFetching] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes[0]?.count || 0);
  const { user } = useAuth();

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

  // const fetchLike = async () => {
  //   const { data, error } = await supabase
  //     .from("likes")
  //     .select("*")
  //     .eq("user_id", user.id)
  //     .eq("post_id", post.id);

  //   if (error) {
  //     console.error("fetchLike error: ", error);
  //     Alert.alert("Error fetching like");
  //   }
  //   if (data && data.length > 0) {
  //     setIsLiked(true);
  //   }
  // };

  const saveLike = async () => {
    if (!user || !user.id) {
      return;
    }

    const { error } = await supabase
      .from("likes")
      .insert({ user_id: user.id, post_id: post.id });
    if (error) {
      console.error("doLike error: ", error);
      Alert.alert("Error liking post");
    }
  };

  const deleteLike = async () => {
    if (!user || !user.id) {
      return;
    }

    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", post.id);
    if (error) {
      console.error("deleteLike error: ", error);
      Alert.alert("Error unliking post");
    } else {
      console.log("deleteLike success: ", post.id);
    }
  };

  const doLike = async (isLike: boolean) => {
    try {
      setIsFetching(true);
      if (isLike) {
        await saveLike();
        setLikeCount((prev) => prev + 1);
      } else {
        await deleteLike();
        setLikeCount((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return prev;
        });
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("doLike error: ", error);
      Alert.alert("Error liking post");
    } finally {
      setIsFetching(false);
    }
  };

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
      <PostContent post={post} />
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          padding: 12
        }}
      >
        <AntDesign
          onPress={() => doLike(!isLiked)}
          name={isLiked ? "heart" : "hearto"}
          size={20}
          color={isLiked ? "crimson" : "black"}
        />
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
      <View className="gap-1 px-3">
        <Text className="font-semibold">{likeCount} likes</Text>
        <Text>
          <Text className="font-semibold">
            {post.user.username || "New User"}{" "}
          </Text>
          {post.caption}
        </Text>
      </View>
      {isFetching && (
        <ActivityIndicator
          color={"white"}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.5)"
            }
          ]}
        />
      )}
    </View>
  );
};

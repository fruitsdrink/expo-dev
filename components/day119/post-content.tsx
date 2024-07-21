import { cld } from "@/lib/day119/cloudinary";
import { Post } from "@/lib/day119/supabase";
import React from "react";
import {
  ActivityIndicator,
  View,
  useWindowDimensions,
  StyleSheet
} from "react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { ResizeMode, Video } from "expo-av";

export const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  const videoRef = React.useRef<Video>(null);
  const [loading, setLoading] = React.useState(
    post.media_type === "image" ? true : false
  );
  const { width } = useWindowDimensions();

  if (post.media_type === "image") {
    const image = cld.image(post.image);
    image.resize(thumbnail().width(width).height(width)); // Crop the image, focusing on the face.

    return (
      <View>
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
    );
  }
  if (post.media_type === "video") {
    return (
      <View>
        {/* // <AdvancedVideo
          //   cldVideo={cld.video(post.image)}
          //   videoStyle={{
          //     width: "100%",
          //     aspectRatio: 4 / 3
          //   }}
          // /> */}
        <Video
          ref={videoRef}
          source={{
            uri: cld.video(post.image).resize(scale().width(width)).toURL()
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          // shouldPlay
          isMuted={false}
          style={{
            width: "100%",
            aspectRatio: 4 / 3
          }}
        />
        {loading && (
          <ActivityIndicator size={"large"} style={StyleSheet.absoluteFill} />
        )}
      </View>
    );
  }
};

import React from "react";
import { Pressable, View, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  isMarginTop?: boolean;
};
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isMarginTop = false
}) => {
  return (
    <View
      style={{
        marginTop: isMarginTop ? "auto" : 0,
        width: "100%"
      }}
    >
      <Pressable
        style={{
          alignItems: "center",
          padding: 12,
          width: "100%",
          backgroundColor: "#3b82f6",
          borderRadius: 8
        }}
        onPress={onPress}
      >
        <Text
          style={{
            fontWeight: "semibold",
            color: "white"
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

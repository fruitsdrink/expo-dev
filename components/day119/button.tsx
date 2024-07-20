import React from "react";
import { Pressable, View, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  isMarginTop?: boolean;
  isLoading?: boolean;
};
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isMarginTop = false,
  isLoading = false
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
        onPress={() => {
          if (onPress && !isLoading) onPress();
        }}
      >
        {!isLoading ? (
          <Text
            style={{
              fontWeight: "semibold",
              color: "white"
            }}
          >
            {title}
          </Text>
        ) : (
          <ActivityIndicator color="white" size={"small"} />
        )}
      </Pressable>
    </View>
  );
};

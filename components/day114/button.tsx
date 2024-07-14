import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import { Colors } from "@/constants/day114/colors";
import { RFValue } from "react-native-responsive-fontsize";

interface IProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
export const Button: React.FC<IProps> = ({
  title,
  onPress,
  disabled,
  buttonStyle,
  textStyle
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? Colors.GREY : Colors.ORANGE
        },
        buttonStyle
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "70%",
    alignSelf: "center",
    paddingVertical: RFValue(10),
    alignItems: "center",
    borderRadius: RFValue(5)
  },
  text: {
    color: Colors.WHITE,
    fontSize: RFValue(22)
  }
});

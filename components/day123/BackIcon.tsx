import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
};
export const BackIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color={"#333"}
      style={{ padding: 12 }}
      onPress={onPress}
    />
  );
};

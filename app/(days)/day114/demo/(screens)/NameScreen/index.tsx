import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const NameScreen: React.FC<IProps> = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <Text>NameScreen</Text>
    </View>
  );
};

export default NameScreen;

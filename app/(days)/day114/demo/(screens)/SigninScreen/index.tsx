import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const SigninScreen: React.FC<IProps> = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <Text>SigninScreen</Text>
    </View>
  );
};

export default SigninScreen;

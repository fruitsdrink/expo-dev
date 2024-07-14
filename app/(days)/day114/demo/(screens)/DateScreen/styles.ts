import { Colors } from "@/constants/day114/colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const createStyles = () =>
  StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      fontSize: RFValue(25),
      fontWeight: "300",
      color: Colors.BLACK
    }
  });

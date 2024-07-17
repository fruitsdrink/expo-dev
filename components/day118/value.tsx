import { StyleSheet, View, Text } from "react-native";

type ValueProps = {
  lable: string;
  value: string;
};
export const Value: React.FC<ValueProps> = ({ lable, value }) => {
  return (
    <View>
      <Text style={styles.label}>{lable}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 20
  },
  value: {
    fontSize: 45,
    color: "#afb3be",
    fontWeight: "500"
  }
});

import { useNavigation } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Page() {
  const navigation = useNavigation();

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions);
  };
  return (
    <View style={styles.container}>
      <Text>Index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

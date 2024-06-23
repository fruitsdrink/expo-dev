import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Page() {
  const navigation = useNavigation();

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Open Drawer" onPress={onToggleDrawer} />
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

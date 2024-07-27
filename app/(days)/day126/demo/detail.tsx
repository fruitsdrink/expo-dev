import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "./_layout";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={28}
          color={"#333"}
          style={{
            padding: 12,
            position: "absolute",
            top: 30,
            left: 20,
            zIndex: 2
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text>Detail</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});

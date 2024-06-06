import { Stack } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.profileAvatar}
              source={{
                uri: "https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }}
              alt="Profile avatar"
            />
            <Text style={styles.profileName}>Jenny Fox</Text>
            <Text style={styles.profileEmail}>Jenny.fox@example.com</Text>
            <TouchableOpacity>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>
                <FeatherIcon name="edit" color={"#fff"} size={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    flex: 1
  },
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "e3e3d3"
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 60
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484"
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  }
});

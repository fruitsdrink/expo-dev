import { Stack } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";

const items = [
  {
    img: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80",
    name: "Squat",
    cal: 22,
    duration: 10
  },
  {
    img: "https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Pull-up",
    cal: 12,
    duration: 15
  },
  {
    img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Push-up",
    cal: 12,
    duration: 5
  },
  {
    img: "https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Calisthenics",
    cal: 33,
    duration: 12
  },
  {
    img: "https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Lunge",
    cal: 44,
    duration: 10
  },
  {
    img: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80",
    name: "Squat",
    cal: 22,
    duration: 10
  },
  {
    img: "https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Pull-up",
    cal: 12,
    duration: 15
  },
  {
    img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Push-up",
    cal: 12,
    duration: 5
  },
  {
    img: "https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Calisthenics",
    cal: 33,
    duration: 12
  },
  {
    img: "https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Lunge",
    cal: 44,
    duration: 10
  }
];

export default function WorkoutListScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>List Title</Text>
          {items.map(({ name, img, cal, duration }, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.card}>
                <Image
                  source={{ uri: img }}
                  style={styles.cardImg}
                  alt=""
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.cardTitle}>{name}</Text>
                  <View style={styles.cardStats}>
                    <View style={styles.cardStatsItem}>
                      <FeatherIcon name="clock" size={16} color="#636a73" />
                      <Text style={styles.cardStatsItemText}>
                        {duration} mins
                      </Text>
                    </View>
                    <View style={styles.cardStatsItem}>
                      <FeatherIcon name="zap" size={16} color="#636a73" />
                      <Text style={styles.cardStatsItemText}>{cal} cals</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon name="chevron-right" size={22} color="#636a73" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12
  },
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardStatsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#636a83",
    marginLeft: 2
  },
  cardAction: {
    marginLeft: "auto"
  }
});

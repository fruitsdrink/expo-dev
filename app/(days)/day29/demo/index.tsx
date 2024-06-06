import { Stack } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";
import { useState } from "react";
import Profile from "../../day28/demo/index";

const SECTIONS: {
  header: string;
  items: {
    id: number;
    label: string;
    icon: keyof typeof FeatherIcon.glyphMap;
    type: "select" | "toggle" | "link";
  }[];
}[] = [
  {
    header: "Preferences",
    items: [
      {
        id: 1,
        label: "Language",
        icon: "globe",
        type: "select"
      },
      {
        id: 2,
        label: "Dark Mode",
        icon: "moon",
        type: "toggle"
      },
      {
        id: 3,
        label: "Ues Wi-Fi",
        icon: "wifi",
        type: "toggle"
      }
    ]
  },
  {
    header: "Help",
    items: [
      {
        id: 4,
        label: "Report Bug",
        icon: "flag",
        type: "link"
      },
      {
        id: 5,
        label: "Contact US",
        icon: "mail",
        type: "link"
      }
    ]
  },
  {
    header: "Content",
    items: [
      {
        id: 6,
        label: "Saved",
        icon: "save",
        type: "link"
      },
      {
        id: 7,
        label: "Downloads",
        icon: "download",
        type: "link"
      }
    ]
  }
];
export default function DemoScreen() {
  const [form, setForm] = useState({
    language: "English",
    darkMode: true,
    wifi: false
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Setting</Text>
            <Text style={styles.subtitle}>Update your preferences here</Text>
          </View>

          <Profile />

          {SECTIONS.map(({ header, items }) => (
            <View key={header} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{header}</Text>
              </View>

              <View style={styles.sectionBody}>
                {items.map(({ label, id, icon, type }, index) => (
                  <View
                    style={[
                      styles.rowWrap,
                      index === 0 && { borderTopWidth: 0 }
                    ]}
                    key={id}
                  >
                    <TouchableOpacity>
                      <View style={styles.row}>
                        <FeatherIcon
                          name={icon}
                          size={22}
                          color={"#616161"}
                          style={{ marginRight: 12 }}
                        />
                        <Text style={styles.rowLabel}>{label}</Text>
                        <View style={styles.rowSpacer}></View>
                        {type === "select" && (
                          <Text style={styles.rowValue}>
                            {form[Object.keys(form)[id - 1]]}
                          </Text>
                        )}

                        {type === "toggle" && (
                          <Switch
                            value={form[Object.keys(form)[id - 1]]}
                            onValueChange={(value) =>
                              setForm({
                                ...form,
                                [Object.keys(form)[id - 1]]: value
                              })
                            }
                          />
                        )}

                        {["select", "link"].includes(type) && (
                          <FeatherIcon
                            name="chevron-right"
                            size={22}
                            color="#ababab"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292"
  },
  section: {
    marginTop: 12
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2
  },
  sectionBody: {},
  rowWrap: {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff"
  },
  row: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000"
  },
  rowSpacer: {
    flex: 1
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 6
  }
});

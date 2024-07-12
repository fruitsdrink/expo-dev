import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { expoDb, db, schema, useMigrate } from "@/db";
import { asc, eq, like } from "drizzle-orm";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Data = {
  id: number;
  name: string;
};
export default function DemoScreen() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  // const [success, setSuccess] = useState<boolean | undefined>(undefined);
  // const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<Data[]>([]);

  // const database = useSQLiteContext();
  // const db = drizzle(database, {schema: productSchema})

  const { success, error } = useMigrate();

  // native 模式无效
  useDrizzleStudio(expoDb);

  const fetchProducts = async () => {
    try {
      const res = (await db.query.product.findMany({
        where: search ? like(schema.product.name, `%${search}%`) : undefined,
        orderBy: [asc(schema.product.name)]
      })) as Data[];

      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const add = async () => {
    try {
      if (!name) return;

      const res = await db.insert(schema.product).values({ name });

      // console.log("add res:", res);

      Alert.alert("add scuccess" + res.lastInsertRowId);
      setName("");
      await fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id: number) => {
    Alert.alert("remove", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await db.delete(schema.product).where(eq(schema.product.id, id));

            await fetchProducts();
          } catch (error) {
            console.log(error);
          }
        }
      }
    ]);
  };

  const show = async (id: number) => {
    try {
      const product = await db.query.product.findFirst({
        where: eq(schema.product.id, id)
      });

      if (product) {
        Alert.alert(`Product ID: ${product.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16
        }}
      >
        <Text>迁移数据库错误:</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <>
      {/* <SQLiteProvider databaseName={DATABASE_NAME}> */}
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <View className="flex-1 mx-[32] gap-[16]">
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            className="h-[54] border rounded-[7] w-full px-[16] border-[#999]"
          />
          <TouchableOpacity
            className="bg-blue-500 py-[12] rounded"
            onPress={add}
          >
            <Text className="text-center text-white">Save</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Search..."
            autoCapitalize="none"
            autoCorrect={false}
            value={search}
            onChangeText={setSearch}
            className="h-[54] border rounded-[7] w-full px-[16] border-[#999]"
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onLongPress={() => remove(item.id)}
                onPressOut={() => show(item.id)}
                delayLongPress={1000}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: "#999"
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            )}
            ListEmptyComponent={() => <Text>List empty</Text>}
            contentContainerStyle={{ gap: 16 }}
          />
        </View>
      </SafeAreaView>
      {/* </SQLiteProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

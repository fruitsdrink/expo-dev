import { wait } from "@/utils/utils";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { faker } from "@faker-js/faker";
import { prismaClient } from "@/lib/day47/db";
import { invalidatePostsCount, queryClient } from "@/lib/day47/query-client";

faker.seed(123);

export const AddNewUser = () => {
  const ref = React.useRef<TextInput>(null);
  const [role, setRole] = React.useState("user");

  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        placeholder="Add new user"
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.4)",
          width: "100%",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 4
        }}
        onSubmitEditing={async (e) => {
          console.log("submit: ", e.nativeEvent.text);
          if (!e.nativeEvent.text || !e.nativeEvent.text.trim()) {
            ref.current?.clear();
            await wait(100);
            ref.current.focus();
            return;
          }
          const user = await prismaClient.user.create({
            data: {
              name: e.nativeEvent.text.trim(),
              avatarUri: faker.image.urlLoremFlickr({
                category: "people"
              }),
              role
            }
          });
          // console.log("🚀 ~ onSubmitEditing={ ~ user:", user);
          await prismaClient.post.createMany({
            data: Array.from({
              length: faker.number.int({ min: 1, max: 10 })
            }).map(() => {
              return {
                title: faker.lorem.words(3),
                content: faker.lorem.sentences({ min: 2, max: 8 }),
                published: faker.datatype.boolean(),
                authorId: user.id
              };
            })
          });
          invalidatePostsCount();
          ref.current?.clear();
          await wait(100);
          ref.current.focus();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          gap: 4,
          marginTop: 8
        }}
      >
        {["user", "admin"].map((r) => {
          const isSelected = r === role;
          return (
            <Pressable
              key={r}
              onPress={() => {
                setRole(r);
              }}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: isSelected ? "#0099cc" : "transparent",
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: isSelected ? "white" : "black"
                }}
              >
                {r}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

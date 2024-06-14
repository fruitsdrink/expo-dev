import { Button, FlatList, Image, Text, View } from "react-native";
import { prismaClient } from "@/lib/day47/db";
import { AddNewUser } from "./AddNewUser";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutUp,
  LinearTransition
} from "react-native-reanimated";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { wait } from "@/utils/utils";
import { invalidatePostsCount } from "@/lib/day47/query-client";

export const Users = () => {
  const {
    data: totalPostsCount,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["postsCount"],
    queryFn: async () => {
      await wait(1000);
      return await prismaClient.post.count();
    }
  });

  // console.log("totalPostsCount: ", {
  //   totalPostsCount,
  //   isLoading,
  //   status,
  //   isPending,
  //   isLoadingError,
  //   isFetching,
  //   isFetched
  // });

  const users = prismaClient.user.useFindMany({
    include: {
      _count: true,
      posts: true
    }
  });
  // console.log("🚀 ~ Users ~ users:", users);

  // const userAggregation = prismaClient.user.useAggregate({
  //   _count: true
  // });
  // console.log("🚀 ~ Users ~ userAggregation:", userAggregation);

  // 可以使用此值来获取所有用户的帖子总数
  // const postAggregation = prismaClient.post.useAggregate({
  //   _count: {
  //     _all: true
  //   }
  // });
  // console.log("🚀 ~ Users ~ postAggregation:", postAggregation);

  // const aggregation = prismaClient.post.useAggregate({
  //   _count: true,
  //   _avg: {
  //     authorId: true
  //   }
  // });
  // console.log("🚀 ~ Users ~ aggregation:", aggregation);

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        gap: 10,
        backgroundColor: "#fff"
      }}
    >
      <AddNewUser />
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text>Users</Text>
        {/* {userAggregation && <Text>{userAggregation._count}</Text>} */}
      </View>
      <Text>
        Total Posts: {isLoading || isFetching ? "Loading" : totalPostsCount}
      </Text>
      <View>
        {!users.length && (
          <Text
            style={{
              fontSize: 20,
              opacity: 0.4
            }}
          >
            No users,try to add...
          </Text>
        )}

        <Animated.FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 8 }}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item: user }) => {
            return (
              <View key={user.id}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                    marginVertical: 12,
                    padding: 12,
                    backgroundColor: "rgba(0,0,0,0.1)"
                  }}
                >
                  <View
                    style={{
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={{ uri: user.avatarUri }}
                      style={{
                        width: 80,
                        aspectRatio: 1,
                        resizeMode: "cover",
                        borderRadius: 80
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 4
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600"
                        }}
                      >
                        {user.name}
                      </Text>
                      <View
                        style={{
                          borderRadius: 12,
                          paddingVertical: 2,
                          paddingHorizontal: 4,
                          backgroundColor:
                            user.role === "user" ? "purple" : "green"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#fff",
                            textAlign: "center"
                          }}
                        >
                          {user.role}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Button
                      title="Delete user"
                      color={"red"}
                      onPress={async () => {
                        await prismaClient.user.delete({
                          where: {
                            id: user.id
                          }
                        });

                        invalidatePostsCount();
                      }}
                    />
                    <Button
                      title="Create post"
                      color={"blue"}
                      onPress={async () => {
                        await prismaClient.post.create({
                          data: {
                            title: faker.lorem.words(3),
                            content: faker.lorem.sentences({
                              min: 2,
                              max: 8
                            }),
                            authorId: user.id,
                            published: faker.datatype.boolean()
                          }
                        });
                        invalidatePostsCount();
                      }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500"
                  }}
                >
                  Written Posts ({user._count.posts})
                </Text>
                <View style={{ marginVertical: 8, gap: 2 }}>
                  {user.posts.map((post) => {
                    return (
                      <Animated.View
                        key={post.id}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                        entering={FadeInUp}
                        exiting={FadeOutUp}
                        layout={LinearTransition.duration(300)}
                      >
                        <Text>
                          <Text style={{ fontSize: 10 }}>
                            {post.published ? "✅" : "❌"}
                          </Text>{" "}
                          {post.title}
                        </Text>

                        <Button
                          title="delete post"
                          color={"red"}
                          onPress={async () => {
                            await prismaClient.post.delete({
                              where: {
                                id: post.id
                              }
                            });

                            invalidatePostsCount();
                          }}
                        />
                      </Animated.View>
                    );
                  })}
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

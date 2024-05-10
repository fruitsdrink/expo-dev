import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";

import { MarkdownDisplay } from "@/components";
import { fonts } from "@/constants";

const template = `# 🎉 Fun with Markdown!

## 🚀 Introduction
Welcome to this **fun and exciting** markdown guide! Let's dive into the world of Markdown and discover how it makes text formatting cool and easy!

## 🎈 Basics: Add Some Flair

- **Bold and Beautiful:** Make your text stand out! Use \`**\` or \`__\`. Example: **Look at me!**
- *Sassy Italics:* Add a slant with \`*\` or \`_\`. Example: *I'm leaning!*

### 🍔 Let's List Some Fun Things!

1. 🌟 Star gazing
2. 🏖 Beach parties
3. 🍕 Pizza nights

- 🎮 Video games
- 📚 Reading a good book
- 🧘 Yoga time

## 🌈 Advanced Fun

### 🖼 Adding Images and Links

A cute pic: 

![Cute Cat](https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/6.jpg)

Visit a fun site: [Fun Site](https://example.com)

### 🎶 Code Block Party

\`\`\`javascript
// JavaScript party trick
function partyTime() {
    console.log("Let's dance 💃🕺!");
}
\`\`\`

## 🎤 Conclusion
Markdown is not just for formatting; it's for having fun while expressing yourself! Keep exploring and enjoy the markdown party! 🎊

> Enjoy crafting your own fun markdown documents! 🎨🎉
`;

export default function EditorScreen() {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState("edit");

  return (
    <>
      <Stack.Screen options={{ title: "Editor" }} />

      <ScrollView
        style={styles.page}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, tab === "edit" ? styles.tabActive : undefined]}
            onPress={() => setTab("edit")}
          >
            <Text
              style={[
                styles.tabText,
                tab === "edit" ? styles.tabTextActive : undefined,
              ]}
            >
              Edit
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              tab === "preview" ? styles.tabActive : undefined,
            ]}
            onPress={() => setTab("preview")}
          >
            <Text
              style={[
                styles.tabText,
                tab === "preview" ? styles.tabTextActive : undefined,
              ]}
            >
              Preview
            </Text>
          </Pressable>
        </View>

        {tab === "edit" ? (
          <TextInput
            value={content}
            multiline
            style={styles.input}
            onChangeText={setContent}
          />
        ) : (
          <MarkdownDisplay
            style={{
              heading1: {
                color: "#ff0000",
              },
            }}
          >
            {content}
          </MarkdownDisplay>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "red",
    borderWidth: 0,
  },
  tabText: {
    fontFamily: fonts.InterBold,
  },
  tabTextActive: {
    color: "white",
  },
  input: {
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: 20,
    fontSize: 14,
  },
});

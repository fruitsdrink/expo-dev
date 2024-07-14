import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import * as ContextMenu from "zeego/context-menu";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ItemProps = React.ComponentProps<(typeof DropdownMenu)["Item"]>;
const GalacticMenuItem = DropdownMenu.create((props: ItemProps) => {
  return <DropdownMenu.Item {...props} />;
}, "Item");

type DropDonwMenuProps = {
  items: Array<{
    key: string;
    title: string;
    icon: string;
    iconAndroid?: string;
  }>;
  onSelect: (key: string) => void;
};
const DropDownMenu: React.FC<DropDonwMenuProps> = ({ items, onSelect }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ionicons name="ellipsis-horizontal" size={24} />
      </DropdownMenu.Trigger>
      {/* @ts-ignore */}
      <DropdownMenu.Content>
        <DropdownMenu.Label>Label1</DropdownMenu.Label>
        <DropdownMenu.Item key="42">
          <DropdownMenu.ItemTitle>imtem 1</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.key}
              onSelect={() => onSelect(item.key)}
            >
              <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon
                ios={{ name: item.icon, pointSize: 18 }}
                androidIconName={item.iconAndroid}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <GalacticMenuItem key={"43"}>
            <DropdownMenu.ItemTitle>Custom Menu Item</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle>subtitle</DropdownMenu.ItemSubtitle>
          </GalacticMenuItem>
          <DropdownMenu.CheckboxItem
            key="43"
            value="on"
            onValueChange={(next, previous) => {
              console.log(next, previous);
            }}
          >
            <DropdownMenu.ItemTitle>You like Galaxies?</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const ImageWithContext = () => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Pressable>
          <Image
            source={{ uri: "https://picsum.photos/800" }}
            style={{ height: 300 }}
          />
        </Pressable>
      </ContextMenu.Trigger>
      {/* @ts-ignore */}
      <ContextMenu.Content>
        <ContextMenu.Preview>
          <View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white" }}>Context Menu</Text>
          </View>
        </ContextMenu.Preview>
        <ContextMenu.Item key="c1">
          <ContextMenu.ItemTitle>Item 1</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export default function DemoScreen() {
  const handleDropdownTriggerPress = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "home",
          headerRight: () => (
            <DropDownMenu
              items={[
                {
                  key: "1",
                  title: "About the app",
                  icon: "info.circle",
                  iconAndroid: "ic_dialog_info"
                },
                {
                  key: "2",
                  title: "FAQ",
                  icon: "questionmark.circle",
                  iconAndroid: "btn_star"
                }
              ]}
              onSelect={handleDropdownTriggerPress}
            />
          )
        }}
      />
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageWithContext />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

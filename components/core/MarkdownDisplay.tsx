import React, { PropsWithChildren } from "react";
import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";

interface Props extends PropsWithChildren {
  style?: StyleSheet.NamedStyles<any>;
}
export const MarkdownDisplay: React.FC<Props> = ({ children, style }) => {
  return (
    <Markdown
      style={{
        ...markdonwStyles,
        ...style,
      }}
    >
      {children}
    </Markdown>
  );
};

const markdonwStyles = StyleSheet.create({
  heading1: {
    fontSize: 22,
    marginVertical: 10,
  },
  heading2: {
    fontSize: 20,
    marginVertical: 10,
  },
  heading3: {
    fontSize: 18,
    marginVertical: 10,
  },
  heading4: {
    fontSize: 16,
    marginVertical: 10,
  },
  heading5: {
    fontSize: 14,
    marginVertical: 10,
  },
  heading6: {
    fontSize: 12,
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    // fontFamily: fonts.Inter,
  },
});

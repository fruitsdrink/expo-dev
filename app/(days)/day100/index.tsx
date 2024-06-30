import { DayHome } from "@/components";

const desc = `
# How to add a Custom Font Icon to your React Native and Expo project

[youtube](https://youtu.be/thON0Os6MJg)

## 技术点
- 自定义图标

## pageckage
安装包
\`\`\`
yarn add -D react-native-vector-icons 
\`\`\`

下载图标字体的css文件和ttf文件到资源目录，使用下面命令生成js文件
https://github.com/amitjakhu/dripicons

\`\`\`
./node_modules/.bin/generate-icon assets/dripicons/webfont.css --prefix=".dripicons-" --componentName=DripIcons --fontFamily=DripIcons > ./DripIcons.js
\`\`\` 

修改生成的js文件
\`\`\`
import {createIconSet} from '@expo/vector-icons';  

const iconSet = createIconSet(glyphMap, "DripIcons");
\`\`\`

在入口文件中异步加载字体文件
`;

import { useEffect, useState } from "react";

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day100/demo"
        }
      ]}
    />
  );
}

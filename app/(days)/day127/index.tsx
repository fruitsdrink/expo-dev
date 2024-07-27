import { DayHome } from "@/components";

const desc = `
# https://youtu.be/nEntsYyCbLM?si=DEuZ1uFNn434v6CP

[youtube](https://youtu.be/nEntsYyCbLM?si=DEuZ1uFNn434v6CP)

## 技术点

图片来源 https://www.vw.com/en/models.html 
脚本
\`\`\`js
[...document.querySelectorAll('li[data-testid=cartile]')].map(item => {
    const img = item.querySelector('img')
    return {
        image: img.src,
        model: item.querySelector('h3').innerText,
        description: ''
    }
})
\`\`\`
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day127/demo"
        }
      ]}
    />
  );
}

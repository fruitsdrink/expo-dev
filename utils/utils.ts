export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getRandomColorByHsl = () => {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
};

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

// eslint-disable-next-line import/prefer-default-export
export const linearGradient = (angle: string, ...colors: string[]): string => {
  if (colors.length < 2) {
    throw new Error('At least two colors are required for a gradient!');
  }

  const step = Math.round(1000 / (colors.length - 1)) / 10;
  const parts = colors
    .slice(0, -1)
    .map((color, index) => `${color} ${index * step}%`)
    .join(', ');

  return `linear-gradient(${angle}, ${parts}, ${colors[colors.length - 1]} 100%)`;
};

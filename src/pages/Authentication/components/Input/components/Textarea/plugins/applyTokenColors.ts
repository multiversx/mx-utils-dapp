import { Element } from 'hast';
import { TokenColorsEnum } from 'pages/Authentication/enum';

const colors = [
  TokenColorsEnum.address,
  TokenColorsEnum.default, // Dot
  TokenColorsEnum.body,
  TokenColorsEnum.default, // Dot
  TokenColorsEnum.signature
];

export const applyTokenColors = () => {
  return (tree: Element) => {
    const children = tree.children as Element[];

    if (!children) return;

    for (const child of children) {
      if (child.tagName === 'pre' && child.properties) {
        const code = child.children[0] as Element;
        if (!code) return;

        const tokensContainer = code.children[0] as Element;
        if (!tokensContainer) return;

        const tokens = tokensContainer.children as Element[];
        if (!tokens) return;

        tokens.forEach((token, index) => {
          if (
            token.tagName === 'span' &&
            token.properties?.className &&
            (token.properties?.className as string)?.includes('token')
          ) {
            token.properties.style = `color: ${
              colors[index] ?? TokenColorsEnum.default
            }`;
          }
        });
        return;
      }
    }
  };
};

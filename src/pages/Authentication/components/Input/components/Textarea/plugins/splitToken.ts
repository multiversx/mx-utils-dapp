import { Element, Literal } from 'hast';

export const splitToken = () => {
  return (tree: Element) => {
    tree.properties = {
      style: 'word-break: break-all;'
    };

    const children = tree.children as Element[];

    if (!children) return;

    for (const child of children) {
      if (child.tagName === 'pre' && child.properties) {
        const code = child.children[0] as Element;
        if (!code || !code.children || code.children.length === 0) return;

        const token = (code.children[0] as Literal).value;
        if (!token) return;

        const parts = token.split('.');
        const words = parts.reduce(
          (total: string[], word: string, index: number) => {
            if (parts.length - 1 === index) {
              return total.concat([word]);
            }

            return total.concat([word, '.']);
          },
          []
        );

        const wordsElements = words.map((part, index) => {
          return {
            type: 'element',
            tagName: 'span',
            properties: {
              className: `token part-${index}`
            },
            children: [
              {
                type: 'text',
                value: part
              }
            ]
          } as Element;
        });

        code.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: `code-line`
            },
            children: [...wordsElements]
          } as Element
        ];
        return;
      }
    }
  };
};

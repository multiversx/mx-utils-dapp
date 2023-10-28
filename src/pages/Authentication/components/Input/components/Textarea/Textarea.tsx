import { useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { TokenColorsEnum } from 'pages/Authentication/enum';
import styles from './styles.module.scss';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { FormValuesType } from '../../types';
import { useTokenActions } from '../../hooks/useTokenActions';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import CodeEditor from '@uiw/react-textarea-code-editor';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite from 'rehype-rewrite';
import { Element } from 'hast';

export const Textarea = () => {
  const { handleInput, handleChange, moveCursorToEnd } = useTokenActions();

  const nativeAuthToken = useGetNativeAuthToken();
  const { values } = useFormikContext<FormValuesType>();

  const colors = [
    TokenColorsEnum.address,
    TokenColorsEnum.default, // Dot
    TokenColorsEnum.body,
    TokenColorsEnum.default, // Dot
    TokenColorsEnum.signature
  ];

  useEffect(() => {
    if (nativeAuthToken) {
      handleChange(nativeAuthToken);
    }
  }, [handleChange, moveCursorToEnd, nativeAuthToken]);

  return (
    <div className={styles.textarea}>
      <Field component='textarea' name='token' className={styles.field} />

      <CodeEditor
        className={styles.clone}
        value={values.token}
        language='js'
        onChange={handleChange}
        onInput={handleInput}
        padding={15}
        style={{
          fontSize: 18,
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
        }}
        rehypePlugins={[
          [rehypePrism, { ignoreMissing: true }],
          [
            // Unfortunately, we have to use @ts-ignore and some casts here because the type definitions for rehype-rewrite are wrong
            // @ts-ignore
            rehypeRewrite,
            {
              rewrite: (node: Element) => {
                if (
                  (node.properties?.className as string)?.includes('code-line')
                ) {
                  const children = node.children as Element[];

                  children.forEach((child: Element, i: number) => {
                    if (
                      child.tagName === 'span' &&
                      child.properties?.className &&
                      (child.properties?.className as string)?.includes('token')
                    ) {
                      child.properties.className = 'token';
                      child.properties.style = `color: ${
                        colors[i] ?? TokenColorsEnum.default
                      }`;
                    }
                  });
                }
              }
            }
          ]
        ]}
      />

      <div className={styles.buttons}>
        <CopyButton text={values.token} className={styles.copy} />
      </div>
    </div>
  );
};

import { useEffect, useMemo, useRef } from 'react';
import { Field, useFormikContext } from 'formik';
import classNames from 'classnames';
import { TokenColorsEnum } from 'pages/Authentication/enum';
import type { TextareaDivisionType } from './types';
import styles from './styles.module.scss';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { FormValuesType } from '../../types';
import { useTokenActions } from '../../hooks/useTokenActions';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';

const DEFAULT_COLOR = '#000000';

export const Textarea = () => {
  const {
    handleInput,
    handleChange,
    handleKeyDown,
    handlePaste,
    handlePreventDefault
  } = useTokenActions();

  const nativeAuthToken = useGetNativeAuthToken();
  const { values, setFieldValue } = useFormikContext<FormValuesType>();

  const clone = useRef<HTMLDivElement>(null);

  const mirror = useMemo(() => {
    const parts = values.token.split('.');
    const colors = Object.values(TokenColorsEnum);

    const words = parts.reduce(
      (total: TextareaDivisionType[], word: string, index: number) => {
        const part: TextareaDivisionType = {
          color: colors[index] ? colors[index] : DEFAULT_COLOR,
          text: word
        };

        const dot: TextareaDivisionType = {
          color: DEFAULT_COLOR,
          text: '.'
        };

        if (parts.length - 1 === index) {
          return total.concat([part]);
        }

        return total.concat([part, dot]);
      },
      []
    );

    return words;
  }, [values.token]);

  useEffect(() => {
    const token = nativeAuthToken;

    if (token) {
      handleChange(token);
    }
  }, [setFieldValue, handleChange, nativeAuthToken]);

  /*
   * Return the rendered component.
   */

  return (
    <div className={styles.textarea}>
      <Field
        component='textarea'
        name='token'
        onInput={handleInput}
        onChange={handleChange}
        className={classNames(styles.field, {
          [styles.large]: Boolean(nativeAuthToken)
        })}
      />

      <div
        className={styles.clone}
        ref={clone}
        contentEditable='true'
        suppressContentEditableWarning={true}
        onChange={handlePreventDefault}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      >
        <div className={styles.mirror}>
          {mirror.map((word: TextareaDivisionType, index: number) => (
            <span
              style={{ color: word.color }}
              className={styles.word}
              key={`word-${word.text}-${index}`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <CopyButton text={values.token} className={styles.copy} />
      </div>
    </div>
  );
};

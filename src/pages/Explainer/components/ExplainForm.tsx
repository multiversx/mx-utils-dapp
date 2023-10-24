import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { object, string } from 'yup';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles.module.scss';
import { AssistantApiSSETypes, assistantApi } from 'helpers/assistantApi';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useChain } from 'hooks/useChain';

export const ExplainForm = () => {
  const [explainerResponse, setExplainerResponse] = useState<string | null>(
    null
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const { chain } = useChain();

  const initialValues = { repositoryUrl: '' };

  const handleEventSourceError = useCallback(() => {
    eventSource?.close();
    setShowLoader(false);
    setErrorMessage(
      'Explainer encountered an unknown error. Please try again.'
    );
  }, [eventSource]);

  const handleCodeExplanationStreamFailed = useCallback(
    (event: MessageEvent) => {
      eventSource?.close();
      setErrorMessage(event.data);
      setShowLoader(false);
      setExplainerResponse(null);
    },
    [eventSource]
  );

  const handleCodeExplanationStreamChunk = useCallback(
    (event: MessageEvent) => {
      setExplainerResponse((prevResponse) => {
        return prevResponse === null ? event.data : prevResponse + event.data;
      });
    },
    []
  );

  const handleCodeExplanationStreamFinished = useCallback(() => {
    eventSource?.close();
    setShowLoader(false);
  }, [eventSource]);

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener(
        AssistantApiSSETypes.error,
        handleEventSourceError
      );
      eventSource.addEventListener(
        AssistantApiSSETypes.codeExplanation.streamFailed,
        handleCodeExplanationStreamFailed
      );
      eventSource.addEventListener(
        AssistantApiSSETypes.codeExplanation.streamChunk,
        handleCodeExplanationStreamChunk
      );
      eventSource.addEventListener(
        AssistantApiSSETypes.codeExplanation.chunkFinished,
        handleCodeExplanationStreamFinished
      );
    }

    return () => {
      if (eventSource) {
        eventSource.removeEventListener(
          AssistantApiSSETypes.error,
          handleEventSourceError
        );
        eventSource.removeEventListener(
          AssistantApiSSETypes.codeExplanation.streamFailed,
          handleCodeExplanationStreamFailed
        );
        eventSource.removeEventListener(
          AssistantApiSSETypes.codeExplanation.streamChunk,
          handleCodeExplanationStreamChunk
        );
        eventSource.removeEventListener(
          AssistantApiSSETypes.codeExplanation.chunkFinished,
          handleCodeExplanationStreamFinished
        );
      }
    };
  }, [
    eventSource,
    handleCodeExplanationStreamChunk,
    handleCodeExplanationStreamFailed,
    handleCodeExplanationStreamFinished,
    handleEventSourceError
  ]);

  const onSubmit = ({ repositoryUrl }: { repositoryUrl: string }) => {
    setExplainerResponse(null);
    setShowLoader(true);
    setErrorMessage(null);

    const newEventSource = assistantApi.getCodeExplanationEventSource({
      chain,
      repositoryUrl
    });

    setEventSource(newEventSource);
  };

  const schema = string().required('Required');
  const validationSchema = object().shape({
    repositoryUrl: schema
  });

  const formikProps = {
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          Paste the URL that directly points to the Smart Contract on GitHub
        </h3>

        <Formik {...formikProps}>
          {({ setFieldValue }) => (
            <Form className={styles.sign}>
              <div className={styles.form}>
                <label className={styles.label}>
                  Please provide the complete GitHub URL that directly points to
                  the directory containing your smart contract
                </label>

                <Field
                  name='repositoryUrl'
                  type='text'
                  className={styles.field}
                  autoComplete='off'
                  onChange={(e: ChangeEvent<HTMLFormElement>) => {
                    setFieldValue('repositoryUrl', e.target.value);
                  }}
                />

                <ErrorMessage
                  name='repositoryUrl'
                  className={styles.error}
                  component='div'
                />
                <div className={styles.error}>{errorMessage}</div>
              </div>

              <div className={styles.buttons}>
                <button
                  type='submit'
                  className={classNames(styles.button, styles.active)}
                  disabled={showLoader}
                >
                  Explain
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {(showLoader || explainerResponse) && (
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            Explanation{' '}
            {showLoader && <FontAwesomeIcon icon={faSpinner} spin />}
          </h3>
          {explainerResponse && (
            <div className={styles.explanation}>
              <ReactMarkdown children={explainerResponse} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

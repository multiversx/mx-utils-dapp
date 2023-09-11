import { ErrorMessage, Field, Form, Formik } from 'formik';
import classNames from 'classnames';
import { object, string } from 'yup';

import { useGlobalContext } from 'context';

import styles from '../styles.module.scss';
import { assistantApi } from 'helpers/assistantApi';
import { useState } from 'react';

export const ExplainForm = () => {
    const { theme } = useGlobalContext();
    const [explainerResponse, setExplainerResponse] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const initialValues = { repositoryUrl: '' };

    const onSubmit = ({ repositoryUrl }: { repositoryUrl: string }) => {
        setExplainerResponse(null);
        setShowExplanation(false);
        const eventSource = assistantApi.getExplanationEventSource({ repositoryUrl });

        eventSource.onerror = () => {
            console.log('EventSource failed');
        }

        eventSource.addEventListener('code-explanation-stream-chunk', (event: any) => {
            setShowExplanation(true);
            setExplainerResponse((prevResponse) => {
                return prevResponse === null ? event.data : prevResponse + event.data;
            });
        });

        eventSource.addEventListener('code-explanation-chunk-finished', (event: any) => {
            console.log('EventSource close', event.data);
            eventSource.close();
        });
    }

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
                    Paste in the URL of the smart contract repository
                </h3>

                <Formik {...formikProps}>
                    {({ setFieldValue }) => (
                        <Form className={styles.sign}>
                            <div className={styles.form}>
                                <label className={styles.label}>Repository URL</label>

                                <Field
                                    name='repositoryUrl'
                                    type='text'
                                    className={styles.field}
                                    autoComplete='off'
                                    onChange={(e: any) => {
                                        setFieldValue('repositoryUrl', e.target.value);
                                    }}
                                />

                                <ErrorMessage
                                    name='repositoryUrl'
                                    className={styles.error}
                                    component='div'
                                />
                            </div>

                            <div className={styles.buttons}>
                                <button
                                    type='submit'
                                    className={classNames(styles.button, styles.active, {
                                        [styles.white]: theme === 'light'
                                    })}
                                >
                                    Explain
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {showExplanation && (
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Explanation
                    </h3>
                    <div className={styles.explanation}>
                        {explainerResponse}
                    </div>
                </div>
            )}
        </>
    );
};
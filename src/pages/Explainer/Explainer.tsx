import { Template } from "components/Template";
import { ExplainForm } from "./components";

import styles from "./styles.module.scss";

export const Explainer = () => {
    return (
        <Template>
            <div className={styles.container}>
                <ExplainForm />
            </div>
        </Template>
    );
};
import {Generate} from "pages/Authentication/components/Generate";
import {EnvironmentsEnum} from "@multiversx/sdk-dapp/types";
import {Template} from "components/Template";
import React, {ChangeEvent, useState} from "react";
import {getEnvironmentForChainId} from "@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId";
import {useLocation} from "react-router-dom";
import {useGetNetworkConfig} from "@multiversx/sdk-dapp/hooks";
import styles from './styles.module.scss';
import {useLocalStorage} from "./hooks/useLocalStorage";
import {DeploySection} from "./components/DeploySection";
import {UpgradeSection} from "./components/UpgradeSection";
import {Environment} from "./components/Environment";

export const SmartContractInteraction = () => {
    const [sessionId, setSessionId] = useLocalStorage('sessionId', '');

    const { search } = useLocation();
    const { network } = useGetNetworkConfig();

    const entries = Object.fromEntries(new URLSearchParams(search));
    const environment = entries.network as EnvironmentsEnum;
    const [chain, setChain] = useState<EnvironmentsEnum>(
        environment || getEnvironmentForChainId(network.chainId)
    );

    const [showProvidersModalForDeploy, setShowProvidersModalForDeploy] = useState(false);
    const [showProvidersModalForUpgrade, setShowProvidersModalForUpgrade] = useState(false);
    const [enableDeploySection, setEnableDeploySection] = useState(false);
    const [enableUpgradeSection, setEnableUpgradeSection] = useState(false);

    return (
        <Template>
            <Generate
                chain={chain}
                show={showProvidersModalForDeploy}
                setShow={setShowProvidersModalForDeploy}
                callbackAfterLogin={() => setEnableDeploySection(true)}
            />
            <Generate
                chain={chain}
                show={showProvidersModalForUpgrade}
                setShow={setShowProvidersModalForUpgrade}
                callbackAfterLogin={() => setEnableUpgradeSection(true)}
            />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h3 className={styles.title}> Deploy Contract </h3>
                        <Environment
                            chain={chain}
                            setChain={setChain}
                        />
                    </div>
                    <DeploySection isLoggedIn={enableDeploySection} />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h3 className={styles.title}> Upgrade Contract </h3>
                        <Environment
                            chain={chain}
                            setChain={setChain}
                        />
                    </div>
                    <UpgradeSection isLoggedIn={enableUpgradeSection} />
                </div>
            </div>
        </Template>
    )
}
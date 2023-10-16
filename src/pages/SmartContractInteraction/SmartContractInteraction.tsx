import {EnvironmentsEnum} from "@multiversx/sdk-dapp/types";
import {Template} from "components/Template";
import React, {useState} from "react";
import {getEnvironmentForChainId} from "@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId";
import {useLocation} from "react-router-dom";
import {useGetNetworkConfig} from "@multiversx/sdk-dapp/hooks";
import styles from './styles.module.scss';
import {DeploySection} from "./components/DeploySection";
import {UpgradeSection} from "./components/UpgradeSection";
import {Environment} from "./components/Environment";

export const SmartContractInteraction = () => {
    const { search } = useLocation();
    const { network } = useGetNetworkConfig();

    const entries = Object.fromEntries(new URLSearchParams(search));
    const environmentDeploy = entries["deploy-env"] as EnvironmentsEnum;
    const environmentUpgrade = entries["upgrade-env"] as EnvironmentsEnum;
    const [deployChain, setDeployChain] = useState<EnvironmentsEnum>(
        environmentDeploy || getEnvironmentForChainId(network.chainId)
    );
    const [upgradeChain, setUpgradeChain] = useState<EnvironmentsEnum>(
        environmentUpgrade || getEnvironmentForChainId(network.chainId)
    );

    return (
        <Template>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h3 className={styles.title}> Deploy Contract </h3>
                        <Environment
                            chain={deployChain}
                            setChain={setDeployChain}
                            networkKey={"deploy-env"}
                        />
                    </div>
                    <DeploySection chain={deployChain} />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h3 className={styles.title}> Upgrade Contract </h3>
                        <Environment
                            chain={upgradeChain}
                            setChain={setUpgradeChain}
                            networkKey={"upgrade-env"}
                        />
                    </div>
                    <UpgradeSection chain={upgradeChain} />
                </div>
            </div>
        </Template>
    )
}
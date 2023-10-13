import {Generate} from "pages/Authentication/components/Generate";
import {EnvironmentsEnum} from "@multiversx/sdk-dapp/types";
import styles from "./styles.module.scss";
import {Template} from "components/Template";
import React, {useState} from "react";
import {getEnvironmentForChainId} from "@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId";
import {useLocation} from "react-router-dom";
import {useGetNetworkConfig} from "@multiversx/sdk-dapp/hooks";
import {logout} from "@multiversx/sdk-dapp/utils/logout";

export const SmartContractInteraction = () => {
    const { search } = useLocation();
    const { network } = useGetNetworkConfig();

    const entries = Object.fromEntries(new URLSearchParams(search));
    const environment = entries.network as EnvironmentsEnum;
    const [chain, setChain] = useState<EnvironmentsEnum>(
        environment || getEnvironmentForChainId(network.chainId)

    );

    const [showProvidersModal, setShowProvidersModal] = useState(false);
    const [enableDeploySection, setEnableDeploySection] = useState(false);
    const [enableUpgradeSection, setEnableUpgradeSection] = useState(false);

    const handleAfterLogin = async () => {
        setEnableDeploySection(true);
        setEnableUpgradeSection(true);
    };

    return (
        <Template>
            <Generate
                chain={chain}
                show={showProvidersModal}
                setShow={setShowProvidersModal}
                callbackAfterLogin={handleAfterLogin}
            />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <div aria-disabled={!enableDeploySection}>Deploy section</div>
                    <div aria-disabled={!enableUpgradeSection}>Upgrade section</div>
                </div>
            </div>
        </Template>
    )
}
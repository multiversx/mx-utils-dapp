import styles from "../styles.module.scss";
import {Trim} from "@multiversx/sdk-dapp/UI";
import {CopyButton} from "@multiversx/sdk-dapp/UI/CopyButton";
import React, {useEffect, useState} from "react";
import useUploadWasmCode from "../hooks/useUploadWasmCode";
import {useGetDeployedContractAddress} from "../hooks/useGetDeployedContractAddress";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {DeployOrUpgradeParamsType} from "../types/deployOrUpgradeParams";
import {useDeployments} from "../hooks/useDeployments";
import {useGetAccount, useGetIsLoggedIn} from "@multiversx/sdk-dapp/hooks";
import {Generate} from "./Generate";
import {EnvironmentsEnum} from "@multiversx/sdk-dapp/types";

export const UpgradeSection = ({ chain }: { chain: EnvironmentsEnum }) => {
    const [sessionId, setSessionId] = useLocalStorage('upgradeSessionId', '');
    const [showProvidersModal, setShowProvidersModal] = useState(false);
    const [upgradeContractAddress, setUpgradeContractAddress] = useState<string>('');

    const isLoggedIn = useGetIsLoggedIn();
    const {address} = useGetAccount();

    const { wasmCode, onUpload } = useUploadWasmCode();
    const {contractOrDeployerAddress} = useGetDeployedContractAddress(sessionId)
    const { upgrade } = useDeployments();

    const handleUpgrade = async () => {
        if (!wasmCode || !isLoggedIn || !Boolean(address)) {
            return;
        }

        const params: DeployOrUpgradeParamsType = {
            code: wasmCode,
            args: [],
            gasLimit: 60000000,
            address: upgradeContractAddress
        }

        const response = await upgrade(params);
        setSessionId(response.sessionId ?? '');
    };

    useEffect(() => {
        if (isLoggedIn && Boolean(address)) {
            handleUpgrade();
        }
    }, [isLoggedIn, address]);

    return (
        <>
            <Generate
                chain={chain}
                show={showProvidersModal}
                setShow={setShowProvidersModal}
            />
            <div className={styles.smartcontract}>
                <div className={styles.form}>
                    <div className={styles.upload}>
                        <label htmlFor="upgrade_file_input" className={styles.label}>Upload .wasm file</label>
                        <input
                            onChange={onUpload}
                            className={styles.field} id="upgrade_file_input" type="file" accept=".wasm"
                            disabled={!isLoggedIn}
                        />
                    </div>
                    <div className={styles.upload}>
                        <label htmlFor="contract_address" className={styles.label}>Contract Address</label>
                        <input
                            id="contract_address"
                            type='text'
                            className={styles.field}
                            autoComplete='off'
                            value={upgradeContractAddress}
                            disabled={!isLoggedIn}
                            onChange={(e) => setUpgradeContractAddress(e.target.value)}
                        />
                    </div>
                    {
                        !upgradeContractAddress && (
                            <div className={styles.error}>
                                <span>Contract address is required</span>
                            </div>
                        )
                    }

                    <div className={styles.buttons}>
                        <button onClick={() => isLoggedIn ? handleUpgrade() : setShowProvidersModal(true)} className={styles.button} disabled={!wasmCode || !upgradeContractAddress}>Upgrade</button>
                    </div>
                    <textarea
                        rows={10}
                        className={styles.field}
                        placeholder=".wasm code will be displayed here..."
                        value={wasmCode?.toString()}
                    />
                    {
                        contractOrDeployerAddress && (
                            <div className={styles.result}>
                                <strong>Deployer Address:</strong>
                                <Trim className={styles.value} text={contractOrDeployerAddress}/>
                                <CopyButton text={contractOrDeployerAddress} className={styles.copy} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
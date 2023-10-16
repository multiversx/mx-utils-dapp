import styles from "../styles.module.scss";
import {Trim} from "@multiversx/sdk-dapp/UI";
import {CopyButton} from "@multiversx/sdk-dapp/UI/CopyButton";
import React from "react";
import useUploadWasmCode from "../hooks/useUploadWasmCode";
import {useDeployments} from "../hooks/useDeployments";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {DeployOrUpgradeParamsType} from "../types/deployOrUpgradeParams";
import {useGetDeployedContractAddress} from "../hooks/useGetDeployedContractAddress";

export const DeploySection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [sessionId, setSessionId] = useLocalStorage('deploySessionId', '');

    const { wasmCode, onUpload } = useUploadWasmCode();
    const { contractOrDeployerAddress} = useGetDeployedContractAddress(sessionId)
    const { deploy } = useDeployments();

    const handleDeploy = async () => {
        if (!wasmCode) {
            return;
        }

        const params: DeployOrUpgradeParamsType = {
            code: wasmCode,
            args: [],
            gasLimit: 60000000,
        }

        const response = await deploy(params);
        setSessionId(response.sessionId ?? '');
    }

    return (
        <div className={styles.smartcontract}>
            <div className={styles.form}>
                <div className={styles.upload}>
                    <label htmlFor="deploy_file_input" className={styles.label}>Upload .wasm file</label>
                    <input
                        onChange={onUpload}
                        className={styles.field} id="deploy_file_input" type="file" accept=".wasm"
                        disabled={!isLoggedIn}
                    />
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleDeploy} className={styles.button} disabled={!wasmCode || !isLoggedIn}>Deploy</button>
                </div>
                <textarea
                    rows={10}
                    className={styles.field}
                    placeholder=".wasm code will be displayed here..."
                    value={wasmCode?.toString()}
                    readOnly={true}
                />
                {
                    contractOrDeployerAddress && (
                        <div className={styles.result}>
                            <strong>Contract Address:</strong>
                            <Trim className={styles.value} text={contractOrDeployerAddress}/>
                            <CopyButton text={contractOrDeployerAddress} className={styles.copy} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
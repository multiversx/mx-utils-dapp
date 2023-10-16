import {
    Address,
    CodeMetadata,
    SmartContract,
    TokenTransfer, Transaction,
} from '@multiversx/sdk-core/out';
import {getChainID, refreshAccount} from "@multiversx/sdk-dapp/utils";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {useGetAccountInfo} from "@multiversx/sdk-dapp/hooks";
import {DeployOrUpgradeParamsType} from "../types/deployOrUpgradeParams";

export const useDeployments = () => {
    const {account} = useGetAccountInfo();

    const sendTransaction = async (transaction: Transaction, operation: "deploy" | "upgrade") => {
        try {
            await refreshAccount();
            const { sessionId, error } = await sendTransactions({
                transactions: transaction.toPlainObject(),
                transactionsDisplayInfo: {
                    processingMessage: `Processing ${operation}`,
                    errorMessage: `An error has occurred during ${operation}`,
                    successMessage: `${operation} successful`
                },
                redirectAfterSign: false,
                minGasLimit: '25000000'
            });

            return { success: error !== undefined, error: error ?? '', sessionId };
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message, sessionId: null };
        }
    }

    const deploy = async (
        {
            code,
            args,
            gasLimit = 55000000,
            upgradeable,
            readable,
            payable,
            payableBySc
        }: DeployOrUpgradeParamsType
    )=> {
        try {
            const codeMetadata = new CodeMetadata(
                upgradeable ?? true,
                readable ?? true,
                payable ?? false,
                payableBySc ?? true
            );

            // No need to pass the address if you want to deploy a new smart contract
            const smartContract = new SmartContract();

            const transaction = smartContract.deploy({
                // !!! Attention !!! the deployer address is the address of the logged in user
                deployer: Address.fromString(account.address),
                code,
                gasLimit: gasLimit,
                codeMetadata,
                initArguments: args,
                value: TokenTransfer.egldFromAmount(0),
                chainID: getChainID(),
            });

            return sendTransaction(transaction, "deploy");
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message, sessionId: null };
        }
    };

    const upgrade = async (
        {
            address,
            code,
            args,
            gasLimit = 55000000,
            upgradeable,
            readable,
            payable,
            payableBySc
        }: DeployOrUpgradeParamsType
    )=> {
        try {
            const codeMetadata = new CodeMetadata(
                upgradeable ?? true,
                readable ?? true,
                payable ?? false,
                payableBySc ?? true
            );

            const smartContract = new SmartContract({
                // This is the smart contract address that you want to upgrade
                address: address ? new Address(address) : undefined
            });

            const transaction = smartContract.upgrade({
                // !!! Attention !!! the caller address is the address of the logged in user
                caller: Address.fromString(account.address),
                code,
                gasLimit: gasLimit,
                codeMetadata,
                initArguments: args,
                value: TokenTransfer.egldFromAmount(0),
                chainID: getChainID(),
            });

            return sendTransaction(transaction, "upgrade");
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message, sessionId: null };
        }
    };

    return {
        deploy,
        upgrade
    }
}
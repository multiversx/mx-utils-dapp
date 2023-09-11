import { explainerApiUrl } from "config";

interface GetExplanationType {
    repositoryUrl: string;
}

export const assistantApi = {
    getExplanationEventSource: (parameters: GetExplanationType) => {
        const { repositoryUrl } = parameters;

        return new EventSource(
            `${explainerApiUrl}/utils/smart_contract_explanation/?repository_url=${repositoryUrl}`
        );
    },
};

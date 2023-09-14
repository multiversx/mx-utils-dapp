import { explainerApiUrl } from "config";

export interface GetExplanationEventSourceParameters {
    repositoryUrl: string;
}

export const AssistantApiSSETypes = {
    error: "error",
    codeExplanation: {
        streamChunk: "code-explanation-stream-chunk",
        chunkFinished: "code-explanation-chunk-finished",
        streamFailed: "code-explanation-stream-failed",
    },
}

const AssistantApiEndpoints = {
    utils: {
        smartContractExplanation: "/utils/smart_contract_explanation/",
    },
}

export const assistantApi = {
    getCodeExplanationEventSource: (parameters: GetExplanationEventSourceParameters) => {
        const { repositoryUrl } = parameters;
        const getExplanationEndpointUrl = `${explainerApiUrl}${AssistantApiEndpoints.utils.smartContractExplanation}`;

        return new EventSource(
            `${getExplanationEndpointUrl}?repository_url=${repositoryUrl}`
        );
    },
};

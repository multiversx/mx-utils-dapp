import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { ApiBaseUrls, explainerApiUrl } from 'config';

export interface GetExplanationEventSourceParameters {
  chain: EnvironmentsEnum;
  repositoryUrl: string;
}

export const AssistantApiSSETypes = {
  error: 'error',
  codeExplanation: {
    streamChunk: 'code-explanation-stream-chunk',
    chunkFinished: 'code-explanation-chunk-finished',
    streamFailed: 'code-explanation-stream-failed',
  },
};

const AssistantApiEndpoints = {
  utils: {
    smartContractExplanation: '/utils/smart_contract_explanation/',
  },
};

const getBaseAssistantApiUrl = (chain: EnvironmentsEnum) => {
  // temporarily use only devnet until mainnet and testnet issues are fixed
  switch (chain) {
    case EnvironmentsEnum.mainnet:
      return ApiBaseUrls.devnet;
    // return ApiBaseUrls.mainnet;
    case EnvironmentsEnum.devnet:
      return ApiBaseUrls.devnet;
    case EnvironmentsEnum.testnet:
      return ApiBaseUrls.devnet;
    // return ApiBaseUrls.testnet;
    default:
      return ApiBaseUrls.devnet;
  }
};

export const assistantApi = {
  getCodeExplanationEventSource: (
    parameters: GetExplanationEventSourceParameters,
  ) => {
    const { repositoryUrl } = parameters;
    const getExplanationEndpointUrl = `${getBaseAssistantApiUrl(
      parameters.chain,
    )}${explainerApiUrl}${
      AssistantApiEndpoints.utils.smartContractExplanation
    }`;

    return new EventSource(
      `${getExplanationEndpointUrl}?repository_url=${repositoryUrl}`,
    );
  },
};

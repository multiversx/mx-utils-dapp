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
  // temporarily use only devnet until mainnet issues are fixed
  return ApiBaseUrls.devnet;
  // switch (chain) {
  //   case EnvironmentsEnum.mainnet:
  //     return ApiBaseUrls.mainnet;
  //   case EnvironmentsEnum.devnet:
  //     return ApiBaseUrls.devnet;
  //   case EnvironmentsEnum.testnet:
  //     return ApiBaseUrls.testnet;
  //   default:
  //     return ApiBaseUrls.mainnet;
  // }
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

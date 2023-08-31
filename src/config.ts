const ETHEREUM_MAINNET_CHAIN_ID = 1;
const ETHEREUM_GOERLI_CHAIN_ID = 5;

export type AstariaSDKConfig = {
  apiBaseURL: string;
  chainId?:
    | typeof ETHEREUM_MAINNET_CHAIN_ID
    | typeof ETHEREUM_GOERLI_CHAIN_ID
    | undefined;
};

export const defaultConfig: AstariaSDKConfig = {
  apiBaseURL: 'https://api.astaria.xyz',
  chainId: ETHEREUM_MAINNET_CHAIN_ID,
};

export let config: AstariaSDKConfig = defaultConfig;
export function setConfig(externalConfig: AstariaSDKConfig) {
  config = {
    ...defaultConfig,
    ...externalConfig,
  };
}

export function getConfig() {
  return config;
}

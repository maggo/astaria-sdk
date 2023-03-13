export type AstariaSDKConfig = {
  apiBaseURL: string
  chainId?: 1 | 5 | undefined
}

export const defaultConfig: AstariaSDKConfig = {
  apiBaseURL: 'https://api.astaria.xyz',
  chainId: 1,
}

export let config: AstariaSDKConfig = defaultConfig
export function setConfig(externalConfig: AstariaSDKConfig) {
  config = {
    ...defaultConfig,
    ...externalConfig,
  }
}

export function getConfig() {
  return config
}

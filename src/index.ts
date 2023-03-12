export * from './strategy/StrategyTree'
export * from './strategy/utils'
export * from './router/utils'
export * from './router/helpers'
export * from './router/OfferRouter'
export * from './router/VirtualOffer'
export * from './contracts'
export * from './types/index'
export * from './types/helpers'

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

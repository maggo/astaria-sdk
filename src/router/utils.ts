import axios from 'axios'
import { BigNumber, Contract, providers } from 'ethers'

import { getConfig } from '../config'
import { PublicVault__factory } from '../contracts'
import { DynamicVaultDetail, UniqueOffer, UniqueOfferSchema } from '../types'

const erc20ABI = ['function balanceOf(address owner) view returns (uint256)']
const delegateSlot =
  '64087733366974723411707063388914794318223364521412084348099117505707875036179'

export const getDynamicVaultDetail = async (
  address: string,
  provider: providers.Provider
): Promise<DynamicVaultDetail> => {
  const vault = PublicVault__factory.connect(address, provider)

  const [
    delegate,
    nonce,
    timeToEpochEnd,
    withdrawReserve,
    isShutdown,
    balance,
  ] = await Promise.all([
    provider
      .getStorageAt(address, BigNumber.from(delegateSlot))
      .then(
        (result: string) => result.substring(0, 2) + result.substring(4, 44)
      ),
    vault.getStrategistNonce(),
    vault['timeToEpochEnd()'](),
    vault.getWithdrawReserve(),
    vault.getShutdown(),
    vault.asset().then((asset) => {
      const token = new Contract(asset, erc20ABI, provider)
      return token.balanceOf(address)
    }),
  ])

  const dynamicVaultDetail: DynamicVaultDetail = {
    address,
    delegate,
    nonce,
    balance: balance.sub(withdrawReserve),
    isReadyState:
      balance.sub(withdrawReserve).gt(BigNumber.from(0)) &&
      timeToEpochEnd.gt(BigNumber.from(0)) &&
      !isShutdown,
  }

  return dynamicVaultDetail
}

export const getUniqueOffersByCollateral = async (
  token: string,
  id: BigNumber,
  borrower: string,
  limit: number,
  skip: number
): Promise<{ count: number; uniqueOffers: UniqueOffer[] }> => {
  const { apiBaseURL: API_BASE_URL } = getConfig()

  const params = new URLSearchParams({
    limit: '' + limit,
    skip: '' + skip,
    unique: 'true',
  })
  const UNIQUE_OFFER_PATH =
    `offers/${token.toLowerCase()}/${id.toString()}/${borrower}?` +
    params.toString()

  const response = await axios.get(
    [API_BASE_URL, UNIQUE_OFFER_PATH].join('/'),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return {
    count: response?.data?.count,
    uniqueOffers: response?.data?.results?.map((uniqueOffer: any) => {
      return UniqueOfferSchema.parse(uniqueOffer)
    }),
  }
}

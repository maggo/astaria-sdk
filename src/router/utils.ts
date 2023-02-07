import axios from 'axios'
import { BigNumber, Contract, providers } from 'ethers'
import { PublicVault__factory } from '../contracts'
import { DynamicVaultDetail, UniqueOffer, UniqueOfferSchema } from '../types'

const erc20ABI = ['function balanceOf(address owner) view returns (uint256)']
export const getDynamicVaultDetail = async (
  address: string,
  provider: providers.Provider
): Promise<DynamicVaultDetail> => {
  let dynamicVaultDetail: any = {
    address: address,
  }
  let promises: Promise<any>[] = []

  promises.push(
    provider
      .getStorageAt(
        address,
        BigNumber.from(
          '64087733366974723411707063388914794318223364521412084348099117505707875036179'
        )
      )
      .then(
        (result: string) => result.substring(0, 2) + result.substring(4, 44)
      )
      .then((result: string) => (dynamicVaultDetail.delegate = result))
  )

  const vault = PublicVault__factory.connect(
    dynamicVaultDetail.address,
    provider
  )
  promises.push(
    vault
      .getStrategistNonce()
      .then((result: BigNumber) => (dynamicVaultDetail.nonce = result))
  )

  let timeToEpochEnd: BigNumber
  promises.push(
    vault['timeToEpochEnd()']().then(
      (result: BigNumber) => (timeToEpochEnd = result)
    )
  )

  let withdrawReserve: BigNumber
  promises.push(
    vault
      .getWithdrawReserve()
      .then((result: BigNumber) => (withdrawReserve = result))
  )

  let isShutdown: boolean
  promises.push(
    vault.getShutdown().then((result: boolean) => (isShutdown = result))
  )

  let balance: BigNumber
  promises.push(
    vault
      .asset()
      .then((asset) => {
        const token = new Contract(asset, erc20ABI, provider)
        return token.balanceOf(dynamicVaultDetail.address)
      })
      .then((balanceOf: BigNumber) => (balance = balanceOf))
  )

  await Promise.all(promises)

  // @ts-ignore
  dynamicVaultDetail.balance = balance.sub(withdrawReserve)

  dynamicVaultDetail.isReadyState =
    // @ts-ignore
    balance.sub(withdrawReserve).gt(BigNumber.from(0)) &&
    // @ts-ignore
    timeToEpochEnd.gt(BigNumber.from(0)) &&
    // @ts-ignore
    !isShutdown
  return dynamicVaultDetail as DynamicVaultDetail
}

// fetches the unique offers from the endpoint
const STRATEGY_BASE_URL =
  process.env.STRATEGY_BASE_URL ?? 'https://api.astaria.xyz/strategy'

export const getUniqueOffersByCollateral = async (
  token: string,
  id: BigNumber,
  borrower: string,
  limit: number,
  skip: number
): Promise<{ count: number; uniqueOffers: UniqueOffer[] }> => {
  const params = new URLSearchParams({
    limit: '' + limit,
    skip: '' + skip,
    unique: 'true',
  })
  const UNIQUE_OFFER_PATH =
    `offers/${token}/${id.toString()}/${borrower}?` + params.toString()

  const response = await axios.get(
    [STRATEGY_BASE_URL, UNIQUE_OFFER_PATH].join('/'),
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

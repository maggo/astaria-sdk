import { DynamicVaultDetail, UniqueOffer } from '../src/types'

// do not remove unused import getUniqueOffersByCollateral, it is used by the mocking framework but is not picked up by syntax highlighting
import {
  getDynamicVaultDetail,
  getUniqueOffersByCollateral,
} from '../src/router/utils'
import { BigNumber, providers } from 'ethers'
import { BaseProvider } from '@ethersproject/providers'
import {
  NFT,
  OfferBounds,
  OfferParams,
  OfferRouter,
} from '../src/router/OfferRouter'
import { VirtualOffer } from '../src/router/VirtualOffer'
import { WAD } from '../src/types/helpers'
import {
  convertJsonToDynamicVaultDetailsMap,
  convertJsonToNfts,
  convertJsonToUniqueOffersMap,
  getRandomBigNumber,
  getRandomWadRateDecimalString,
} from './OfferRouterMockUtils'

import _nfts from './__mocks__/nfts.json'
import _dynamicVaultDetails from './__mocks__/dynamic_vault_details_map.json'
import _uniqueOffers from './__mocks__/unique_offers_map.json'
import { SECONDS_IN_A_DAY } from '../src/router/helpers'
import { defaultAbiCoder } from 'ethers/lib/utils'

const nfts: NFT[] = convertJsonToNfts(_nfts)
const dynamicVaultDetails: Map<string, DynamicVaultDetail> =
  convertJsonToDynamicVaultDetailsMap(_dynamicVaultDetails)
const uniqueOffersMap: Map<string, UniqueOffer[]> =
  convertJsonToUniqueOffersMap(_uniqueOffers)

const calculateCollateralId = (token: string, id: BigNumber) => {
  return defaultAbiCoder.encode(['address', 'uint256'], [token, id])
}
// mock getDynamicVaultDetail so that methods do not access chain data
jest.mock('../src/router/utils', () => {
  return {
    getDynamicVaultDetail: jest
      .fn()
      .mockImplementation(
        async (address: string, provider: providers.Provider) => {
          const dynamicVaultDetail = dynamicVaultDetails.get(address)
          if (dynamicVaultDetail) {
            return dynamicVaultDetail
          }
          throw new Error('DynamicVaultDetail is undefined')
        }
      ),
    getUniqueOffersByCollateral: jest
      .fn()
      .mockImplementation(
        async (
          token: string,
          id: BigNumber,
          borrower: string,
          limit: number,
          skip: number
        ): Promise<{ count: number; uniqueOffers: UniqueOffer[] }> => {
          const collateralId = calculateCollateralId(token, id)
          const uniqueOffers = uniqueOffersMap.get(collateralId)
          if (!uniqueOffers)
            throw new Error('UniqueOffers not set for specificied CollateralId')

          const end =
            skip + limit > uniqueOffers.length
              ? uniqueOffers.length
              : skip + limit
          return {
            count: uniqueOffers.length,
            uniqueOffers: uniqueOffers.slice(skip, end),
          }
        }
      ),
  }
})

jest.mock('@ethersproject/providers')
jest.mock('@ethersproject/contracts')
const ProviderMock = BaseProvider as jest.Mocked<typeof BaseProvider>
const buildProviderMock = (balance = 1, transactionCount = 1): BaseProvider => {
  const getBalanceMock = jest
    .fn()
    .mockImplementation(() => Promise.resolve(balance))

  const getTransactionCountMock = jest
    .fn()
    .mockImplementation(() => Promise.resolve(transactionCount))

  const getStorageAtMock = jest.fn().mockImplementation(() => {})
  const provider = new ProviderMock('Network')

  provider.getTransactionCount = getTransactionCountMock
  provider.getBalance = getBalanceMock

  return provider
}

describe('Test the ability of CollateralOfferRouter to route offers', () => {
  const mockedVaultDetail = jest.mocked(getDynamicVaultDetail)
  mockedVaultDetail.mockClear()
  const provider = buildProviderMock()

  test('Single NFT generating a VirtualOffer Test', async () => {
    const amount = getRandomBigNumber(
      BigNumber.from(1).mul(WAD),
      BigNumber.from(30).mul(WAD)
    )
    const rate = getRandomWadRateDecimalString('1', '10')
    const duration = BigNumber.from(5).mul(SECONDS_IN_A_DAY)

    let isFirstChange = true
    // Delegate handler method, will be called after the OfferRouter has run the first time
    const onOfferRouterChange = (
      offerParams: OfferParams,
      offerBounds: OfferBounds,
      virtualOffers: VirtualOffer[]
    ) => {
      expect(virtualOffers.length > 0).toBeTruthy()
      if (virtualOffers.length > 0 && !isFirstChange) {
        // logOfferParams(offerParams)
        // logOfferBounds(offerBounds)
        // logVirtualOffer(virtualOffers[0])

        // check that there is only one virtualOffer
        expect(virtualOffers.length).toEqual(1)

        // check that the virtualOffer is valid
        virtualOffers[0].stack.reduce(
          (potentialDebt: BigNumber, uniqueOffer: UniqueOffer) => {
            expect(
              uniqueOffer.lien.maxPotentialDebt.gte(potentialDebt)
            ).toBeTruthy()
            potentialDebt = potentialDebt.add(
              VirtualOffer.calculatePotentialDebt(uniqueOffer)
            )
            return potentialDebt
          },
          BigNumber.from(0)
        )

        // check that the offerParams are valid
        expect(rate.gte(virtualOffers[0].rate)).toBeTruthy()
        expect(virtualOffers[0].duration.gte(duration)).toBeTruthy()

        // check that the offerBounds are valid
        // expect(offerBounds.maxAmount.gte(virtualOffers[0].amount)).toBeTruthy()
        expect(offerBounds.minRate.lte(virtualOffers[0].rate)).toBeTruthy()
        // expect(offerBounds.maxRate.gte(virtualOffers[0].rate)).toBeTruthy()
        expect(
          offerBounds.maxDuration.gte(virtualOffers[0].duration)
        ).toBeTruthy()
      }
      isFirstChange = false
    }

    const borrower: string = '0x286055c312AC3F939d1409619396ed6a88401D08'
    const offerRouter: OfferRouter = new OfferRouter(
      [nfts[0]],
      borrower,
      provider,
      onOfferRouterChange.bind(this)
    )
    // awaiting because the process of getting a response to the `onOfferRouterChange` delegate handler is async, test could exit before is it called
    await offerRouter.isOfferRouterReady()
    offerRouter.setParamsForOfferView({
      amount: amount,
      rate: rate,
      minDuration: duration,
    })
  })
})

import { BigNumber, utils } from 'ethers'
import { writeFileSync } from 'fs'
import {
  NFT,
  OfferBounds,
  OfferParams,
  OfferRouter,
} from '../src/router/OfferRouter'
import { VirtualOffer } from '../src/router/VirtualOffer'
import {
  DynamicVaultDetail,
  DynamicVaultDetailSchema,
  UniqueOffer,
  UniqueOfferSchema,
} from '../src/types'
import { Uint256Schema, WAD } from '../src/types/helpers'
import { SECONDS_IN_A_YEAR, SECONDS_IN_A_DAY } from '../src/router/helpers'

// helper to generate random BigNumbers within a set min/max range
export const getRandomBigNumber = (min: BigNumber, max: BigNumber) => {
  return min.add(BigNumber.from(utils.randomBytes(32)).mod(max.sub(min)))
}

export const getRandomWadRateDecimalString = (min: string, max: string) => {
  return getRandomBigNumber(
    BigNumber.from(min).mul(WAD).div(SECONDS_IN_A_YEAR),
    BigNumber.from(max).mul(WAD).div(SECONDS_IN_A_YEAR)
  )
}

export const logVirtualOffer = (virtualOffer: VirtualOffer): void => {
  console.log(
    'amount:',
    utils.formatEther(virtualOffer.amount.toString()),
    '\nduration:',
    getDecimalDurationFromEpochTime(virtualOffer.duration),
    'days',
    '\nrate:',
    getAprFromIpsWad(virtualOffer.rate)
  )
}

export const logOfferBounds = (offerBounds: OfferBounds): void => {
  console.log(
    'maxAmount:',
    utils.formatEther(offerBounds.maxAmount),
    '\nminRate:',
    getAprFromIpsWad(offerBounds.minRate),
    '\nmaxRate:',
    getAprFromIpsWad(offerBounds.maxRate),
    '\nmaxDuration:',
    getDecimalDurationFromEpochTime(offerBounds.maxDuration),
    'days'
  )
}

export const logOfferParams = (offerParams: OfferParams): void => {
  console.log(
    'amount:',
    utils.formatEther(offerParams.amount.toString()),
    '\nduration:',
    getDecimalDurationFromEpochTime(offerParams.minDuration),
    'days',
    '\nrate:',
    getAprFromIpsWad(offerParams.rate)
  )
}

export const getAprFromIpsWad = (ipsWad: BigNumber) => {
  return utils.formatEther(ipsWad.mul(SECONDS_IN_A_YEAR).toString())
}

export const getDecimalDurationFromEpochTime = (duration: BigNumber) => {
  return utils.formatEther(duration.mul(WAD).div(SECONDS_IN_A_DAY))
}

export const getRandomUniqueOffers = (
  size: number,
  vaults: string[],
  tokenAddress: string,
  tokenId: BigNumber
): UniqueOffer[] => {
  const durationMin = BigNumber.from(1 * 24 * 60 * 60)
  const durationMax = BigNumber.from(14 * 24 * 60 * 60)

  const amountMin = BigNumber.from('1000000000000000000')
  const amountMax = BigNumber.from('10000000000000000000')

  const mpdMin = BigNumber.from('1000000000000000000')
  const mpdMax = BigNumber.from('10000000000000000000')

  let uniqueOffers: UniqueOffer[] = []

  for (let i = 0; i < size; i++) {
    const amount = getRandomBigNumber(amountMin, amountMax)
    const type: number = 1 + Math.floor(Math.random())
    let uniqueOfferObject: any = {
      verifyingContract: vaults[Math.floor(Math.random() * vaults.length)],
      type: type + '',
      cid: 'QmVnJ5gAmZ63qNibaxLbuvPdpJQ1G5wcwxizXQttoAxV7p',
      expiration: '1674242547',
      leaf: '0x91fbc2bb317dfcd6a6ce9ef21abfa54c2296e373bfd4923db10aaac817ff9293',
      token: tokenAddress,
      lien: {
        amount: amount.toString(),
        rate: getRandomWadRateDecimalString('1', '10'),
        duration: getRandomBigNumber(durationMin, durationMax).toString(),
        maxPotentialDebt: getRandomBigNumber(mpdMin, mpdMax).toString(),
        liquidationInitialAsk: amount.mul(BigNumber.from(5)).toString(),
      },
    }
    if (type === 1) uniqueOfferObject.tokenId = tokenId
    uniqueOfferObject.offerHash = utils.keccak256(
      utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256', 'uint256'],
        [
          uniqueOfferObject.lien.amount,
          uniqueOfferObject.lien.rate,
          uniqueOfferObject.lien.duration,
          uniqueOfferObject.lien.maxPotentialDebt,
        ]
      )
    )

    const uniqueOffer: UniqueOffer = UniqueOfferSchema.parse(uniqueOfferObject)

    uniqueOffers.push(uniqueOffer)
  }
  return uniqueOffers
}
const bufferToHex = (buffer: ArrayBuffer) => {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}
export const getRandomAddress = () => {
  return '0x' + bufferToHex(utils.randomBytes(20).buffer)
}

export const getRandomAddresses = (count: number) => {
  let addresses: string[] = []
  for (let i = 0; i < count; i++) {
    addresses.push(getRandomAddress())
  }
  return addresses
}

export const getRandomDynamicVaultDetails = (addresses: string[]) => {
  return addresses.reduce(
    (dynamicVaultDetails: Map<string, DynamicVaultDetail>, address: string) => {
      const dynamicVaultDetail: DynamicVaultDetail = {
        address: address,
        balance: BigNumber.from(0),
        delegate: getRandomAddress(),
        nonce: BigNumber.from(0),
        isReadyState: true,
      }
      dynamicVaultDetails.set(address, dynamicVaultDetail)
      return dynamicVaultDetails
    },
    new Map<string, DynamicVaultDetail>()
  )
}

export const generateRandomNfts = (count: number) => {
  let nfts: NFT[] = []
  for (let i = 0; i < count; i++) {
    nfts.push({
      token: getRandomAddress(),
      id: getRandomBigNumber(BigNumber.from(0), BigNumber.from(1000)),
    })
  }
  return nfts
}

export const generateOfferRouterMockJSONData = (
  vaultCount: number,
  nftCount: number
) => {
  const vaults = getRandomAddresses(vaultCount)
  const nfts: NFT[] = generateRandomNfts(nftCount)
  writeFileSync(
    './test/__mocks__/nfts.json',
    JSON.stringify(nfts, null, 2),
    'utf-8'
  )

  const uniqueOffersMap: Map<string, UniqueOffer[]> = nfts.reduce(
    (uniqueOffers: Map<string, UniqueOffer[]>, nft: NFT) => {
      const collateralId = OfferRouter.generateCollateralId(nft.token, nft.id)
      uniqueOffers.set(
        collateralId,
        getRandomUniqueOffers(
          Math.floor(Math.random() * 100),
          vaults,
          nft.token,
          nft.id
        )
      )
      return uniqueOffers
    },
    new Map<string, UniqueOffer[]>()
  )
  writeFileSync(
    './test/__mocks__/unique_offers_map.json',
    JSON.stringify(Object.fromEntries(uniqueOffersMap), null, 2),
    'utf-8'
  )

  const dynamicVaultDetails: Map<string, DynamicVaultDetail> =
    getRandomDynamicVaultDetails(vaults)
  writeFileSync(
    './test/__mocks__/dynamic_vault_details_map.json',
    JSON.stringify(Object.fromEntries(dynamicVaultDetails), null, 2),
    'utf-8'
  )
}

export const convertJsonToNfts = (_nfts: any): NFT[] => {
  return _nfts.map((json: any): NFT => {
    return {
      token: json.token,
      id: Uint256Schema.parse(json.id),
    }
  })
}

export const convertJsonToUniqueOffersMap = (
  _uniqueOffers: any
): Map<string, UniqueOffer[]> => {
  return Object.keys(_uniqueOffers).reduce(
    (accumulator: Map<string, UniqueOffer[]>, key: string) => {
      const uniqueOffers: UniqueOffer[] = _uniqueOffers[key].map(
        (json: any) => {
          return UniqueOfferSchema.parse(json)
        }
      )
      accumulator.set(key, uniqueOffers)
      return accumulator
    },
    new Map<string, UniqueOffer[]>()
  )
}

export const convertJsonToDynamicVaultDetailsMap = (
  _dynamicVaultDetails: any
): Map<string, DynamicVaultDetail> => {
  return Object.keys(_dynamicVaultDetails).reduce(
    (accumulator: Map<string, DynamicVaultDetail>, key: string) => {
      accumulator.set(
        key,
        DynamicVaultDetailSchema.parse(_dynamicVaultDetails[key])
      )
      return accumulator
    },
    new Map<string, DynamicVaultDetail>()
  )
}

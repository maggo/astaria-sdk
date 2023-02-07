import { BigNumber, ContractReceipt, Signer, utils } from 'ethers'
import { CollateralToken__factory, LienToken__factory } from '../contracts'
import { WAD } from '../types/helpers'
import { OfferBounds, OfferParams } from './OfferRouter'
import { VirtualOffer } from './VirtualOffer'

export const SECONDS_IN_A_YEAR = BigNumber.from(365 * 24 * 60 * 60)
export const SECONDS_IN_A_DAY = BigNumber.from(24 * 60 * 60)

export const getWadRateFromDecimalString = (rate: string) => {
  return BigNumber.from(rate).mul(WAD).div(SECONDS_IN_A_YEAR)
}

export const getAprFromIpsWad = (ipsWad: BigNumber) => {
  return utils.formatEther(ipsWad.mul(SECONDS_IN_A_YEAR).toString())
}

export const getDecimalDurationFromEpochTime = (duration: BigNumber) => {
  return utils.formatEther(duration.mul(WAD).div(SECONDS_IN_A_DAY))
}

const logVirtualOffer = (virtualOffer: VirtualOffer): void => {
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

export const getNecessaryApprovalsByVirtualOffers = async (
  borrower: string,
  virtualOffers: VirtualOffer[],
  signer: Signer,
  routerAddr: string,
  collateralTokenAddr: string
): Promise<boolean> => {
  const collateralToken = CollateralToken__factory.connect(
    collateralTokenAddr,
    signer
  )
  let promises: Promise<boolean>[] = []

  promises.push(
    collateralToken
      .isApprovedForAll(borrower, routerAddr)
      .then(async (result: boolean): Promise<boolean> => {
        if (!result) {
          const tx = await collateralToken.setApprovalForAll(routerAddr, true)
          let receipt: ContractReceipt = await tx.wait()
          const event = receipt.events?.filter((x) => {
            return x.event == 'ApprovalForAll'
          })[0]

          if (!event) return false
          else return true
        }
        return result
      })
  )
  promises.push(
    ...virtualOffers.map(async (virtualOffer: VirtualOffer) => {
      const tokenAddr: string = virtualOffer.stack[0].token
      if (!virtualOffer.stack[0].underlyingTokenId)
        throw new Error('UnderlyingTokenId not set')
      const tokenId: BigNumber = virtualOffer.stack[0].underlyingTokenId

      // using LienToken__factory as a stand in because we do not have a generic ERC721 factory
      const erc721 = LienToken__factory.connect(tokenAddr, signer)
      return erc721
        .isApprovedForAll(borrower, routerAddr)
        .then(async (result: boolean): Promise<boolean> => {
          if (!result) {
            const tx = await erc721.setApprovalForAll(routerAddr, true)
            let receipt: ContractReceipt = await tx.wait()
            const event = receipt.events?.filter((x) => {
              return x.event == 'ApprovalForAll'
            })[0]

            if (!event) return false
            else return true
          }
          return result
        })
    })
  )
  return await Promise.all(promises).then((results: boolean[]) => {
    results.reduce((accumulator: boolean, result) => {
      if (!result) accumulator = false
      return accumulator
    }, true)
    return true
  })
}

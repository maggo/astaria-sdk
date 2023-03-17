import { BigNumber, providers, utils } from 'ethers'
import { getDynamicVaultDetail } from './utils'
import { DynamicVaultDetail, UniqueOffer } from '../types'
import { CollateralManager } from './CollateralManager'
import { VirtualOffer } from './VirtualOffer'
import { WAD } from '../types/helpers'
import { Queue } from './Queue'

export interface NFT {
  token: string
  id: BigNumber
}

export interface OfferParams {
  amount: BigNumber
  rate: BigNumber
  minDuration: BigNumber
}

export interface OfferBounds {
  maxAmount: BigNumber

  minRate: BigNumber
  maxRate: BigNumber

  maxDuration: BigNumber
}

export const sortByRate = (a: UniqueOffer, b: UniqueOffer) => {
  if (a.lien.rate.lt(b.lien.rate)) return 1
  else if (a.lien.rate.gt(b.lien.rate)) return -1

  if (a.lien.maxPotentialDebt.lt(b.lien.maxPotentialDebt)) return -1
  else if (a.lien.maxPotentialDebt.gt(b.lien.maxPotentialDebt)) return 1

  if (a.lien.amount.lt(b.lien.amount)) return -1
  else if (a.lien.amount.gt(b.lien.amount)) return 1

  return 0
}

export const sortVirtualOffersByAmount = (a: VirtualOffer, b: VirtualOffer) => {
  if (a.amount.gt(b.amount)) return 1
  else if (a.amount.lt(b.amount)) return -1

  if (a.rate.lt(b.rate)) return 1
  else if (a.rate.gt(b.rate)) return -1

  if (a.stack.length < b.stack.length) return 1
  else if (a.stack.length > b.stack.length) return -1

  if (a.duration.gt(b.duration)) return 1
  else if (a.duration.lt(b.duration)) return -1

  return 0
}

//assumes ordering largest amount, to smallest
export const filterVirtualOffersByAmount = (
  amount: BigNumber,
  virtualOffers: VirtualOffer[]
): VirtualOffer[] => {
  return virtualOffers.filter((virtualOffer: VirtualOffer) => {
    if (amount.lte(BigNumber.from(0))) return false
    amount = amount.sub(virtualOffer.amount)
    return true
  })
}

export const getVirtualOffersAggregateTerms = (
  virtualOffers: VirtualOffer[]
): { amount: BigNumber; rate: BigNumber; duration: BigNumber } => {
  const amount = virtualOffers.reduce(
    (total: BigNumber, virtualOffer: VirtualOffer) => {
      return total.add(virtualOffer.amount)
    },
    BigNumber.from(0)
  )

  return virtualOffers.reduce(
    (terms, virtualOffer: VirtualOffer) => {
      if (
        terms.duration.eq(BigNumber.from(0)) ||
        terms.duration.gt(virtualOffer.duration)
      )
        terms.duration = virtualOffer.duration
      const wadRatio = virtualOffer.amount
        .mul(BigNumber.from(WAD))
        .div(terms.amount)
      terms.rate = terms.rate.add(
        virtualOffer.rate.mul(wadRatio).div(BigNumber.from(WAD))
      )
      return terms
    },
    { amount: amount, rate: BigNumber.from(0), duration: BigNumber.from(0) }
  )
}

export class OfferRouter {
  private collateralManagers: CollateralManager[]
  private borrower: string

  private offerParams: OfferParams | undefined
  private offerBounds: OfferBounds | undefined
  private virtualOffers: VirtualOffer[]
  private onOfferRouterChange: (
    offerParams: OfferParams,
    offerBounds: OfferBounds,
    virtualOffers: VirtualOffer[]
  ) => void

  private dynamicVaultDetails: Map<string, DynamicVaultDetail>

  private provider: providers.BaseProvider
  private isReady: boolean
  private cacheIsValid: boolean
  private queue: Queue

  // add unsubscribe
  constructor(
    assets: NFT[],
    borrower: string,
    provider: providers.BaseProvider,
    onOfferRouterChange: (
      offerParams: OfferParams,
      offerBounds: OfferBounds,
      virtualOffers: VirtualOffer[]
    ) => void
  ) {
    this.offerParams = undefined

    this.offerBounds = undefined

    this.virtualOffers = []

    this.onOfferRouterChange = onOfferRouterChange

    this.dynamicVaultDetails = new Map<string, DynamicVaultDetail>()

    this.provider = provider

    this.isReady = false

    this.cacheIsValid = false

    this.borrower = borrower

    this.collateralManagers = []
    this.queue = new Queue(this.executeUpdate.bind(this))
    this.addNewCollaterals(assets)
  }

  public addNewCollaterals(assets: NFT[]): void {
    this.collateralManagers = [
      ...this.collateralManagers,
      ...assets.reduce((accumulator: CollateralManager[], asset: NFT) => {
        accumulator.push(
          new CollateralManager(
            asset.token,
            asset.id,
            this.borrower,
            30000,
            this.onNewUniqueOffers.bind(this),
            this.provider
          )
        )
        return accumulator
      }, [] as CollateralManager[]),
    ]
  }

  public async isOfferRouterReady(): Promise<boolean> {
    if (this.isReady) return true
    await new Promise((r) => setTimeout(r, 50))
    return this.isOfferRouterReady()
  }

  private static validateUniqueOffer(
    uniqueOffers: UniqueOffer[],
    dynamicVaultDetails: Map<string, DynamicVaultDetail>
  ): UniqueOffer[] {
    return uniqueOffers.filter((uniqueOffer: UniqueOffer) => {
      let dynamicVaultDetail = dynamicVaultDetails.get(uniqueOffer.vault)
      if (!dynamicVaultDetail)
        throw new Error(
          'DynamicVault detail not available for vault ' + uniqueOffer.vault
        )
      if (!dynamicVaultDetail.isReadyState) return false
      return true
    })
  }

  private getAllValidUniqueOffers() {
    let uniqueOffers: UniqueOffer[] = this.collateralManagers.reduce(
      (accumulator: UniqueOffer[], collateralManager: CollateralManager) => {
        accumulator.push(...Array.from(collateralManager.uniqueOffers.values()))
        return accumulator
      },
      [] as UniqueOffer[]
    )
    return OfferRouter.validateUniqueOffer(
      uniqueOffers,
      this.dynamicVaultDetails
    )
  }

  public executeUpdate() {
    let allUniqueOffers: UniqueOffer[] = this.getAllValidUniqueOffers()
    let virtualOffers: VirtualOffer[]
    ;({
      offerParams: this.offerParams,
      offerBounds: this.offerBounds,
      virtualOffers: virtualOffers,
    } = OfferRouter.generateStateForOfferView(
      this.offerBounds,
      undefined,
      this.dynamicVaultDetails,
      allUniqueOffers
    ))

    if (virtualOffers.length !== 0) {
      this.virtualOffers = virtualOffers

      this.isReady = true
      this.onOfferRouterChange(
        this.offerParams,
        this.offerBounds,
        this.virtualOffers.sort(sortVirtualOffersByAmount)
      )
    } else
      console.log(
        'Input parameters and assets has resulted in no virtualOffers'
      )
  }

  public async onNewUniqueOffers(uniqueOffers: UniqueOffer[]) {
    uniqueOffers.map((uniqueOffer: UniqueOffer) => {
      const provider: providers.Provider = this.provider

      let dynamicVaultDetail: DynamicVaultDetail | undefined =
        this.dynamicVaultDetails.get(uniqueOffer.vault)
      if (!dynamicVaultDetail)
        this.queue.push(uniqueOffer.vault, () =>
          getDynamicVaultDetail(uniqueOffer.vault, provider).then(
            (dynamicVaultDetail: DynamicVaultDetail) => {
              this.dynamicVaultDetails.set(
                dynamicVaultDetail.address,
                dynamicVaultDetail
              )
            }
          )
        )
    })

    // for the case where the dynamicVaultDetail is already available
    if (!this.queue.isRunning) this.executeUpdate()
  }

  public setParamsForOfferView(offerParams: OfferParams): void {
    const uniqueOffers: UniqueOffer[] = this.getAllValidUniqueOffers()

    if (
      (this.offerParams &&
        OfferRouter.hasOfferParamsChanged(this.offerParams, offerParams)) ||
      !this.offerParams
    ) {
      ;({ offerParams: this.offerParams, virtualOffers: this.virtualOffers } =
        OfferRouter.generateStateForOfferView(
          this.offerBounds,
          offerParams,
          this.dynamicVaultDetails,
          uniqueOffers
        ))
    }

    this.offerParams = {
      amount: this.offerParams.amount,
      rate: offerParams.rate,
      minDuration: offerParams.minDuration,
    }

    if (!this.offerBounds)
      throw new Error('OfferBounds undefined when passing offerParams')
    this.onOfferRouterChange(
      this.offerParams,
      this.offerBounds,
      this.virtualOffers.sort(sortVirtualOffersByAmount)
    )
  }

  private static generateStateForOfferView(
    offerBounds: OfferBounds | undefined,
    offerParams: OfferParams | undefined,
    dynamicVaultDetails: Map<string, DynamicVaultDetail>,
    uniqueOffers: UniqueOffer[]
  ): {
    offerParams: OfferParams
    offerBounds: OfferBounds
    virtualOffers: VirtualOffer[]
  } {
    if (offerParams) {
      uniqueOffers = uniqueOffers.filter((uniqueOffer: UniqueOffer) => {
        if (offerBounds && offerParams.rate.eq(offerBounds.maxRate))
          return offerParams.minDuration.lte(uniqueOffer.lien.duration)
        return (
          offerParams.minDuration.lte(uniqueOffer.lien.duration) &&
          offerParams.rate.gte(uniqueOffer.lien.rate)
        )
      })
    }
    return {
      ...OfferRouter.getVirtualOffersByRateForAmount(
        undefined,
        dynamicVaultDetails,
        uniqueOffers
      ),
    }
  }

  public static getVirtualOffersByRateForAmount(
    maxAmount: BigNumber | undefined,
    dynamicVaultDetails: Map<string, DynamicVaultDetail>,
    uniqueOffers: UniqueOffer[]
  ): {
    offerParams: OfferParams
    offerBounds: OfferBounds
    virtualOffers: VirtualOffer[]
  } {
    uniqueOffers.sort(sortByRate)
    // vault -> balance
    let vaultBalanceMap: Map<string, BigNumber> = Array.from(
      dynamicVaultDetails.values()
    ).reduce(
      (
        vaultBalanceMap: Map<string, BigNumber>,
        dynamicVaultDetail: DynamicVaultDetail
      ) => {
        vaultBalanceMap.set(
          dynamicVaultDetail.address,
          dynamicVaultDetail.balance
        )
        return vaultBalanceMap
      },
      new Map<string, BigNumber>()
    )

    // collateralId -> virtualOffer
    let virtualOffersMap: Map<string, VirtualOffer> = new Map<
      string,
      VirtualOffer
    >()
    let total = BigNumber.from(0)
    for (let uniqueOffer of uniqueOffers) {
      if (!uniqueOffer.underlyingTokenId)
        throw new Error('UniqueOffer does not have an underlying tokenId set')
      const collateralId = OfferRouter.generateCollateralId(
        uniqueOffer.token,
        uniqueOffer.underlyingTokenId
      )

      let virtualOffer: VirtualOffer | undefined =
        virtualOffersMap.get(collateralId)

      if (!virtualOffer)
        virtualOffer = new VirtualOffer(
          uniqueOffer.token,
          uniqueOffer.underlyingTokenId
        )
      let vaultAddress = uniqueOffer.vault
      let vaultBalance: BigNumber | undefined =
        vaultBalanceMap.get(vaultAddress)
      if (!vaultBalance)
        throw new Error('Exception: vault balance not available')

      let balance: BigNumber | undefined =
        virtualOffer.addUniqueOfferToStack(uniqueOffer)

      if (balance) {
        virtualOffersMap.set(collateralId, virtualOffer)
        vaultBalance = vaultBalance.sub(balance)
        total = total.add(balance)
        if (maxAmount && total.gte(maxAmount)) break
      }
      vaultBalanceMap.set(vaultAddress, vaultBalance)
    }
    const virtualOffers: VirtualOffer[] = Array.from(virtualOffersMap.values())

    const { offerParams, offerBounds } = OfferRouter.calculateOfferBounds(
      virtualOffers,
      uniqueOffers
    )

    return { offerParams, offerBounds, virtualOffers }
  }

  public static generateCollateralId(token: string, id: BigNumber) {
    return utils.defaultAbiCoder.encode(['address', 'uint256'], [token, id])
  }

  // uniqueOffer must be sorted before using this method
  public static calculateOfferBounds(
    virtualOffers: VirtualOffer[],
    uniqueOffers: UniqueOffer[]
  ): { offerParams: OfferParams; offerBounds: OfferBounds } {
    let maxAmount: BigNumber = virtualOffers.reduce(
      (accumulator: BigNumber, virtualOffer: VirtualOffer) => {
        accumulator = accumulator.add(virtualOffer.amount)

        return accumulator
      },
      BigNumber.from(0)
    )

    let { maxRate, minDuration } = virtualOffers.reduce(
      (
        accumulator: { maxRate: BigNumber; minDuration: BigNumber },
        virtualOffer: VirtualOffer
      ) => {
        let proportionalRate: BigNumber = virtualOffer.amount
          .mul(WAD)
          .div(maxAmount)
          .mul(virtualOffer.rate)
          .div(WAD)
        accumulator.maxRate = accumulator.maxRate.add(proportionalRate)

        if (
          accumulator.minDuration.eq(BigNumber.from(0)) ||
          virtualOffer.duration.lt(accumulator.minDuration)
        )
          accumulator.minDuration = virtualOffer.duration
        return accumulator
      },
      { maxRate: BigNumber.from(0), minDuration: BigNumber.from(0) }
    )

    const offerParams: OfferParams = {
      amount: maxAmount,
      rate: maxRate,
      minDuration: minDuration,
    }

    return {
      offerParams: offerParams,
      offerBounds: uniqueOffers.reduce(
        (accummulator: OfferBounds, uniqueOffer: UniqueOffer) => {
          if (uniqueOffer.lien.rate.lt(accummulator.minRate)) {
            accummulator.minRate = uniqueOffer.lien.rate
          }
          if (
            accummulator.maxDuration.eq(BigNumber.from(0)) ||
            uniqueOffer.lien.duration.gt(accummulator.maxDuration)
          ) {
            accummulator.maxDuration = uniqueOffer.lien.duration
          }
          return accummulator
        },
        {
          maxAmount: maxAmount,
          // due to rounding when calculating the virtualoffer rate, if there is only one offer the minRate could be lower than the maxRate
          minRate: maxRate,
          maxRate: maxRate,
          maxDuration: BigNumber.from(0),
        }
      ),
    }
  }

  public static hasOfferParamsChanged(a: OfferParams, b: OfferParams) {
    if (!a.amount.eq(b.amount)) return true
    if (!a.rate.eq(b.rate)) return true
    if (!a.minDuration.eq(b.minDuration)) return true

    return false
  }

  public static async getDynamicVaultDetails(
    vaults: Set<string>,
    provider: providers.Provider
  ): Promise<DynamicVaultDetail[]> {
    return Promise.all(
      Array.from(vaults).map((address: string) =>
        getDynamicVaultDetail(address, provider)
      )
    )
  }

  public static calculateCollateralId(token: string, id: BigNumber) {
    return utils.defaultAbiCoder.encode(['address', 'uint256'], [token, id])
  }
}

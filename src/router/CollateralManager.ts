import { BigNumber, providers } from 'ethers'
import { UniqueOffer } from '../types'
import { AddressSchema, Uint256Schema } from '../types/helpers'
import { getUniqueOffersByCollateral } from './utils'

export class CollateralManager {
  private token: string
  private id: BigNumber
  private borrower: string
  private count: number | undefined

  // leave values for future upgrades
  private provider: providers.BaseProvider
  private timeout: number
  private onNewUniqueOffers: (uniqueOffers: UniqueOffer[]) => void

  private _uniqueOffers: Map<string, UniqueOffer>
  public get uniqueOffers(): Map<string, UniqueOffer> {
    return this._uniqueOffers
  }
  private set uniqueOffers(value: Map<string, UniqueOffer>) {
    this._uniqueOffers = value
  }

  constructor(
    token: string,
    id: BigNumber,
    borrower: string,
    timeout: number,
    onNewUniqueOffers: (uniqueOffers: UniqueOffer[]) => void,
    provider: providers.BaseProvider
  ) {
    this.token = AddressSchema.parse(token)
    this.id = Uint256Schema.parse(id.toString())

    this.borrower = AddressSchema.parse(borrower)
    this.timeout = timeout
    this.onNewUniqueOffers = onNewUniqueOffers
    this.provider = provider

    this._uniqueOffers = new Map<string, UniqueOffer>()
    this.loadUniqueOffersByCollateral(100, 0)
  }

  public async loadUniqueOffersByCollateral(limit: number, skip: number) {
    await getUniqueOffersByCollateral(
      this.token,
      this.id,
      this.borrower,
      100,
      0
    ).then((result: { count: number; uniqueOffers: UniqueOffer[] }) => {
      result.uniqueOffers
        .map((uniqueOffer: UniqueOffer) => {
          uniqueOffer.underlyingTokenId = this.id
          return uniqueOffer
        })
        .forEach((uniqueOffer: UniqueOffer) =>
          this.uniqueOffers.set(uniqueOffer.offerHash, uniqueOffer)
        )

      this.count = result.count
      if (this.count >= skip + limit) {
        this.loadUniqueOffersByCollateral(limit, skip + limit)
      } else {
        this.onNewUniqueOffers(Array.from(this.uniqueOffers.values()))
        return
      }
    })
  }
}

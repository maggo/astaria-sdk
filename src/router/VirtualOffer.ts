import { BigNumber } from 'ethers'
import { UniqueOffer } from '../types'
import { WAD } from '../types/helpers'

export class VirtualOffer {
  private _potentialDebt: BigNumber

  public get potentialDebt(): BigNumber {
    return this._potentialDebt
  }
  private set potentialDebt(value: BigNumber) {
    this._potentialDebt = value
  }

  private _amount: BigNumber

  public get amount(): BigNumber {
    return this._amount
  }
  private set amount(value: BigNumber) {
    this._amount = value
  }
  private _rate: BigNumber
  public get rate(): BigNumber {
    return this._rate
  }
  private set rate(value: BigNumber) {
    this._rate = value
  }
  private _duration: BigNumber
  public get duration(): BigNumber {
    return this._duration
  }
  private set duration(value: BigNumber) {
    this._duration = value
  }
  private _stack: UniqueOffer[]
  public get stack(): UniqueOffer[] {
    return this._stack
  }
  public set stack(value: UniqueOffer[]) {
    this._stack = value
  }
  private _tokenAddress: string
  public get tokenAddress(): string {
    return this._tokenAddress
  }
  private _tokenId: BigNumber
  public get tokenId(): BigNumber {
    return this._tokenId
  }

  constructor(tokenAddress: string, tokenId: BigNumber) {
    this._potentialDebt = BigNumber.from(0)
    this._amount = BigNumber.from(0)
    this._rate = BigNumber.from(0)
    this._duration = BigNumber.from(0)
    this._stack = []

    this._tokenAddress = tokenAddress
    this._tokenId = tokenId
  }

  public addUniqueOfferToStack(
    uniqueOffer: UniqueOffer
  ): BigNumber | undefined {
    if (this.stack.length >= 5) return undefined

    if (this.stack.length === 0) {
      this.stack.push(uniqueOffer)
      this.updateDetails()
      return VirtualOffer.getAmountOrBalance(uniqueOffer)
    }

    const capacity: BigNumber = this.maxPotentialDebtCapacityInPositionZero()
    // attempt front insertion
    if (this.canInsertFront(capacity, uniqueOffer)) {
      this.stack.unshift(uniqueOffer)
      this.updateDetails()
      return VirtualOffer.getAmountOrBalance(uniqueOffer)
    }
    // attempt rear insertion
    else if (this.canInsertRear(uniqueOffer)) {
      this.stack.push(uniqueOffer)
      this.updateDetails()
      return VirtualOffer.getAmountOrBalance(uniqueOffer)
    }
    // attempt front insertion with a reduced balance
    else if (capacity.gt(BigNumber.from(0))) {
      const balance = capacity
        .mul(WAD)
        .div(uniqueOffer.lien.rate.mul(uniqueOffer.lien.duration).add(WAD))
      if (balance.lte(BigNumber.from(0))) return undefined
      uniqueOffer.balance = balance

      this.stack.unshift(uniqueOffer)
      this.updateDetails()
      return VirtualOffer.getAmountOrBalance(uniqueOffer)
    } else return undefined
  }

  public removeUniqueOfferAtIndex(index: number) {
    if (index > this.stack.length - 1)
      throw new Error(
        'Attempting to remove element outside the bounds of the array'
      )
    this.stack.splice(index, 1)
    this.updateDetails()
  }

  private static canReplaceExistingWithGreaterAmountAtIndex(
    stack: UniqueOffer[],
    incoming: UniqueOffer
  ): number | undefined {
    const capacities =
      VirtualOffer.maxPotentialDebtCapacityAtEachPosition(stack)

    return stack.reduce(
      (accummulator, uniqueOffer: UniqueOffer, index: number) => {
        if (
          incoming.lien.maxPotentialDebt.gte(accummulator.potentialDebt) &&
          incoming.lien.amount.gt(uniqueOffer.lien.amount)
        ) {
          const balance = capacities[index]
            .mul(WAD)
            .div(incoming.lien.rate.mul(incoming.lien.duration).add(WAD))
          const difference = balance.sub(uniqueOffer.lien.amount)

          if (
            !accummulator.difference ||
            (difference.gt(BigNumber.from(0)) &&
              difference.gt(accummulator.difference))
          ) {
            accummulator.index = index
            accummulator.difference = difference
          }
        }
        accummulator.potentialDebt = accummulator.potentialDebt.add(
          VirtualOffer.calculatePotentialDebt(uniqueOffer)
        )
        return accummulator
      },
      {
        index: undefined as number | undefined,
        potentialDebt: BigNumber.from(0),
        difference: undefined as BigNumber | undefined,
      }
    ).index
  }

  private canInsertFront(
    capacity: BigNumber,
    uniqueOffer: UniqueOffer
  ): boolean {
    return capacity.gte(VirtualOffer.calculatePotentialDebt(uniqueOffer))
  }

  private maxPotentialDebtCapacityInPositionZero(): BigNumber {
    const capacities = VirtualOffer.maxPotentialDebtCapacityAtEachPosition(
      this.stack
    )
    return capacities[capacities.length - 1]
  }

  public static maxPotentialDebtCapacityAtEachPosition(
    stack: UniqueOffer[]
  ): BigNumber[] {
    return stack.reduce(
      (accummulator, uniqueOffer: UniqueOffer) => {
        const capacity = uniqueOffer.lien.maxPotentialDebt.sub(
          accummulator.potentialDebt
        )
        if (
          capacity.gte(BigNumber.from(0)) &&
          (accummulator.capacity.length === 0 ||
            capacity.lt(
              accummulator.capacity[accummulator.capacity.length - 1]
            ))
        ) {
          accummulator.capacity.push(capacity)
        } else accummulator.capacity.push(BigNumber.from(0))
        accummulator.potentialDebt = accummulator.potentialDebt.add(
          VirtualOffer.calculatePotentialDebt(uniqueOffer)
        )

        return accummulator
      },
      {
        potentialDebt: BigNumber.from(0),
        capacity: [] as BigNumber[],
      }
    ).capacity
  }

  private canInsertRear(uniqueOffer: UniqueOffer): boolean {
    if (this.stack.length >= 5) return false
    return this.potentialDebt.lte(uniqueOffer.lien.maxPotentialDebt)
  }

  private updateDetails() {
    this.resetDetails()
    this.stack.map((uniqueOffer: UniqueOffer) => {
      this.amount = this.amount.add(
        VirtualOffer.getAmountOrBalance(uniqueOffer)
      )
      this.potentialDebt = this.potentialDebt.add(
        VirtualOffer.calculatePotentialDebt(uniqueOffer)
      )
      if (
        this.duration.eq(BigNumber.from(0)) ||
        this.duration.gt(uniqueOffer.lien.duration)
      )
        this.duration = uniqueOffer.lien.duration
    })

    this.stack.forEach((uniqueOffer: UniqueOffer) => {
      const wadRatio = VirtualOffer.getAmountOrBalance(uniqueOffer)
        .mul(BigNumber.from(WAD))
        .div(this.amount)
      this.rate = this.rate.add(
        uniqueOffer.lien.rate.mul(wadRatio).div(BigNumber.from(WAD))
      )
    })
  }

  public resetDetails() {
    this.amount = BigNumber.from(0)
    this.duration = BigNumber.from(0)
    this.potentialDebt = BigNumber.from(0)
    this.rate = BigNumber.from(0)
  }

  public static getAmountOrBalance(uniqueOffer: UniqueOffer): BigNumber {
    return uniqueOffer.balance ?? uniqueOffer.lien.amount
  }

  // calculates the potentialdebt (amount + interest for the duration of the lien)
  public static calculatePotentialDebt(uniqueOffer: UniqueOffer): BigNumber {
    const amount: BigNumber = VirtualOffer.getAmountOrBalance(uniqueOffer)
    return amount
      .mul(uniqueOffer.lien.rate)
      .mul(uniqueOffer.lien.duration)
      .div(BigNumber.from(WAD))
      .add(amount)
  }
}

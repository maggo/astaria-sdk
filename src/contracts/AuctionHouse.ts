/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common'

export declare namespace ILienToken {
  export type AuctionStackStruct = {
    lienId: PromiseOrValue<BigNumberish>
    end: PromiseOrValue<BigNumberish>
  }

  export type AuctionStackStructOutput = [BigNumber, number] & {
    lienId: BigNumber
    end: number
  }
}

export interface AuctionHouseInterface extends utils.Interface {
  functions: {
    'auctionExists(uint256)': FunctionFragment
    'authority()': FunctionFragment
    'cancelAuction(uint256,address)': FunctionFragment
    'createAuction(uint256,uint256,uint256,address,uint256,uint256,uint256,(uint256,uint40)[])': FunctionFragment
    'createBid(uint256,uint256)': FunctionFragment
    'endAuction(uint256)': FunctionFragment
    'getAuctionData(uint256)': FunctionFragment
    'minBidIncrementDenominator()': FunctionFragment
    'minBidIncrementNumerator()': FunctionFragment
    'owner()': FunctionFragment
    'setAuthority(address)': FunctionFragment
    'timeBuffer()': FunctionFragment
    'transferOwnership(address)': FunctionFragment
    'weth()': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'auctionExists'
      | 'authority'
      | 'cancelAuction'
      | 'createAuction'
      | 'createBid'
      | 'endAuction'
      | 'getAuctionData'
      | 'minBidIncrementDenominator'
      | 'minBidIncrementNumerator'
      | 'owner'
      | 'setAuthority'
      | 'timeBuffer'
      | 'transferOwnership'
      | 'weth'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'auctionExists',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(functionFragment: 'authority', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'cancelAuction',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string
  encodeFunctionData(
    functionFragment: 'createAuction',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      ILienToken.AuctionStackStruct[]
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'createBid',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'endAuction',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'getAuctionData',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'minBidIncrementDenominator',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'minBidIncrementNumerator',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'setAuthority',
    values: [PromiseOrValue<string>]
  ): string
  encodeFunctionData(functionFragment: 'timeBuffer', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>]
  ): string
  encodeFunctionData(functionFragment: 'weth', values?: undefined): string

  decodeFunctionResult(
    functionFragment: 'auctionExists',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'authority', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'cancelAuction',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'createAuction',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'createBid', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'endAuction', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'getAuctionData',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'minBidIncrementDenominator',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'minBidIncrementNumerator',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'setAuthority',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'timeBuffer', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'weth', data: BytesLike): Result

  events: {
    'AuctionBid(uint256,address,uint256,bool,bool)': EventFragment
    'AuctionCanceled(uint256)': EventFragment
    'AuctionCreated(uint256,uint256,uint256)': EventFragment
    'AuctionDurationExtended(uint256,uint256)': EventFragment
    'AuctionEnded(uint256,address,uint256)': EventFragment
    'AuthorityUpdated(address,address)': EventFragment
    'OwnershipTransferred(address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AuctionBid'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AuctionCanceled'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AuctionCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AuctionDurationExtended'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AuctionEnded'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AuthorityUpdated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
}

export interface AuctionBidEventObject {
  tokenId: BigNumber
  sender: string
  value: BigNumber
  firstBid: boolean
  extended: boolean
}
export type AuctionBidEvent = TypedEvent<
  [BigNumber, string, BigNumber, boolean, boolean],
  AuctionBidEventObject
>

export type AuctionBidEventFilter = TypedEventFilter<AuctionBidEvent>

export interface AuctionCanceledEventObject {
  tokenId: BigNumber
}
export type AuctionCanceledEvent = TypedEvent<
  [BigNumber],
  AuctionCanceledEventObject
>

export type AuctionCanceledEventFilter = TypedEventFilter<AuctionCanceledEvent>

export interface AuctionCreatedEventObject {
  tokenId: BigNumber
  duration: BigNumber
  reservePrice: BigNumber
}
export type AuctionCreatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  AuctionCreatedEventObject
>

export type AuctionCreatedEventFilter = TypedEventFilter<AuctionCreatedEvent>

export interface AuctionDurationExtendedEventObject {
  tokenId: BigNumber
  duration: BigNumber
}
export type AuctionDurationExtendedEvent = TypedEvent<
  [BigNumber, BigNumber],
  AuctionDurationExtendedEventObject
>

export type AuctionDurationExtendedEventFilter =
  TypedEventFilter<AuctionDurationExtendedEvent>

export interface AuctionEndedEventObject {
  tokenId: BigNumber
  winner: string
  winningBid: BigNumber
}
export type AuctionEndedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  AuctionEndedEventObject
>

export type AuctionEndedEventFilter = TypedEventFilter<AuctionEndedEvent>

export interface AuthorityUpdatedEventObject {
  user: string
  newAuthority: string
}
export type AuthorityUpdatedEvent = TypedEvent<
  [string, string],
  AuthorityUpdatedEventObject
>

export type AuthorityUpdatedEventFilter =
  TypedEventFilter<AuthorityUpdatedEvent>

export interface OwnershipTransferredEventObject {
  user: string
  newOwner: string
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>

export interface AuctionHouse extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: AuctionHouseInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    auctionExists(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    authority(overrides?: CallOverrides): Promise<[string]>

    cancelAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      canceledBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    createAuction(
      tokenId: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maxDuration: PromiseOrValue<BigNumberish>,
      initiator: PromiseOrValue<string>,
      initiatorFeeNumerator: PromiseOrValue<BigNumberish>,
      initiatorFeeDenominator: PromiseOrValue<BigNumberish>,
      reserve: PromiseOrValue<BigNumberish>,
      stack: ILienToken.AuctionStackStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    createBid(
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    endAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    getAuctionData(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string] & {
        amount: BigNumber
        duration: BigNumber
        firstBidTime: BigNumber
        reservePrice: BigNumber
        bidder: string
      }
    >

    minBidIncrementDenominator(overrides?: CallOverrides): Promise<[number]>

    minBidIncrementNumerator(overrides?: CallOverrides): Promise<[number]>

    owner(overrides?: CallOverrides): Promise<[string]>

    setAuthority(
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    timeBuffer(overrides?: CallOverrides): Promise<[number]>

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    weth(overrides?: CallOverrides): Promise<[string]>
  }

  auctionExists(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>

  authority(overrides?: CallOverrides): Promise<string>

  cancelAuction(
    auctionId: PromiseOrValue<BigNumberish>,
    canceledBy: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  createAuction(
    tokenId: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    maxDuration: PromiseOrValue<BigNumberish>,
    initiator: PromiseOrValue<string>,
    initiatorFeeNumerator: PromiseOrValue<BigNumberish>,
    initiatorFeeDenominator: PromiseOrValue<BigNumberish>,
    reserve: PromiseOrValue<BigNumberish>,
    stack: ILienToken.AuctionStackStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  createBid(
    tokenId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  endAuction(
    auctionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  getAuctionData(
    _auctionId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, string] & {
      amount: BigNumber
      duration: BigNumber
      firstBidTime: BigNumber
      reservePrice: BigNumber
      bidder: string
    }
  >

  minBidIncrementDenominator(overrides?: CallOverrides): Promise<number>

  minBidIncrementNumerator(overrides?: CallOverrides): Promise<number>

  owner(overrides?: CallOverrides): Promise<string>

  setAuthority(
    newAuthority: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  timeBuffer(overrides?: CallOverrides): Promise<number>

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  weth(overrides?: CallOverrides): Promise<string>

  callStatic: {
    auctionExists(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>

    authority(overrides?: CallOverrides): Promise<string>

    cancelAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      canceledBy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    createAuction(
      tokenId: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maxDuration: PromiseOrValue<BigNumberish>,
      initiator: PromiseOrValue<string>,
      initiatorFeeNumerator: PromiseOrValue<BigNumberish>,
      initiatorFeeDenominator: PromiseOrValue<BigNumberish>,
      reserve: PromiseOrValue<BigNumberish>,
      stack: ILienToken.AuctionStackStruct[],
      overrides?: CallOverrides
    ): Promise<void>

    createBid(
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    endAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>

    getAuctionData(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string] & {
        amount: BigNumber
        duration: BigNumber
        firstBidTime: BigNumber
        reservePrice: BigNumber
        bidder: string
      }
    >

    minBidIncrementDenominator(overrides?: CallOverrides): Promise<number>

    minBidIncrementNumerator(overrides?: CallOverrides): Promise<number>

    owner(overrides?: CallOverrides): Promise<string>

    setAuthority(
      newAuthority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    timeBuffer(overrides?: CallOverrides): Promise<number>

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    weth(overrides?: CallOverrides): Promise<string>
  }

  filters: {
    'AuctionBid(uint256,address,uint256,bool,bool)'(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      sender?: null,
      value?: null,
      firstBid?: null,
      extended?: null
    ): AuctionBidEventFilter
    AuctionBid(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      sender?: null,
      value?: null,
      firstBid?: null,
      extended?: null
    ): AuctionBidEventFilter

    'AuctionCanceled(uint256)'(
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): AuctionCanceledEventFilter
    AuctionCanceled(
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): AuctionCanceledEventFilter

    'AuctionCreated(uint256,uint256,uint256)'(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      duration?: null,
      reservePrice?: null
    ): AuctionCreatedEventFilter
    AuctionCreated(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      duration?: null,
      reservePrice?: null
    ): AuctionCreatedEventFilter

    'AuctionDurationExtended(uint256,uint256)'(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      duration?: null
    ): AuctionDurationExtendedEventFilter
    AuctionDurationExtended(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      duration?: null
    ): AuctionDurationExtendedEventFilter

    'AuctionEnded(uint256,address,uint256)'(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      winningBid?: null
    ): AuctionEndedEventFilter
    AuctionEnded(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      winningBid?: null
    ): AuctionEndedEventFilter

    'AuthorityUpdated(address,address)'(
      user?: PromiseOrValue<string> | null,
      newAuthority?: PromiseOrValue<string> | null
    ): AuthorityUpdatedEventFilter
    AuthorityUpdated(
      user?: PromiseOrValue<string> | null,
      newAuthority?: PromiseOrValue<string> | null
    ): AuthorityUpdatedEventFilter

    'OwnershipTransferred(address,address)'(
      user?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter
    OwnershipTransferred(
      user?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter
  }

  estimateGas: {
    auctionExists(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    authority(overrides?: CallOverrides): Promise<BigNumber>

    cancelAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      canceledBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    createAuction(
      tokenId: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maxDuration: PromiseOrValue<BigNumberish>,
      initiator: PromiseOrValue<string>,
      initiatorFeeNumerator: PromiseOrValue<BigNumberish>,
      initiatorFeeDenominator: PromiseOrValue<BigNumberish>,
      reserve: PromiseOrValue<BigNumberish>,
      stack: ILienToken.AuctionStackStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    createBid(
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    endAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    getAuctionData(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    minBidIncrementDenominator(overrides?: CallOverrides): Promise<BigNumber>

    minBidIncrementNumerator(overrides?: CallOverrides): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    setAuthority(
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    timeBuffer(overrides?: CallOverrides): Promise<BigNumber>

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    weth(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    auctionExists(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    authority(overrides?: CallOverrides): Promise<PopulatedTransaction>

    cancelAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      canceledBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    createAuction(
      tokenId: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maxDuration: PromiseOrValue<BigNumberish>,
      initiator: PromiseOrValue<string>,
      initiatorFeeNumerator: PromiseOrValue<BigNumberish>,
      initiatorFeeDenominator: PromiseOrValue<BigNumberish>,
      reserve: PromiseOrValue<BigNumberish>,
      stack: ILienToken.AuctionStackStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    createBid(
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    endAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    getAuctionData(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    minBidIncrementDenominator(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    minBidIncrementNumerator(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    setAuthority(
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    timeBuffer(overrides?: CallOverrides): Promise<PopulatedTransaction>

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}

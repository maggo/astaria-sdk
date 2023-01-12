/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common'

export declare namespace ILienToken {
  export type DetailsStruct = {
    maxAmount: PromiseOrValue<BigNumberish>
    rate: PromiseOrValue<BigNumberish>
    duration: PromiseOrValue<BigNumberish>
    maxPotentialDebt: PromiseOrValue<BigNumberish>
    liquidationInitialAsk: PromiseOrValue<BigNumberish>
  }

  export type DetailsStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    maxAmount: BigNumber
    rate: BigNumber
    duration: BigNumber
    maxPotentialDebt: BigNumber
    liquidationInitialAsk: BigNumber
  }

  export type LienStruct = {
    collateralType: PromiseOrValue<BigNumberish>
    token: PromiseOrValue<string>
    vault: PromiseOrValue<string>
    strategyRoot: PromiseOrValue<BytesLike>
    collateralId: PromiseOrValue<BigNumberish>
    details: ILienToken.DetailsStruct
  }

  export type LienStructOutput = [
    number,
    string,
    string,
    string,
    BigNumber,
    ILienToken.DetailsStructOutput
  ] & {
    collateralType: number
    token: string
    vault: string
    strategyRoot: string
    collateralId: BigNumber
    details: ILienToken.DetailsStructOutput
  }

  export type PointStruct = {
    amount: PromiseOrValue<BigNumberish>
    last: PromiseOrValue<BigNumberish>
    end: PromiseOrValue<BigNumberish>
    lienId: PromiseOrValue<BigNumberish>
  }

  export type PointStructOutput = [BigNumber, number, number, BigNumber] & {
    amount: BigNumber
    last: number
    end: number
    lienId: BigNumber
  }

  export type StackStruct = {
    lien: ILienToken.LienStruct
    point: ILienToken.PointStruct
  }

  export type StackStructOutput = [
    ILienToken.LienStructOutput,
    ILienToken.PointStructOutput
  ] & {
    lien: ILienToken.LienStructOutput
    point: ILienToken.PointStructOutput
  }
}

export declare namespace IUniqueValidator {
  export type DetailsStruct = {
    version: PromiseOrValue<BigNumberish>
    token: PromiseOrValue<string>
    tokenId: PromiseOrValue<BigNumberish>
    borrower: PromiseOrValue<string>
    lien: ILienToken.DetailsStruct
  }

  export type DetailsStructOutput = [
    number,
    string,
    BigNumber,
    string,
    ILienToken.DetailsStructOutput
  ] & {
    version: number
    token: string
    tokenId: BigNumber
    borrower: string
    lien: ILienToken.DetailsStructOutput
  }
}

export declare namespace IAstariaRouter {
  export type StrategyDetailsParamStruct = {
    version: PromiseOrValue<BigNumberish>
    deadline: PromiseOrValue<BigNumberish>
    vault: PromiseOrValue<string>
  }

  export type StrategyDetailsParamStructOutput = [number, BigNumber, string] & {
    version: number
    deadline: BigNumber
    vault: string
  }

  export type MerkleDataStruct = {
    root: PromiseOrValue<BytesLike>
    proof: PromiseOrValue<BytesLike>[]
  }

  export type MerkleDataStructOutput = [string, string[]] & {
    root: string
    proof: string[]
  }

  export type NewLienRequestStruct = {
    strategy: IAstariaRouter.StrategyDetailsParamStruct
    stack: ILienToken.StackStruct[]
    nlrDetails: PromiseOrValue<BytesLike>
    merkle: IAstariaRouter.MerkleDataStruct
    amount: PromiseOrValue<BigNumberish>
    v: PromiseOrValue<BigNumberish>
    r: PromiseOrValue<BytesLike>
    s: PromiseOrValue<BytesLike>
  }

  export type NewLienRequestStructOutput = [
    IAstariaRouter.StrategyDetailsParamStructOutput,
    ILienToken.StackStructOutput[],
    string,
    IAstariaRouter.MerkleDataStructOutput,
    BigNumber,
    number,
    string,
    string
  ] & {
    strategy: IAstariaRouter.StrategyDetailsParamStructOutput
    stack: ILienToken.StackStructOutput[]
    nlrDetails: string
    merkle: IAstariaRouter.MerkleDataStructOutput
    amount: BigNumber
    v: number
    r: string
    s: string
  }
}

export interface UniqueValidatorInterface extends utils.Interface {
  functions: {
    'VERSION_TYPE()': FunctionFragment
    'assembleLeaf((uint8,address,uint256,address,(uint256,uint256,uint256,uint256,uint256)))': FunctionFragment
    'getLeafDetails(bytes)': FunctionFragment
    'validateAndParse(((uint8,uint256,address),((uint8,address,address,bytes32,uint256,(uint256,uint256,uint256,uint256,uint256)),(uint88,uint40,uint40,uint256))[],bytes,(bytes32,bytes32[]),uint256,uint8,bytes32,bytes32),address,address,uint256)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'VERSION_TYPE'
      | 'assembleLeaf'
      | 'getLeafDetails'
      | 'validateAndParse'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'VERSION_TYPE',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'assembleLeaf',
    values: [IUniqueValidator.DetailsStruct]
  ): string
  encodeFunctionData(
    functionFragment: 'getLeafDetails',
    values: [PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(
    functionFragment: 'validateAndParse',
    values: [
      IAstariaRouter.NewLienRequestStruct,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string

  decodeFunctionResult(
    functionFragment: 'VERSION_TYPE',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'assembleLeaf',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'getLeafDetails',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'validateAndParse',
    data: BytesLike
  ): Result

  events: {}
}

export interface UniqueValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: UniqueValidatorInterface

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
    VERSION_TYPE(overrides?: CallOverrides): Promise<[number]>

    assembleLeaf(
      details: IUniqueValidator.DetailsStruct,
      overrides?: CallOverrides
    ): Promise<[string]>

    getLeafDetails(
      nlrDetails: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[IUniqueValidator.DetailsStructOutput]>

    validateAndParse(
      params: IAstariaRouter.NewLienRequestStruct,
      borrower: PromiseOrValue<string>,
      collateralTokenContract: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, ILienToken.DetailsStructOutput] & {
        leaf: string
        ld: ILienToken.DetailsStructOutput
      }
    >
  }

  VERSION_TYPE(overrides?: CallOverrides): Promise<number>

  assembleLeaf(
    details: IUniqueValidator.DetailsStruct,
    overrides?: CallOverrides
  ): Promise<string>

  getLeafDetails(
    nlrDetails: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<IUniqueValidator.DetailsStructOutput>

  validateAndParse(
    params: IAstariaRouter.NewLienRequestStruct,
    borrower: PromiseOrValue<string>,
    collateralTokenContract: PromiseOrValue<string>,
    collateralTokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, ILienToken.DetailsStructOutput] & {
      leaf: string
      ld: ILienToken.DetailsStructOutput
    }
  >

  callStatic: {
    VERSION_TYPE(overrides?: CallOverrides): Promise<number>

    assembleLeaf(
      details: IUniqueValidator.DetailsStruct,
      overrides?: CallOverrides
    ): Promise<string>

    getLeafDetails(
      nlrDetails: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IUniqueValidator.DetailsStructOutput>

    validateAndParse(
      params: IAstariaRouter.NewLienRequestStruct,
      borrower: PromiseOrValue<string>,
      collateralTokenContract: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, ILienToken.DetailsStructOutput] & {
        leaf: string
        ld: ILienToken.DetailsStructOutput
      }
    >
  }

  filters: {}

  estimateGas: {
    VERSION_TYPE(overrides?: CallOverrides): Promise<BigNumber>

    assembleLeaf(
      details: IUniqueValidator.DetailsStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    getLeafDetails(
      nlrDetails: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    validateAndParse(
      params: IAstariaRouter.NewLienRequestStruct,
      borrower: PromiseOrValue<string>,
      collateralTokenContract: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    VERSION_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>

    assembleLeaf(
      details: IUniqueValidator.DetailsStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    getLeafDetails(
      nlrDetails: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    validateAndParse(
      params: IAstariaRouter.NewLienRequestStruct,
      borrower: PromiseOrValue<string>,
      collateralTokenContract: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}

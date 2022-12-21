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
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common'

export declare namespace IFlashAction {
  export type UnderlyingStruct = {
    token: PromiseOrValue<string>
    tokenId: PromiseOrValue<BigNumberish>
  }

  export type UnderlyingStructOutput = [string, BigNumber] & {
    token: string
    tokenId: BigNumber
  }
}

export interface IFlashActionInterface extends utils.Interface {
  functions: {
    'onFlashAction((address,uint256),bytes)': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'onFlashAction'): FunctionFragment

  encodeFunctionData(
    functionFragment: 'onFlashAction',
    values: [IFlashAction.UnderlyingStruct, PromiseOrValue<BytesLike>]
  ): string

  decodeFunctionResult(
    functionFragment: 'onFlashAction',
    data: BytesLike
  ): Result

  events: {}
}

export interface IFlashAction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: IFlashActionInterface

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
    onFlashAction(
      arg0: IFlashAction.UnderlyingStruct,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>
  }

  onFlashAction(
    arg0: IFlashAction.UnderlyingStruct,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    onFlashAction(
      arg0: IFlashAction.UnderlyingStruct,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>
  }

  filters: {}

  estimateGas: {
    onFlashAction(
      arg0: IFlashAction.UnderlyingStruct,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    onFlashAction(
      arg0: IFlashAction.UnderlyingStruct,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>
  }
}
import { z } from 'zod';

import { AddressZero } from '../constants.js';
import {
  AddressSchema,
  HexSchema,
  Int24Schema,
  Uint24Schema,
  Uint128Schema,
  Uint256NonZeroSchema,
  Uint256Schema,
} from './helpers.js';

export enum StrategyLeafType {
  Collateral = '1',
  Collection = '2',
  ERC20 = '4',
  UniV3Collateral = '3',
}

/**
 * StrategyDetails
 */
export const StrategyDetailsSchema = z.object({
  /** `uint256` - Date past which strategy is no longer considered valid */
  expiration: Uint256Schema,
  /** `uint256` - Value tracked on chain starting from 0 at the Vault opening. Incrementing the nonce on chain invalidates all lower strategies */
  nonce: Uint256Schema,
  /** `address` - Contract address of the vault, if the vault address is ZeroHex then this is the first merkle tree opening the vault */
  vault: AddressSchema,
  /** `uint8` - Version of strategy format (`0`) */
  version: z.number(),
});

/**
 * Lien
 */
export const LienSchema = z.object({
  /** `uint256` - Amount of $WETH in 10**18 that the borrower can borrow */
  amount: Uint256NonZeroSchema,

  /** `uint32` - Maximum life of the lien without refinancing in epoch seconds 10**18 */
  duration: Uint256NonZeroSchema,

  /** `uint256` - the value used as the starting price in the event of a liquidation dutch auction */
  liquidationInitialAsk: Uint256NonZeroSchema,

  /** `uint256` - a maximum total value of all liens higher in the lien queue calculated using their rate and remaining duration. Value is `$WETH` expressed as `10**18`. A zero value indicates that the lien must be in the most senior position */
  maxPotentialDebt: Uint256Schema,

  /** `uint256` - Rate of interest accrual for the lien expressed as interest per second 10**18 */
  rate: Uint256Schema,
});

const BaseDetailsSchema = z.object({
  /** `address` - Address of the borrower that can commit to the lien, If the value is `address(0)` then any borrower can commit to the lien */
  borrower: AddressSchema.optional().default(AddressZero),
  cid: z.string().optional(),
  leaf: HexSchema.optional(),
  /** `Lien` - Lien data */
  lien: LienSchema,
  /** `address` - Address of the underlying NFT Contract*/
  token: AddressSchema,
});

export const CollateralSchema = BaseDetailsSchema.extend({
  /** `uint256` - Token ID of ERC721 inside the collection */
  tokenId: Uint256Schema,
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.Collateral),
});

export const CollectionSchema = BaseDetailsSchema.extend({
  /** `uint8` - Type of leaf format (`Collection = 2`) */
  type: z.literal(StrategyLeafType.Collection),
});

export const UniV3CollateralSchema = BaseDetailsSchema.extend({
  /** `uint256` - Amount0Min*/
  amount0Min: Uint256Schema,
  /** `uint256` - Amount1Min*/
  amount1Min: Uint256Schema,
  /** `uint24` - Fee*/
  fee: Uint24Schema,
  /** `uint128` - MinLiquidity*/
  minLiquidity: Uint128Schema,
  /** `int24` - TickLower*/
  tickLower: Int24Schema,
  /** `int24` - TickUpper*/
  tickUpper: Int24Schema,
  /** `address` - Token0*/
  token0: AddressSchema,
  /** `address` - Token1*/
  token1: AddressSchema,
  /** `uint8` - Type of leaf format (`UniV3Collateral = 3`) */
  type: z.literal(StrategyLeafType.UniV3Collateral),
});

export const ERC20CollateralSchema = BaseDetailsSchema.extend({
  /** `uint256` - minimum amount of the depost token */
  minAmount: Uint256Schema,
  /** `uint256` - ratio of the deposit token to underlying tokens */
  ratioToUnderlying: Uint256Schema,
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.ERC20),
});

export const StrategyRowSchema = z.discriminatedUnion('type', [
  CollateralSchema,
  CollectionSchema,
  UniV3CollateralSchema,
  ERC20CollateralSchema,
]);

export const DynamicVaultDetailSchema = z.object({
  address: AddressSchema,
  balance: Uint256Schema,
  delegate: AddressSchema,
  isReadyState: z.boolean(),
  nonce: Uint256Schema,
});

export const BaseOfferSchema = BaseDetailsSchema.extend({
  balance: Uint256Schema.optional(),
  offerHash: HexSchema,
  underlyingTokenId: Uint256Schema.optional(),
  vault: AddressSchema,
});

export const CollateralOfferSchema = BaseOfferSchema.extend({
  tokenId: Uint256Schema,
  type: z.literal(StrategyLeafType.Collateral),
});

export const CollectionOfferSchema = BaseOfferSchema.extend({
  type: z.literal(StrategyLeafType.Collection),
});

export const UniV3CollateralOfferSchema = BaseOfferSchema.extend({
  /** `uint256` - Amount0Min*/
  amount0Min: Uint256Schema,
  /** `uint256` - Amount1Min*/
  amount1Min: Uint256Schema,
  /** `uint24` - Fee*/
  fee: Uint24Schema,
  /** `uint128` - MinLiquidity*/
  minLiquidity: Uint128Schema,
  /** `int24` - TickLower*/
  tickLower: Int24Schema,
  /** `int24` - TickUpper*/
  tickUpper: Int24Schema,
  /** `address` - Token0*/
  token0: AddressSchema,
  /** `address` - Token1*/
  token1: AddressSchema,
  /** `uint8` - Type of leaf format (`UniV3Collateral = 3`) */
  type: z.literal(StrategyLeafType.UniV3Collateral),
});

export const ERC20OfferSchema = BaseOfferSchema.extend({
  /** `uint256` - minimum amount of the depost token */
  minAmount: Uint256Schema,
  /** `uint256` - ratio of the deposit token to underlying tokens */
  ratioToUnderlying: Uint256Schema,
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.ERC20),
});

export const UniqueOfferSchema = z.discriminatedUnion<
  'type',
  [
    typeof CollateralOfferSchema,
    typeof CollectionOfferSchema,
    typeof ERC20OfferSchema,
  ]
>('type', [
  CollateralOfferSchema,
  CollectionOfferSchema,
  ERC20OfferSchema,
  // add UniV3OfferSchema once the service is ready
]);

export const StrategySchema = z.array(StrategyRowSchema);

export const TypeSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export const TypesSchema = z.object({
  StrategyDetails: z.array(TypeSchema),
});

export const EthersTypesSchema = z.object({
  StrategyDetails: z.array(TypeSchema),
});

export const DomainSchema = z.object({
  chainId: z.number(),
  verifyingContract: AddressSchema,
  version: z.string(),
});

export const MessageSchema = z.object({
  deadline: z.string(),
  nonce: z.string(),
  root: HexSchema,
});

export const TypedDataSchema = z.object({
  domain: DomainSchema,
  message: MessageSchema,
  primaryType: z.string(),
  types: TypesSchema,
});

export const EthersTypedDataSchema = z.object({
  domain: DomainSchema,
  message: MessageSchema,
  primaryType: z.string(),
  types: EthersTypesSchema,
});

export const IPFSStrategyPayloadSchema = z.object({
  signature: HexSchema,
  strategy: StrategySchema,
  typedData: TypedDataSchema,
});

export const MerkleDataStructSchema = z.object({
  proof: HexSchema.array(),
  root: HexSchema,
});

export const ProofServiceResponseSchema = z.object({
  cid: z.string(),
  proof: HexSchema.array(),
  signature: HexSchema,
  typedData: TypedDataSchema,
});

export type Lien = z.infer<typeof LienSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type Collateral = z.infer<typeof CollateralSchema>;
export type UniV3Collateral = z.infer<typeof UniV3CollateralSchema>;
export type Erc20Collateral = z.infer<typeof ERC20CollateralSchema>;
export type StrategyDetails = z.infer<typeof StrategyDetailsSchema>;
export type StrategyRow = z.infer<typeof StrategyRowSchema>;
export type Strategy = z.infer<typeof StrategySchema>;
export type Type = z.infer<typeof TypeSchema>;
export type Types = z.infer<typeof TypesSchema>;
export type domain = z.infer<typeof DomainSchema>;
export type message = z.infer<typeof MessageSchema>;
export type TypedData = z.infer<typeof TypedDataSchema>;
export type EthersTypedData = z.infer<typeof EthersTypedDataSchema>;
export type Signature = z.infer<typeof HexSchema>;
export type IPFSStrategyPayload = z.infer<typeof IPFSStrategyPayloadSchema>;
export type ProofServiceResponse = z.infer<typeof ProofServiceResponseSchema>;
export type MerkleDataStruct = z.infer<typeof MerkleDataStructSchema>;
export type UniqueOffer = z.infer<typeof UniqueOfferSchema>;
export type DynamicVaultDetail = z.infer<typeof DynamicVaultDetailSchema>;

import { z } from 'zod'
import {
  Int24Schema,
  HexSchema,
  AddressSchema,
  Uint24Schema,
  Uint128Schema,
  Uint256Schema,
  Uint256NonZeroSchema,
} from './helpers'

export const AddressZero = '0x0000000000000000000000000000000000000000'
export enum StrategyLeafType {
  Collateral = '1',
  Collection = '2',
  UniV3Collateral = '3',
  ERC20 = '4',
}

/**
 * StrategyDetails
 */
export const StrategyDetailsSchema = z.object({
  /** `uint8` - Version of strategy format (`0`) */
  version: z.number(),

  /** `uint256` - Date past which strategy is no longer considered valid */
  expiration: Uint256Schema,

  /** `uint256` - Value tracked on chain starting from 0 at the Vault opening. Incrementing the nonce on chain invalidates all lower strategies */
  nonce: Uint256Schema,

  /** `address` - Contract address of the vault, if the vault address is ZeroHex then this is the first merkle tree opening the vault */
  vault: AddressSchema,
})

/**
 * Lien
 */
export const LienSchema = z.object({
  /** `uint256` - Amount of $WETH in 10**18 that the borrower can borrow */
  amount: Uint256NonZeroSchema,

  /** `uint256` - Rate of interest accrual for the lien expressed as interest per second 10**18 */
  rate: Uint256Schema,

  /** `uint32` - Maximum life of the lien without refinancing in epoch seconds 10**18 */
  duration: Uint256NonZeroSchema,

  /** `uint256` - a maximum total value of all liens higher in the lien queue calculated using their rate and remaining duration. Value is `$WETH` expressed as `10**18`. A zero value indicates that the lien must be in the most senior position */
  maxPotentialDebt: Uint256Schema,

  /** `uint256` - the value used as the starting price in the event of a liquidation dutch auction */
  liquidationInitialAsk: Uint256NonZeroSchema,
})

const BaseDetailsSchema = z.object({
  /** `address` - Address of the underlying NFT Contract*/
  token: AddressSchema,

  /** `address` - Address of the borrower that can commit to the lien, If the value is `address(0)` then any borrower can commit to the lien */
  borrower: AddressSchema.optional().default(AddressZero),

  /** `Lien` - Lien data */
  lien: LienSchema,

  cid: z.string().optional(),

  leaf: HexSchema.optional(),
})

export const CollateralSchema = BaseDetailsSchema.extend({
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.Collateral),

  /** `uint256` - Token ID of ERC721 inside the collection */
  tokenId: Uint256Schema,
})

export const CollectionSchema = BaseDetailsSchema.extend({
  /** `uint8` - Type of leaf format (`Collection = 2`) */
  type: z.literal(StrategyLeafType.Collection),
})

export const UniV3CollateralSchema = BaseDetailsSchema.extend({
  /** `uint8` - Type of leaf format (`UniV3Collateral = 3`) */
  type: z.literal(StrategyLeafType.UniV3Collateral),

  /** `address` - Token0*/
  token0: AddressSchema,

  /** `address` - Token1*/
  token1: AddressSchema,

  /** `uint24` - Fee*/
  fee: Uint24Schema,

  /** `int24` - TickLower*/
  tickLower: Int24Schema,

  /** `int24` - TickUpper*/
  tickUpper: Int24Schema,

  /** `uint128` - MinLiquidity*/
  minLiquidity: Uint128Schema,

  /** `uint256` - Amount0Min*/
  amount0Min: Uint256Schema,

  /** `uint256` - Amount1Min*/
  amount1Min: Uint256Schema,
})

export const ERC20CollateralSchema = BaseDetailsSchema.extend({
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.ERC20),

  /** `uint256` - minimum amount of the depost token */
  minAmount: Uint256Schema,

  /** `uint256` - ratio of the deposit token to underlying tokens */
  ratioToUnderlying: Uint256Schema,
})

export const StrategyRowSchema = z.discriminatedUnion('type', [
  CollateralSchema,
  CollectionSchema,
  UniV3CollateralSchema,
  ERC20CollateralSchema,
])

export const DynamicVaultDetailSchema = z.object({
  address: AddressSchema,
  delegate: AddressSchema,
  nonce: Uint256Schema,
  balance: Uint256Schema,
  isReadyState: z.boolean(),
})

export const BaseOfferSchema = BaseDetailsSchema.extend({
  vault: AddressSchema,
  underlyingTokenId: Uint256Schema.optional(),
  offerHash: HexSchema,
  balance: Uint256Schema.optional(),
})

export const CollateralOfferSchema = BaseOfferSchema.extend({
  type: z.literal(StrategyLeafType.Collateral),
  tokenId: Uint256Schema,
})

export const CollectionOfferSchema = BaseOfferSchema.extend({
  type: z.literal(StrategyLeafType.Collection),
})

export const UniV3CollateralOfferSchema = BaseOfferSchema.extend({
  /** `uint8` - Type of leaf format (`UniV3Collateral = 3`) */
  type: z.literal(StrategyLeafType.UniV3Collateral),

  /** `address` - Token0*/
  token0: AddressSchema,

  /** `address` - Token1*/
  token1: AddressSchema,

  /** `uint24` - Fee*/
  fee: Uint24Schema,

  /** `int24` - TickLower*/
  tickLower: Int24Schema,

  /** `int24` - TickUpper*/
  tickUpper: Int24Schema,

  /** `uint128` - MinLiquidity*/
  minLiquidity: Uint128Schema,

  /** `uint256` - Amount0Min*/
  amount0Min: Uint256Schema,

  /** `uint256` - Amount1Min*/
  amount1Min: Uint256Schema,
})

export const ERC20OfferSchema = BaseOfferSchema.extend({
  /** `uint8` - Type of leaf format (`Collateral = 1`) */
  type: z.literal(StrategyLeafType.ERC20),

  /** `uint256` - minimum amount of the depost token */
  minAmount: Uint256Schema,

  /** `uint256` - ratio of the deposit token to underlying tokens */
  ratioToUnderlying: Uint256Schema,
})

export const UniqueOfferSchema = z.discriminatedUnion<
  'type',
  [
    typeof CollateralOfferSchema,
    typeof CollectionOfferSchema,
    typeof ERC20OfferSchema
  ]
>('type', [
  CollateralOfferSchema,
  CollectionOfferSchema,
  ERC20OfferSchema,
  // add UniV3OfferSchema once the service is ready
])

export const StrategySchema = z.array(StrategyRowSchema)

export const TypeSchema = z.object({
  name: z.string(),
  type: z.string(),
})

export const TypesSchema = z.object({
  StrategyDetails: z.array(TypeSchema),
})

export const EthersTypesSchema = z.object({
  StrategyDetails: z.array(TypeSchema),
})

export const DomainSchema = z.object({
  version: z.string(),
  chainId: z.number(),
  verifyingContract: AddressSchema,
})

export const MessageSchema = z.object({
  nonce: z.string(),
  deadline: z.string(),
  root: HexSchema,
})

export const TypedDataSchema = z.object({
  types: TypesSchema,
  primaryType: z.string(),
  domain: DomainSchema,
  message: MessageSchema,
})

export const EthersTypedDataSchema = z.object({
  types: EthersTypesSchema,
  primaryType: z.string(),
  domain: DomainSchema,
  message: MessageSchema,
})

export const IPFSStrategyPayloadSchema = z.object({
  typedData: TypedDataSchema,
  signature: HexSchema,
  strategy: StrategySchema,
})

export const MerkleDataStructSchema = z.object({
  root: HexSchema,
  proof: HexSchema.array(),
})

export const ProofServiceResponseSchema = z.object({
  proof: HexSchema.array(),
  cid: z.string(),
  typedData: TypedDataSchema,
  signature: HexSchema,
})

export type Lien = z.infer<typeof LienSchema>
export type Collection = z.infer<typeof CollectionSchema>
export type Collateral = z.infer<typeof CollateralSchema>
export type UniV3Collateral = z.infer<typeof UniV3CollateralSchema>
export type Erc20Collateral = z.infer<typeof ERC20CollateralSchema>
export type StrategyDetails = z.infer<typeof StrategyDetailsSchema>
export type StrategyRow = z.infer<typeof StrategyRowSchema>
export type Strategy = z.infer<typeof StrategySchema>
export type Type = z.infer<typeof TypeSchema>
export type Types = z.infer<typeof TypesSchema>
export type domain = z.infer<typeof DomainSchema>
export type message = z.infer<typeof MessageSchema>
export type TypedData = z.infer<typeof TypedDataSchema>
export type EthersTypedData = z.infer<typeof EthersTypedDataSchema>
export type Signature = z.infer<typeof HexSchema>
export type IPFSStrategyPayload = z.infer<typeof IPFSStrategyPayloadSchema>
export type ProofServiceResponse = z.infer<typeof ProofServiceResponseSchema>
export type MerkleDataStruct = z.infer<typeof MerkleDataStructSchema>
export type UniqueOffer = z.infer<typeof UniqueOfferSchema>
export type DynamicVaultDetail = z.infer<typeof DynamicVaultDetailSchema>

import { z } from 'zod'

export const SignedHexSchema = z.custom<`${'-' | ''}0x${string}`>(
  (val) => typeof val === 'string' && /^[-]{0,1}0x[a-fA-F0-9]*$/.test(val)
)

export const HexSchema = z.custom<`0x${string}`>(
  (val) => typeof val === 'string' && /^0x[a-fA-F0-9]*$/.test(val)
)

export const AddressSchema = HexSchema.refine(
  (val) => val.length === 42,
  'Invalid address length'
).transform((val) => val.toLowerCase() as `0x${string}`)

export const WAD = BigInt('1000000000000000000')

export const ObjectToBigIntSchema = z
  .object({ hex: HexSchema, type: z.literal('BigInt') })
  .transform((val, ctx) => {
    try {
      return BigInt(val.hex)
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigInt',
      })
      return z.NEVER
    }
  })
export const ObjectToSignedBigIntSchema = z
  .object({ hex: SignedHexSchema, type: z.literal('BigInt') })
  .transform((val, ctx) => {
    try {
      return BigInt(val.hex)
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigInt',
      })
      return z.NEVER
    }
  })

export const UintStringToBigIntSchema = z
  .string()
  .regex(/d*/)
  .transform((val, ctx) => {
    try {
      return BigInt(val)
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigInt',
      })
      return z.NEVER
    }
  })

export const IntStringToBigIntSchema = z
  .string()
  .regex(/^[-]{0,1}\d+$/)
  .transform((val, ctx) => {
    try {
      return BigInt(val)
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigInt',
      })
      return z.NEVER
    }
  })

export const UintBigIntSchema = z.union([
  z.bigint(),
  ObjectToBigIntSchema,
  UintStringToBigIntSchema,
])

export const IntBigIntSchema = z.union([
  z.bigint(),
  ObjectToSignedBigIntSchema,
  IntStringToBigIntSchema,
])

const UINT24MAX = 2n ** 24n - 1n
const UINT128MAX = 2n ** 128n - 1n
const UINT256MAX = 2n ** 256n - 1n

const INT24MIN = (UINT24MAX / 2n - 1n) * -1n
const INT24MAX = UINT24MAX / 2n

export const Uint24Schema = UintBigIntSchema.refine(
  (val) => val <= UINT24MAX,
  'Cannot exceed (2^24) - 1'
)

export const Uint128Schema = UintBigIntSchema.refine(
  (val) => val <= UINT128MAX,
  'Cannot exceed (2^128) - 1'
)

export const Uint256Schema = UintBigIntSchema.refine(
  (val) => val <= UINT256MAX,
  'Cannot exceed (2^256) - 1'
)
export const Uint256NonZeroSchema = Uint256Schema.refine(
  (val) => val > 0n,
  'Cannot be zero'
)

export const Int24Schema = IntBigIntSchema.refine(
  (val) => val >= INT24MIN && val <= INT24MAX,
  'Invalid Int24 value'
)

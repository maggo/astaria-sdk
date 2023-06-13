import { z } from 'zod'
import { BigNumber } from 'ethers'

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

export const WAD = BigNumber.from('1000000000000000000')

export const ObjectToBigNumberSchema = z
  .object({ hex: HexSchema, type: z.literal('BigNumber') })
  .transform((val, ctx) => {
    try {
      return BigNumber.from(val.hex)
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigNumber',
      })
      return z.NEVER
    }
  })
export const ObjectToSignedBigNumberSchema = z
  .object({ hex: SignedHexSchema, type: z.literal('BigNumber') })
  .transform((val, ctx) => {
    try {
      return BigNumber.from(val.hex)
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigNumber',
      })
      return z.NEVER
    }
  })

export const UintStringToBigNumberSchema = z
  .string()
  .regex(/d*/)
  .transform((val, ctx) => {
    try {
      return BigNumber.from(val)
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigNumber',
      })
      return z.NEVER
    }
  })

export const IntStringToBigNumberSchema = z
  .string()
  .regex(/^[-]{0,1}\d+$/)
  .transform((val, ctx) => {
    try {
      return BigNumber.from(val)
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Could not parse as BigNumber',
      })
      return z.NEVER
    }
  })

export const UintBigNumberSchema = z.union([
  z.instanceof(BigNumber),
  ObjectToBigNumberSchema,
  UintStringToBigNumberSchema,
])

export const IntBigNumberSchema = z.union([
  z.instanceof(BigNumber),
  ObjectToSignedBigNumberSchema,
  IntStringToBigNumberSchema,
])

const UINT8MAX = 2 ** 8 - 1
const UINT24MAX = BigNumber.from(2).pow(24).sub(1)
const UINT128MAX = BigNumber.from(2).pow(128).sub(1)
const UINT256MAX = BigNumber.from(2).pow(256).sub(1)

const INT24MIN = BigNumber.from(0).sub(UINT24MAX.div(2)).sub(1)
const INT24MAX = BigNumber.from(0).add(UINT24MAX.div(2))

export const Uint8Schema = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === 'number' ? val : Number.parseFloat(val)))
  .refine(
    (val) => Number.isInteger(val) && val >= 0,
    'Must be a positive integer'
  )
  .refine((val) => val <= UINT8MAX, 'Cannot exceed (2^8) - 1')

export const Uint24Schema = UintBigNumberSchema.refine((val) => {
  return val instanceof BigNumber ? val.lte(UINT24MAX) : false
}, 'Cannot exceed (2^24) - 1')

export const Uint128Schema = UintBigNumberSchema.refine((val) => {
  return val instanceof BigNumber ? val.lte(UINT128MAX) : false
}, 'Cannot exceed (2^128) - 1')

export const Uint256Schema = UintBigNumberSchema.refine((val) => {
  return val instanceof BigNumber ? val.lte(UINT256MAX) : false
}, 'Cannot exceed (2^256) - 1')
export const Uint256NonZeroSchema = Uint256Schema.refine((val) => {
  return val instanceof BigNumber ? val.gt(0) : false
}, 'Cannot be zero')

export const Int24Schema = IntBigNumberSchema.refine((val) => {
  return val instanceof BigNumber
    ? val.gte(INT24MIN) && val.lte(INT24MAX)
    : false
}, 'Invalid Int24 value')

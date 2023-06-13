import { Uint8Schema } from '../src/types/helpers'
import { ZodError } from 'zod'

describe('helpers', () => {
  test('Uint8Schema', async () => {
    expect(Uint8Schema.parse(1)).toEqual(1)
    expect(Uint8Schema.parse('2')).toEqual(2)
    expect(Uint8Schema.parse(255)).toEqual(255)
    try {
      Uint8Schema.parse(256)
    } catch (e: any) {
      expect(e).toBeInstanceOf(ZodError)
      expect((e as ZodError).errors[0].message).toEqual(
        'Cannot exceed (2^8) - 1'
      )
    }

    try {
      Uint8Schema.parse('-1')
    } catch (e: any) {
      expect(e).toBeInstanceOf(ZodError)
      expect((e as ZodError).errors[0].message).toEqual(
        'Must be a positive integer'
      )
    }

    try {
      Uint8Schema.parse('1.2')
    } catch (e: any) {
      expect(e).toBeInstanceOf(ZodError)
      expect((e as ZodError).errors[0].message).toEqual(
        'Must be a positive integer'
      )
    }
  })
})

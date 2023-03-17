import { join } from 'path'
import { readFile } from 'fs/promises'
import { Wallet } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { MockProvider } from 'ethereum-waffle'
import { StrategyTree } from '../src/strategy/StrategyTree'
import {
  signRootRemote,
  signRootLocal,
  encodeIPFSStrategyPayload,
  decodeIPFSStrategyPayload,
  verifySignature,
  getTypedData,
} from '../src/strategy/utils'
import { StrategyDetails } from '../src/types'

const Hash = require('ipfs-only-hash')

const sharedMnemonic =
  'junk junk junk junk junk junk junk junk junk junk junk test'

const remoteRoot =
  '0x40c9e8c33c4cf5ff06180afea2e6a3bab45b6bfb4fafca7ec401e4201fded1a9'

const localRoot =
  '0x276a20acb0e3b40e3e98b20030585add5dd1c6c6f53b99b3bc0645809dd3eef0'

describe('util.signRoot using remote', () => {
  jest.setTimeout(90 * 1000)

  test('signs merkle tree root', async () => {
    const provider = new MockProvider({
      ganacheOptions: {
        wallet: {
          mnemonic: sharedMnemonic,
        },
        logging: {
          quiet: true,
        },
      },
    })

    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: BigNumber.from(0),
      nonce: BigNumber.from(0),
      vault: AddressZero,
    }

    const { compact: actual } = await signRootRemote(
      getTypedData(strategy, remoteRoot, verifyingContract, 0),
      provider
    )

    const expected =
      '0x93df081d0c605b582487bf4425e0922e3faa99ebfc7a4b28d325fefac62e71a9711dc4b5f4e03220ee46e4792e6c774788d0fb70f2073589c7ac86f7842a7ea2'

    expect(actual).toEqual(expected)
  })
  test('signs merkle tree root using local', async () => {
    const wallet = Wallet.fromMnemonic(sharedMnemonic)
    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: BigNumber.from(0),
      nonce: BigNumber.from(0),
      vault: AddressZero,
    }

    const { compact: actual } = await signRootLocal(
      getTypedData(strategy, localRoot, verifyingContract, 0),
      wallet
    )

    const expected =
      '0xe0e39ac74826e1724bb789b2dbfb29ff923eac0bab8c9532267dd7b93af2e10020adf36573c078e9610263480e1648624729e015eab4b3db90fdc90a1af5d46a'

    expect(actual).toEqual(expected)
  })

  test('encoding and hashing for IPFS deterministically', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')
    const strategyTree = StrategyTree.fromCSV(csv)

    const root = strategyTree.getHexRoot()
    const wallet = Wallet.fromMnemonic(sharedMnemonic)
    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: BigNumber.from(0),
      nonce: BigNumber.from(0),
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, root, verifyingContract, 0)
    const signature = await signRootLocal(typedData, wallet)
    const strategyPayload = encodeIPFSStrategyPayload(
      typedData,
      signature,
      strategyTree.getStrategy
    )
    const actual = await Hash.of(strategyPayload)
    const expected = 'QmYLBCxovAacZd58rNxV6GcmqbJkVnTGePMYN9EYnLBDKy'

    expect(actual).toEqual(expected)
  })

  test('signs merkle tree root using local then verifies', async () => {
    const wallet = Wallet.fromMnemonic(sharedMnemonic)
    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: BigNumber.from(0),
      nonce: BigNumber.from(0),
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, localRoot, verifyingContract, 0)
    const signature = await signRootLocal(typedData, wallet)

    const actual = verifySignature(typedData, signature)
    const expected = wallet.address.toLowerCase()

    expect(actual).toEqual(expected)
  })

  test('test decode', async () => {
    const json = await readFile(join(__dirname, '__mocks__/test.json'), 'utf8')
    const { strategy, signature, typedData } = decodeIPFSStrategyPayload(json)

    expect(strategy).toBeDefined()

    const actual = verifySignature(typedData, signature)
    const expected = '0x286055c312ac3f939d1409619396ed6a88401d08'

    expect(actual).toEqual(expected)
  })
})

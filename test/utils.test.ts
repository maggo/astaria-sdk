import { join } from 'path'
import { readFile } from 'fs/promises'
import { MockProvider } from 'ethereum-waffle'
import { StrategyTree } from '../src/strategy/StrategyTree'
import {
  signRoot,
  encodeIPFSStrategyPayload,
  decodeIPFSStrategyPayload,
  verifySignature,
  getTypedData,
} from '../src/strategy/utils'
import { AddressZero, StrategyDetails } from '../src/types'
import { HexSchema } from '../src/types/helpers'
import {
  createWalletClient,
  http,
  signatureToHex,
  hexToSignature,
  Address,
} from 'viem'
import { mainnet } from 'viem/chains'
import { mnemonicToAccount } from 'viem/accounts'

const Hash = require('ipfs-only-hash')

const sharedMnemonic =
  'junk junk junk junk junk junk junk junk junk junk junk test'

const remoteRoot =
  '0x40c9e8c33c4cf5ff06180afea2e6a3bab45b6bfb4fafca7ec401e4201fded1a9'

const localRoot =
  '0x276a20acb0e3b40e3e98b20030585add5dd1c6c6f53b99b3bc0645809dd3eef0'

describe('util.signRoot using remote', () => {
  test('signs merkle tree root using local', async () => {
    const client = createWalletClient({
      chain: mainnet,
      transport: http(),
    })
    const account = mnemonicToAccount(sharedMnemonic)
    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: 0n,
      nonce: 0n,
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, localRoot, verifyingContract, 1)
    const actual = await signRoot(typedData, client, account)

    const expected =
      '0x8d058506798e0658e20e26ef7bfabcec9348732f4c5ce038dece985930dba3d46e5f275f139e812d443315c085767444fa4008632b22b60b98246b0581076c081b'

    expect(actual).toEqual(expected)
  })

  test('encoding and hashing for IPFS deterministically', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')
    const strategyTree = StrategyTree.fromCSV(csv)

    const root = HexSchema.parse(strategyTree.getHexRoot())
    const client = createWalletClient({
      chain: mainnet,
      transport: http(),
    })
    const account = mnemonicToAccount(sharedMnemonic)

    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: 0n,
      nonce: 0n,
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, root, verifyingContract, 0)
    const signature = await signRoot(typedData, client, account)
    const strategyPayload = encodeIPFSStrategyPayload(
      typedData,
      signature,
      strategyTree.getStrategy
    )

    const actual = await Hash.of(strategyPayload)
    const expected = 'QmT4aeBqpMTJhMB8y6wyvV4cYdax6nub91JqWaEia2BHuF'

    expect(actual).toEqual(expected)
  })

  // ensure that the encoded and decoded are identical
  test('encoding and hashing for IPFS round trip', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')
    const strategyTree = StrategyTree.fromCSV(csv)

    const root = HexSchema.parse(strategyTree.getHexRoot())
    const client = createWalletClient({
      chain: mainnet,
      transport: http(),
    })
    const account = mnemonicToAccount(sharedMnemonic)

    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: 0n,
      nonce: 0n,
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, root, verifyingContract, 0)
    const signature = await signRoot(typedData, client, account)
    const strategyPayload = encodeIPFSStrategyPayload(
      typedData,
      signature,
      strategyTree.getStrategy
    )

    const expected = await Hash.of(strategyPayload)

    const decoded = decodeIPFSStrategyPayload(strategyPayload)
    const strategyPayloadDecoded = encodeIPFSStrategyPayload(
      decoded.typedData,
      decoded.signature,
      decoded.strategy
    )
    const actual = await Hash.of(strategyPayloadDecoded)

    expect(actual).toEqual(expected)
  })

  test.skip('signs merkle tree root using local then verifies', async () => {
    const client = createWalletClient({
      chain: mainnet,
      transport: http(),
    })
    const account = mnemonicToAccount(sharedMnemonic)

    const verifyingContract = AddressZero
    const strategy: StrategyDetails = {
      version: 0,
      expiration: 0n,
      nonce: 0n,
      vault: AddressZero,
    }
    const typedData = getTypedData(strategy, localRoot, verifyingContract, 0)
    const signature = await signRoot(typedData, client, account)

    const actual = verifySignature(typedData, signature, account.address)
    const expected = account.address.toLowerCase()

    expect(actual).toEqual(expected)
  })

  test.skip('test decode', async () => {
    const json = await readFile(join(__dirname, '__mocks__/test.json'), 'utf8')
    const { strategy, signature, typedData } = decodeIPFSStrategyPayload(json)

    expect(strategy).toBeDefined()

    const expected = '0x49aa4e8210822ccd50b966944d415e5b4667ae3e'

    expect(verifySignature(typedData, signature, expected)).toEqual(true)
  })
})

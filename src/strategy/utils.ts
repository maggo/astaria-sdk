import { JsonRpcProvider } from '@ethersproject/providers'
import {
  keccak256,
  defaultAbiCoder,
  splitSignature,
  joinSignature,
} from 'ethers/lib/utils'
import { Wallet, Signature } from 'ethers'
import invariant from 'tiny-invariant'

import { parse as parseCSV } from 'papaparse'
import {
  Collateral,
  Collection,
  Strategy,
  StrategyLeafType,
  StrategyRow,
  StrategySchema,
  IPFSStrategyPayloadSchema,
  IPFSStrategyPayload,
  TypedData,
  StrategyDetails,
  UniV3Collateral,
} from '../types'
const ethSigUtil = require('eth-sig-util')
const stringify = require('json-stringify-deterministic')

export const hashCollateral = (collateral: Collateral): string => {
  invariant(collateral, 'hashCollateral: collateral must be defined')

  let encode = defaultAbiCoder.encode(
    [
      'uint8',
      'address',
      'uint256',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    [
      collateral.type,
      collateral.token,
      collateral.tokenId,
      collateral.borrower,
      collateral.lien.amount,
      collateral.lien.rate,
      collateral.lien.duration,
      collateral.lien.maxPotentialDebt,
      collateral.lien.liquidationInitialAsk,
    ]
  )

  return keccak256(encode)
}

export const hashUniV3Collateral = (collateral: UniV3Collateral): string => {
  invariant(collateral, 'hashUniV3Collateral: collateral must be defined')

  let encode = defaultAbiCoder.encode(
    [
      'uint8',
      'address',
      'address',

      'address',
      'address',
      'uint24',
      'int24',
      'int24',
      'uint128',
      'uint256',
      'uint256',

      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    [
      collateral.type,
      collateral.token,
      collateral.borrower,

      collateral.token0,
      collateral.token1,
      collateral.fee,
      collateral.tickLower,
      collateral.tickUpper,
      collateral.minLiquidity,
      collateral.amount0Min,
      collateral.amount1Min,

      collateral.lien.amount,
      collateral.lien.rate,
      collateral.lien.duration,
      collateral.lien.maxPotentialDebt,
      collateral.lien.liquidationInitialAsk,
    ]
  )

  return keccak256(encode)
}

export const hashCollection = (collection: Collection): string => {
  invariant(collection, 'hashCollection: collection must be defined')

  const encode = defaultAbiCoder.encode(
    [
      'uint8',
      'address',
      'address',

      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    [
      collection.type,
      collection.token,
      collection.borrower,

      collection.lien.amount,
      collection.lien.rate,
      collection.lien.duration,
      collection.lien.maxPotentialDebt,
      collection.lien.liquidationInitialAsk,
    ]
  )

  return keccak256(encode)
}

export const getStrategyFromCSV = (csv: string): Strategy => {
  return StrategySchema.parse(
    parseCSV(csv, {
      header: true,
      skipEmptyLines: true,
    }).data.map((data: any) => {
      return {
        ...data,
        lien: {
          amount: data?.amount,
          rate: data?.rate,
          duration: data?.duration,
          maxPotentialDebt: data?.maxPotentialDebt,
          liquidationInitialAsk: data?.liquidationInitialAsk,
        },
      }
    })
  )
}
// hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
export const prepareLeaves = (strategy: Strategy): string[] => {
  return strategy.map((row: StrategyRow) => {
    switch (row.type) {
      case StrategyLeafType.Collection: {
        row.leaf = hashCollection(row)
        break
      }

      case StrategyLeafType.Collateral: {
        row.leaf = hashCollateral(row)
        break
      }

      case StrategyLeafType.UniV3Collateral: {
        row.leaf = hashUniV3Collateral(row)
        break
      }
    }
    return row.leaf
  })
}

export const signRootRemote = async (
  typedData: TypedData,
  provider: JsonRpcProvider
) => {
  const signer = provider.getSigner()
  const account = await signer.getAddress()

  const signature = await signer.provider.send('eth_signTypedData_v4', [
    account,
    typedData,
  ])

  return splitSignature(signature)
}

export const signRootLocal = async (typedData: TypedData, wallet: Wallet) => {
  const privateKey = Uint8Array.from(
    Buffer.from(wallet.privateKey.replace('0x', ''), 'hex')
  )
  const signature = ethSigUtil.signTypedData(privateKey, {
    data: typedData,
  })

  return splitSignature(signature)
}

export const verifySignature = (typedData: TypedData, signature: Signature) => {
  const recovered = ethSigUtil.recoverTypedSignature({
    sig: joinSignature(signature),
    data: typedData,
  })

  return recovered
}

export const getTypedData = (
  strategy: StrategyDetails,
  root: string,
  verifyingContract: string,
  chainId: number
): TypedData => {
  return {
    types: {
      EIP712Domain: [
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      StrategyDetails: [
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'root', type: 'bytes32' },
      ],
    },
    primaryType: 'StrategyDetails' as const,
    domain: {
      version: String(strategy.version),
      chainId: chainId,
      verifyingContract: verifyingContract,
    },
    message: {
      nonce: strategy.nonce.toHexString(),
      deadline: strategy.expiration.toString(),
      root: root,
    },
  }
}

export function encodeIPFSStrategyPayload(
  typedData: TypedData,
  signature: Signature,
  strategy: Strategy
): string {
  return stringify({
    typedData: typedData,
    signature: signature,
    strategy: strategy,
  })
}
export const decodeIPFSStrategyPayload = (
  ipfsStrategyPayload: string
): IPFSStrategyPayload => {
  return IPFSStrategyPayloadSchema.parse(JSON.parse(ipfsStrategyPayload))
}

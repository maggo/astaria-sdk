import axios from 'axios'
import { parse as parseCSV } from 'papaparse'
import invariant from 'tiny-invariant'
import { z } from 'zod'

import { getConfig } from '../config'

import {
  encodeAbiParameters,
  parseAbiParameters,
  keccak256,
  type Address,
  WalletClient,
  Account,
  hexToSignature,
  verifyTypedData,
  Hex,
} from 'viem'

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
  ProofServiceResponse,
  MerkleDataStructSchema,
  ProofServiceResponseSchema,
  Signature,
  Erc20Collateral,
} from '../types'

import { AddressSchema, HexSchema } from '../types/helpers'

const stringify = require('json-stringify-deterministic')

export const encodeCollateral = (collateral: Collateral) => {
  invariant(collateral, 'hashCollateral: collateral must be defined')
  const encode = encodeAbiParameters(
    parseAbiParameters(
      'uint8,address,uint256,address,uint256,uint256,uint256,uint256,uint256'
    ),
    [
      parseInt(collateral.type),
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

  return encode
}

export const encodeUniV3Collateral = (collateral: UniV3Collateral) => {
  invariant(collateral, 'hashUniV3Collateral: collateral must be defined')

  let encode = encodeAbiParameters(
    parseAbiParameters(
      'uint8,address,address,address,address,uint24,int24,int24,uint128,uint256,uint256,uint256,uint256,uint256,uint256,uint256'
    ),

    [
      parseInt(collateral.type),
      collateral.token,
      collateral.borrower,

      collateral.token0,
      collateral.token1,
      Number(collateral.fee),
      Number(collateral.tickLower),
      Number(collateral.tickUpper),
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

  return encode
}

export const encodeCollection = (collection: Collection) => {
  invariant(collection, 'hashCollection: collection must be defined')

  const encode = encodeAbiParameters(
    parseAbiParameters(
      'uint8,address,address,uint256,uint256,uint256,uint256,uint256'
    ),
    [
      parseInt(collection.type),
      collection.token,
      collection.borrower,
      collection.lien.amount,
      collection.lien.rate,
      collection.lien.duration,
      collection.lien.maxPotentialDebt,
      collection.lien.liquidationInitialAsk,
    ]
  )

  return encode
}

export const encodeErc20Collateral = (collateral: Erc20Collateral) => {
  invariant(collateral, 'hashCollection: collection must be defined')

  const encode = encodeAbiParameters(
    parseAbiParameters(
      'uint8,address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256'
    ),
    [
      parseInt(collateral.type),
      collateral.token,
      collateral.borrower,
      collateral.minAmount,
      collateral.ratioToUnderlying,
      collateral.lien.amount,
      collateral.lien.rate,
      collateral.lien.duration,
      collateral.lien.maxPotentialDebt,
      collateral.lien.liquidationInitialAsk,
    ]
  )

  return encode
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
    row.leaf = keccak256(encodeNlrDetails(row))
    return row.leaf
  })
}

export const encodeNlrDetails = (row: StrategyRow): Hex => {
  switch (row.type) {
    case StrategyLeafType.Collection: {
      return encodeCollection(row)
    }

    case StrategyLeafType.Collateral: {
      return encodeCollateral(row)
    }

    case StrategyLeafType.UniV3Collateral: {
      return encodeUniV3Collateral(row)
    }

    case StrategyLeafType.ERC20: {
      return encodeErc20Collateral(row)
    }
  }
}

export const signRoot = async (
  typedData: TypedData,
  client: WalletClient,
  account: Account | Address
): Promise<Signature> => {
  return client.signTypedData({
    account,
    ...typedData,
    primaryType: 'StrategyDetails',
  })
}

export const verifySignature = async (
  typedData: TypedData,
  signature: Signature,
  address: Address
): Promise<boolean> => {
  return verifyTypedData({
    address: address,
    ...typedData,
    primaryType: 'StrategyDetails',
    signature: signature,
  })
}

export const getTypedData = (
  strategy: StrategyDetails,
  root: z.infer<typeof HexSchema>,
  verifyingContract: z.infer<typeof AddressSchema>,
  chainId: number
): TypedData => {
  return {
    types: {
      StrategyDetails: [
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'root', type: 'bytes32' },
      ],
    },
    primaryType: 'StrategyDetails',
    domain: {
      version: String(strategy.version),
      chainId: chainId,
      verifyingContract: verifyingContract,
    },
    message: {
      nonce: strategy.nonce.toString(16),
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
  ;(BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }

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

export const convertProofServiceResponseToCommitment = (
  proofServiceResponse: ProofServiceResponse,
  collateral: StrategyRow,
  tokenId: bigint,
  amount: bigint
) => {
  let nlrDetails = encodeNlrDetails(collateral)

  const { root, proof } = MerkleDataStructSchema.parse({
    root: proofServiceResponse.typedData.message.root,
    proof: proofServiceResponse.proof,
  })

  const { v, r, s } = hexToSignature(proofServiceResponse.signature)
  return {
    tokenContract: collateral.token,
    tokenId: tokenId,
    lienRequest: {
      strategy: {
        version: parseInt(proofServiceResponse.typedData.domain.version),
        deadline: BigInt(proofServiceResponse.typedData.message.deadline),
        vault: proofServiceResponse.typedData.domain.verifyingContract,
      },
      nlrDetails,
      root,
      proof,
      amount,
      v: Number(v),
      r,
      s,
    },
  }
}

export const getProofByCidAndLeaf = async (
  cid: string,
  leaf: string
): Promise<ProofServiceResponse> => {
  const { apiBaseURL: API_BASE_URL } = getConfig()
  const PROOF_PATH = 'strategy/proof'
  const response = await axios.get(
    [API_BASE_URL, PROOF_PATH, cid, leaf].join('/'),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return ProofServiceResponseSchema.parse(response?.data)
}

export const getIsValidated = async (
  delegateAddress: string,
  cid: string
): Promise<string> => {
  const { apiBaseURL: API_BASE_URL } = getConfig()
  const VALIDATED_PATH = `${delegateAddress}/${cid}/validated`

  const response = await axios.get([API_BASE_URL, VALIDATED_PATH].join('/'), {
    headers: {
      'Accept-Encoding': 'gzip,deflate,compress',
      'Content-Type': 'application/json',
    },
  })

  return response?.data?.validated
}

import axios from 'axios';
import stringify from 'json-stringify-deterministic';
import { parse as parseCSV } from 'papaparse';
import invariant from 'tiny-invariant';
import {
  type Account,
  type Address,
  type Hex,
  type WalletClient,
  encodeAbiParameters,
  hexToSignature,
  keccak256,
  parseAbiParameters,
  verifyTypedData,
} from 'viem';
import { z } from 'zod';

import { getConfig } from '../config';
import {
  type Collateral,
  type Collection,
  type Erc20Collateral,
  type IPFSStrategyPayload,
  IPFSStrategyPayloadSchema,
  MerkleDataStructSchema,
  type ProofServiceResponse,
  ProofServiceResponseSchema,
  type Signature,
  type Strategy,
  type StrategyDetails,
  StrategyLeafType,
  type StrategyRow,
  StrategySchema,
  type TypedData,
  type UniV3Collateral,
} from '../types';
import { AddressSchema, HexSchema } from '../types/helpers';

export const encodeCollateral = (collateral: Collateral) => {
  invariant(collateral, 'hashCollateral: collateral must be defined');
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
  );

  return encode;
};

export const encodeUniV3Collateral = (collateral: UniV3Collateral) => {
  invariant(collateral, 'hashUniV3Collateral: collateral must be defined');

  const encode = encodeAbiParameters(
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
  );

  return encode;
};

export const encodeCollection = (collection: Collection) => {
  invariant(collection, 'hashCollection: collection must be defined');

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
  );

  return encode;
};

export const encodeErc20Collateral = (collateral: Erc20Collateral) => {
  invariant(collateral, 'hashCollection: collection must be defined');

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
  );

  return encode;
};

export const getStrategyFromCSV = (csv: string): Strategy =>
  StrategySchema.parse(
    parseCSV(csv, {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).data.map((data: any) => ({
      ...data,
      lien: {
        amount: data?.amount,
        duration: data?.duration,
        liquidationInitialAsk: data?.liquidationInitialAsk,
        maxPotentialDebt: data?.maxPotentialDebt,
        rate: data?.rate,
      },
    }))
  );
// hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
export const prepareLeaves = (strategy: Strategy): string[] =>
  strategy.map((row: StrategyRow) => {
    row.leaf = keccak256(encodeNlrDetails(row));
    return row.leaf;
  });

export const encodeNlrDetails = (row: StrategyRow): Hex => {
  switch (row.type) {
    case StrategyLeafType.Collection: {
      return encodeCollection(row);
    }

    case StrategyLeafType.Collateral: {
      return encodeCollateral(row);
    }

    case StrategyLeafType.UniV3Collateral: {
      return encodeUniV3Collateral(row);
    }

    case StrategyLeafType.ERC20: {
      return encodeErc20Collateral(row);
    }
  }
};

export const signRoot = async (
  typedData: TypedData,
  client: WalletClient,
  account: Account | Address
): Promise<Signature> =>
  client.signTypedData({
    account,
    ...typedData,
    primaryType: 'StrategyDetails',
  });

export const verifySignature = async (
  typedData: TypedData,
  signature: Signature,
  address: Address
): Promise<boolean> =>
  verifyTypedData({
    address,
    ...typedData,
    primaryType: 'StrategyDetails',
    signature,
  });

export const getTypedData = (
  strategy: StrategyDetails,
  root: z.infer<typeof HexSchema>,
  verifyingContract: z.infer<typeof AddressSchema>,
  chainId: number
): TypedData => ({
  domain: {
    chainId,
    verifyingContract,
    version: String(strategy.version),
  },
  message: {
    deadline: strategy.expiration.toString(),
    nonce: strategy.nonce.toString(),
    root,
  },
  primaryType: 'StrategyDetails',
  types: {
    StrategyDetails: [
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'root', type: 'bytes32' },
    ],
  },
});

export function encodeIPFSStrategyPayload(
  typedData: TypedData,
  signature: Signature,
  strategy: Strategy
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  return stringify({
    signature,
    strategy,
    typedData,
  });
}

export const decodeIPFSStrategyPayload = (
  ipfsStrategyPayload: string
): IPFSStrategyPayload =>
  IPFSStrategyPayloadSchema.parse(JSON.parse(ipfsStrategyPayload));

export const convertProofServiceResponseToCommitment = (
  proofServiceResponse: ProofServiceResponse,
  collateral: StrategyRow,
  tokenId: bigint,
  amount: bigint
) => {
  const nlrDetails = encodeNlrDetails(collateral);

  const { proof, root } = MerkleDataStructSchema.parse({
    proof: proofServiceResponse.proof,
    root: proofServiceResponse.typedData.message.root,
  });

  const { r, s, v } = hexToSignature(proofServiceResponse.signature);
  return {
    lienRequest: {
      amount,
      nlrDetails,
      proof,
      r,
      root,
      s,
      strategy: {
        deadline: BigInt(proofServiceResponse.typedData.message.deadline),
        vault: proofServiceResponse.typedData.domain.verifyingContract,
        version: parseInt(proofServiceResponse.typedData.domain.version),
      },
      v: Number(v),
    },
    tokenContract: collateral.token,
    tokenId,
  };
};

export const getProofByCidAndLeaf = async (
  cid: string,
  leaf: string
): Promise<ProofServiceResponse> => {
  const { apiBaseURL: API_BASE_URL } = getConfig();
  const PROOF_PATH = 'strategy/proof';
  const response = await axios.get(
    [API_BASE_URL, PROOF_PATH, cid, leaf].join('/'),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return ProofServiceResponseSchema.parse(response?.data);
};

export const getIsValidated = async (
  delegateAddress: string,
  cid: string
): Promise<string> => {
  const { apiBaseURL: API_BASE_URL } = getConfig();
  const VALIDATED_PATH = `${delegateAddress}/${cid}/validated`;

  const response = await axios.get([API_BASE_URL, VALIDATED_PATH].join('/'), {
    headers: {
      'Accept-Encoding': 'gzip,deflate,compress',
      'Content-Type': 'application/json',
    },
  });

  return response?.data?.validated;
};

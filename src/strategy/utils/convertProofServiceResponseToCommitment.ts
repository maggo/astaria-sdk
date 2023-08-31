import { hexToSignature } from 'viem';

import {
  MerkleDataStructSchema,
  ProofServiceResponse,
  StrategyRow,
} from '../../types/index.js';
import { encodeNlrDetails } from './encodeNlrDetails.js';

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

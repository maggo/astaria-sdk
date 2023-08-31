import { z } from 'zod';

import { StrategyDetails, TypedData } from '../../types';
import { AddressSchema, HexSchema } from '../../types/helpers';

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
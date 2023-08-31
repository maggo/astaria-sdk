import { Address, verifyTypedData } from 'viem';

import { Signature, TypedData } from '../../types/index.js';

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

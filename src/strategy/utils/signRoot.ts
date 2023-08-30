import { Account, Address, WalletClient } from 'viem';

import { Signature, TypedData } from '../../types';

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

import invariant from 'tiny-invariant';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

import { Erc20Collateral } from '../../types';

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

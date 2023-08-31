import invariant from 'tiny-invariant';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

import { Collateral } from '../../types/index.js';

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

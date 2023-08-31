import invariant from 'tiny-invariant';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

import { UniV3Collateral } from '../../types/index.js';

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

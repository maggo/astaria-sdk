import { Hex } from 'viem';

import { StrategyLeafType, StrategyRow } from '../../types/index.js';
import { encodeCollateral } from './encodeCollateral.js';
import { encodeCollection } from './encodeCollection.js';
import { encodeErc20Collateral } from './encodeErc20Collateral.js';
import { encodeUniV3Collateral } from './encodeUniV3Collateral.js';

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

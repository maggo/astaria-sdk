import invariant from 'tiny-invariant';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

import { Collection } from '../../types';

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

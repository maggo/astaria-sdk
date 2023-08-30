import stringify from 'json-stringify-deterministic';

import { Signature, Strategy, TypedData } from '../../types';

export const encodeIPFSStrategyPayload = (
  typedData: TypedData,
  signature: Signature,
  strategy: Strategy
): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  return stringify({
    signature,
    strategy,
    typedData,
  });
};

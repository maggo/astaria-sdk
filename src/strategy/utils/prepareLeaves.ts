import { keccak256 } from 'viem';

import { Strategy, StrategyRow } from '../../types';
import { encodeNlrDetails } from './encodeNlrDetails';

// hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
export const prepareLeaves = (strategy: Strategy): string[] =>
  strategy.map((row: StrategyRow) => {
    row.leaf = keccak256(encodeNlrDetails(row));
    return row.leaf;
  });

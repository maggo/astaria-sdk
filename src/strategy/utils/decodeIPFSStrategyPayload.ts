import {
  IPFSStrategyPayload,
  IPFSStrategyPayloadSchema,
} from '../../types/index.js';

export const decodeIPFSStrategyPayload = (
  ipfsStrategyPayload: string
): IPFSStrategyPayload =>
  IPFSStrategyPayloadSchema.parse(JSON.parse(ipfsStrategyPayload));

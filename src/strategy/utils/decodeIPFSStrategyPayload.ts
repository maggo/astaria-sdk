import { IPFSStrategyPayload, IPFSStrategyPayloadSchema } from '../../types';

export const decodeIPFSStrategyPayload = (
  ipfsStrategyPayload: string
): IPFSStrategyPayload =>
  IPFSStrategyPayloadSchema.parse(JSON.parse(ipfsStrategyPayload));

import axios from 'axios';

import { getConfig } from '../../config.js';
import {
  ProofServiceResponse,
  ProofServiceResponseSchema,
} from '../../types/index.js';

export const getProofByCidAndLeaf = async (
  cid: string,
  leaf: string
): Promise<ProofServiceResponse> => {
  const { apiBaseURL: API_BASE_URL } = getConfig();
  const PROOF_PATH = 'strategy/proof';
  const response = await axios.get(
    [API_BASE_URL, PROOF_PATH, cid, leaf].join('/'),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return ProofServiceResponseSchema.parse(response?.data);
};

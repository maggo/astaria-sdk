import axios from 'axios';

import { getConfig } from '../../config';

export const getIsValidated = async (
  delegateAddress: string,
  cid: string
): Promise<string> => {
  const { apiBaseURL: API_BASE_URL } = getConfig();
  const VALIDATED_PATH = `${delegateAddress}/${cid}/validated`;

  const response = await axios.get([API_BASE_URL, VALIDATED_PATH].join('/'), {
    headers: {
      'Accept-Encoding': 'gzip,deflate,compress',
      'Content-Type': 'application/json',
    },
  });

  return response?.data?.validated;
};

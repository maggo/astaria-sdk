import { parse as parseCSV } from 'papaparse';

import { Strategy, StrategySchema } from '../../types/index.js';

export const getStrategyFromCSV = (csv: string): Strategy =>
  StrategySchema.parse(
    parseCSV(csv, {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).data.map((data: any) => ({
      ...data,
      lien: {
        amount: data?.amount,
        duration: data?.duration,
        liquidationInitialAsk: data?.liquidationInitialAsk,
        maxPotentialDebt: data?.maxPotentialDebt,
        rate: data?.rate,
      },
    }))
  );

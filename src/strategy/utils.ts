import { BigNumber, utils } from 'ethers'
import invariant from 'tiny-invariant'

import { Collateral, Collection, StrategyLeafType } from '../types'

export const hashCollateral = (collateral: Collateral): string => {
  invariant(collateral, 'hashCollateral: collateral must be defined')

  return utils.solidityKeccak256(
    [
      'uint8',
      'address',
      'uint256',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    [
      collateral.type,
      collateral.token,
      collateral.tokenId,
      collateral.borrower,
      collateral.lien.amount,
      collateral.lien.rate,
      collateral.lien.duration,
      collateral.lien.maxPotentialDebt,
    ]
  )
}

export const hashCollection = (collection: Collection): string => {
  invariant(collection, 'hashCollection: collection must be defined')

  return utils.solidityKeccak256(
    ['uint8', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256'],
    [
      collection.type,
      collection.token,
      collection.borrower,
      collection.lien.amount,
      collection.lien.rate,
      collection.lien.duration,
      collection.lien.maxPotentialDebt,
    ]
  )
}

export type ParsedStrategyRow = Array<Collateral | Collection>

export interface StrategyObjectFactory<RowType> {
  (rowData: string): RowType
}

export const createCollateralOrCollection: StrategyObjectFactory<
  Collateral | Collection
> = (rowData) => {
  const row: any = RE_STRATEGY_ROW.exec(rowData)?.groups

  switch (parseInt(row.type, 10)) {
    case StrategyLeafType.Collateral: {
      return {
        type: StrategyLeafType.Collateral,
        token: String(row.token),
        tokenId: BigNumber.from(String(row.tokenId)),
        borrower: String(row.borrower),
        lien: {
          amount: BigNumber.from(String(row.amount)),
          rate: BigNumber.from(String(row.rate)),
          duration: BigNumber.from(String(row.duration)),
          maxPotentialDebt: BigNumber.from(String(row.maxPotentialDebt)),
        },
      }
    }

    case StrategyLeafType.Collection: {
      return {
        type: StrategyLeafType.Collection,
        token: String(row.token),
        borrower: String(row.borrower),
        lien: {
          amount: BigNumber.from(String(row.amount)),
          rate: BigNumber.from(String(row.rate)),
          duration: BigNumber.from(String(row.duration)),
          maxPotentialDebt: BigNumber.from(String(row.maxPotentialDebt)),
        },
      }
    }
  }

  throw Error('invalid row')
}

export const RE_STRATEGY_ROW = /^(?<type>\d+)[,]{1}(?<token>0x[a-fA-F0-9]{40})[,]{1}(?<tokenId>\d{0,78})[,]{0,1}(?<borrower>0x[a-fA-F0-9]{40})[,]{1}(?<amount>\d{0,78})[,]{1}(?<rate>\d{0,78})[,]{1}(?<duration>\d{1,20})[,]{1}(?<maxPotentialDebt>\d{0,78})$/

const validateCollateralOrCollectionRow = (row: string): boolean =>
  row.length > 0 && RE_STRATEGY_ROW.test(row)

const trimAndSplitByLine = (csv: string): string[] =>
  csv
    .replaceAll(' ', '')
    .replaceAll('\r', '')
    .split('\n')

interface ValidateStrategyCSV {
  (csv: string): ParsedStrategyRow
}

export const validate: ValidateStrategyCSV = (csv) => {
  let rows = trimAndSplitByLine(csv)

  const parsed = rows
    .filter(validateCollateralOrCollectionRow)
    .map(createCollateralOrCollection)

  return parsed
}

// hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
export const prepareLeaves = (csv: any) => {
  let leaves: string[] = []

  csv.forEach((row: any) => {
    switch (row.type) {
      case StrategyLeafType.Collection: {
        leaves.push(hashCollection(row))
        break
      }

      case StrategyLeafType.Collateral: {
        leaves.push(hashCollateral(row))
        break
      }
    }
  })

  return leaves
}

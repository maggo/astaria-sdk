import { utils } from 'ethers'
import invariant from 'tiny-invariant'

import { Strategy, Collateral, Collection, StrategyLeafType } from '../types'

export const hashStrategy = (strategy: Strategy): string => {
  invariant(strategy, 'hashStrategy: strategy must be defined')

  return utils.solidityKeccak256(
    [
      'uint8',
      'uint8',
      'address',
      'address',
      'bool',
      'uint256',
      'uint256',
      'address',
    ],
    [
      strategy.type,
      strategy.version,
      strategy.strategist,
      strategy.delegate,
      strategy.public,
      strategy.expiration,
      strategy.nonce,
      strategy.vault,
    ]
  )
}

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
      collateral.lien.maxSeniorLiens,
      collateral.lien.schedule,
    ]
  )
}

export const hashCollection = (collection: Collection): string => {
  invariant(collection, 'hashCollection: collection must be defined')

  return utils.solidityKeccak256(
    [
      'uint8',
      'address',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    [
      collection.type,
      collection.token,
      collection.borrower,
      collection.lien.amount,
      collection.lien.rate,
      collection.lien.duration,
      collection.lien.maxSeniorLiens,
      collection.lien.schedule,
    ]
  )
}

export type ParsedStrategyRow = Array<Strategy | Collateral | Collection>

export interface StrategyObjectFactory<RowType> {
  (rowData: string): RowType
}

export const createStrategy: StrategyObjectFactory<Strategy> = (rowData) => {
  const root: any = RE_STRATEGY_ROOT.exec(rowData)?.groups

  return {
    type: StrategyLeafType.Strategy,
    version: parseInt(root.version, 10),
    strategist: String(root.strategist),
    delegate: String(root.delegate),
    public: root.public === 'true',
    expiration: parseInt(root.expiration, 10),
    nonce: parseInt(root.nonce, 10),
    vault: String(root.vault),
  }
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
        tokenId: parseInt(row.tokenId, 10),
        borrower: String(row.borrower),
        lien: {
          amount: row.amount,
          rate: parseInt(row.rate, 10),
          duration: parseInt(row.duration, 10),
          maxSeniorLiens: parseInt(row.maxSeniorLiens, 10),
          schedule: parseInt(row.schedule, 10),
        },
      }
    }

    case StrategyLeafType.Collection: {
      return {
        type: StrategyLeafType.Collection,
        token: String(row.token),
        borrower: String(row.borrower),
        lien: {
          amount: row.amount,
          rate: parseInt(row.rate, 10),
          duration: parseInt(row.duration, 10),
          maxSeniorLiens: parseInt(row.maxSeniorLiens, 10),
          schedule: parseInt(row.schedule, 10),
        },
      }
    }
  }

  throw Error('invalid row')
}

export const RE_STRATEGY_ROOT = /^(?<type>\d+)[,]{1}(?<version>\d+)[,]{1}(?<strategist>0x[a-fA-F0-9]{40})[,]{1}(?<delegate>0x[a-fA-F0-9]{40})[,]{1}(?<public>true|false){1}[,]{1}(?<expiration>\d{10})[,]{1}(?<nonce>\d+)[,]{1}(?<vault>0x[a-fA-F0-9]{40})$/
export const RE_STRATEGY_ROW = /^(?<type>\d+)[,]{1}(?<token>0x[a-fA-F0-9]{40})[,]{1}((?<tokenId>\d{4})[,]{1}){0,1}(?<borrower>0x[a-fA-F0-9]{40})[,]{1}(?<amount>\d{20})[,]{1}(?<rate>\d+)[,]{1}(?<duration>\d{10})[,]{1}(?<maxSeniorLiens>\d+)[,]{1}(?<schedule>\d+)$/

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
  let [strategyRoot, ...rows] = trimAndSplitByLine(csv)

  invariant(
    RE_STRATEGY_ROOT.test(strategyRoot),
    'validate: invalid strategy root'
  )

  const parsed = [
    createStrategy(strategyRoot),
    ...rows
      .filter(validateCollateralOrCollectionRow)
      .map(createCollateralOrCollection),
  ]

  return parsed
}

// hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
export const prepareLeaves = (csv: any) => {
  let leaves: string[] = []

  csv.forEach((row: any) => {
    switch (row.type) {
      case StrategyLeafType.Strategy: {
        leaves.push(hashStrategy(row))
        break
      }

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

// // hashes the parameters of the terms and collateral to produce a single bytes32 value to act as the root
// export const prepareLeavesFromOffers = (offers: Array<Offer>) => {
//   let leaves: Array<string> = []

//   offers.forEach((offer: Offer) => {
//     let terms = utils.solidityKeccak256(
//       ['uint256', 'uint256', 'uint256', 'uint8', 'uint256'],
//       [
//         offer.terms.amount,
//         offer.terms.rate,
//         offer.terms.duration + '',
//         offer.terms.lienPosition + '',
//         offer.terms.schedule,
//       ]
//     )
//     let collateral = utils.solidityKeccak256(
//       ['address', 'uint256'],
//       [offer.collateral.address, offer.collateral.tokenId]
//     )

//     leaves.push(
//       utils.solidityKeccak256(['bytes32', 'bytes32'], [terms, collateral])
//     )
//   })

//   return leaves
// }

// // casts the row to collateral and terms objects
// export const castRowToType = (
//   row: string[]
// ): { collateral: Collateral; terms: Terms } => {
//   if (row.length != 7)
//     throw 'RowCastException: Attempting to cast row that is smaller than the required length of 7'

//   let collateral: Collateral = {
//     address: row[5],
//     tokenId: row[6],
//   }

//   let terms: Terms = {
//     amount: row[0],
//     rate: row[1],
//     duration: parseInt(row[2]),
//     lienPosition: parseInt(row[3]),
//     schedule: row[4],
//   }

//   return { collateral, terms }
// }

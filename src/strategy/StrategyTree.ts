import { utils } from 'ethers'
import MerkleTree from 'merkletreejs'
import invariant from 'tiny-invariant'
import { StrategyLeafType, UniV3Collateral, Collateral } from '../types/index'
import { validate, prepareLeaves, ParsedStrategyRow } from './utils'

export class StrategyTree extends MerkleTree {
  private csv: ParsedStrategyRow

  constructor(data: string) {
    const csv = validate(data)
    invariant(
      csv.length > 0,
      'StrategyTree: Provided csv string did not produce a valid StrategyTree value'
    )
    prepareLeaves(csv)
    const leaves = csv.map((row) => row.leaf)
    super(leaves, utils.keccak256, { sort: true })

    this.csv = csv
  }

  public static fromParsedStrategyRow(
    strategy: ParsedStrategyRow
  ): StrategyTree {
    let csv = strategy
      .map((term) => {
        let ret = ''
        let type = term.type

        ret += `${type}, ${term.token}, `

        if (type === StrategyLeafType.Collateral) {
          ret += `${(term as Collateral).tokenId}, `
        }

        ret += `${
          term.borrower ?? '0x0000000000000000000000000000000000000000'
        }, `

        if (type === StrategyLeafType.UniV3Collateral) {
          term = term as UniV3Collateral
          ret += `${term.token0}, ${term.token1}, ${term.fee}, ${term.tickLower}, ${term.tickUpper}, ${term.minLiquidity}, ${term.amount0Min}, ${term.amount1Min}, `
        }

        ret += `${term.lien.amount}, ${term.lien.rate}, ${term.lien.duration}, ${term.lien.maxPotentialDebt}, ${term.lien.liquidationInitialAsk}`

        if (strategy.length === 1) ret += '\n'

        return ret
      })
      .join('\n')

    return new StrategyTree(csv)
  }

  get getCSV(): ParsedStrategyRow {
    return this.csv
  }
}

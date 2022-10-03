import { utils } from 'ethers'
import MerkleTree from 'merkletreejs'
import invariant from 'tiny-invariant'

import { validate, prepareLeaves, ParsedStrategyRow } from 'strategy/utils'

export class StrategyTree extends MerkleTree {
  private csv: ParsedStrategyRow

  constructor(data: string) {
    const csv = validate(data)

    invariant(
      csv.length > 0,
      'StrategyTree: Provided csv string did not produce a valid StrategyTree value'
    )

    const leaves = prepareLeaves(csv)

    super(leaves, utils.keccak256)

    this.csv = csv
  }

  get rawCSV(): ParsedStrategyRow {
    return this.csv
  }
}

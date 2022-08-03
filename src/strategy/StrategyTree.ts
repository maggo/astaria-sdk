import { utils } from 'ethers'
import MerkleTree from 'merkletreejs'
import invariant from 'tiny-invariant'

import { validate, prepareLeaves } from 'strategy/utils'
import type { ParsedStrategyRow } from 'strategy/utils'

export class StrategyTree extends MerkleTree {
  #csv: ParsedStrategyRow 

  constructor(data: string) {
    const csv = validate(data)

    invariant(
      csv.length > 0,
      'AppraisalTree: Provided csv string did not produce a valid StrategyTree value'
    )

    const leaves = prepareLeaves(csv)

    super(leaves, utils.keccak256)

    this.#csv = csv
  }

  get csv(): ParsedStrategyRow {
    return this.#csv
  } 
}

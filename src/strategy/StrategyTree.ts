import { utils } from 'ethers'
import MerkleTree from 'merkletreejs'
import invariant from 'tiny-invariant'

import { validate, prepareLeaves } from './utils'

export class StrategyTree extends MerkleTree {
  constructor(data: string) {
    const csv = validate(data)

    invariant(
      csv.length > 0,
      'AppraisalTree: Provided csv string did not produce a valid StrategyTree value'
    )

    const leaves = prepareLeaves(csv)

    super(leaves, utils.keccak256)
  }
}

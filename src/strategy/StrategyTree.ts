import { keccak256 } from 'viem'
import MerkleTree from 'merkletreejs'
import invariant from 'tiny-invariant'
import { Strategy } from '../types/index'
import { getStrategyFromCSV, prepareLeaves } from './utils'

export class StrategyTree extends MerkleTree {
  private strategy: Strategy

  constructor(strategy: Strategy) {
    invariant(
      strategy.length > 0,
      'StrategyTree: Provided strategy did not produce a valid StrategyTree value'
    )
    super(prepareLeaves(strategy), keccak256, { sort: true })
    this.strategy = strategy
  }

  public static fromCSV(csv: string): StrategyTree {
    return new StrategyTree(getStrategyFromCSV(csv))
  }

  get getStrategy(): Strategy {
    return this.strategy
  }
}

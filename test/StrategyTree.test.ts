import { readFile } from 'fs/promises'
import { join } from 'path'

import { StrategyTree } from '../src/strategy/StrategyTree'

describe('StrategyTree', () => {
  test('test that all leaves are marshalled into StrategyTree', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')

    const strategyTree = StrategyTree.fromCSV(csv)
    const actual = strategyTree.getStrategy.length
    const expected = 6
    expect(actual).toEqual(expected)
  })
  test('convert Strategy to StrategyTree', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')
    const tempStrategyTree = StrategyTree.fromCSV(csv)
    const strategyTree = new StrategyTree(tempStrategyTree.getStrategy)
    expect(strategyTree.getHexRoot()).toEqual(tempStrategyTree.getHexRoot())
    expect(strategyTree.getStrategy).toEqual(tempStrategyTree.getStrategy)
  })
  test('parses CSV into StrategyTree', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')
    const strategyTree = StrategyTree.fromCSV(csv)

    expect(
      '0x790223d0b436e1c7f804b4aedd8372a68fcb5630cd0061aabd957bb350fa0ed2'
    ).toEqual(strategyTree.getHexRoot())
  })
})

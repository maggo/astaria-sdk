import { join } from 'path'
import { readFile } from 'fs/promises'
import { StrategyTree } from '../src/strategy/StrategyTree'

describe('StrategyTree', () => {
  test('test that all leaves are marshalled into StrategyTree', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')

    const strategyTree = StrategyTree.fromCSV(csv)
    const actual = strategyTree.getStrategy.length
    const expected = 5
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
      '0x3d676ddad6c1e106c587d8aa92be4ee6a4f1a805e4fedbeb28b27af9fe8d8593'
    ).toEqual(strategyTree.getHexRoot())
  })
})

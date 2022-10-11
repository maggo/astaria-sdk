import { join } from 'path'
import { readFile } from 'fs/promises'

import { StrategyTree } from '../src/strategy/StrategyTree'

describe('StrategyTree', () => {
  test('parses CSV into BinaryTree', async () => {
    const csv = await readFile(join(__dirname, '__mocks__/test.csv'), 'utf8')

    const strategyTree = new StrategyTree(csv)

    expect(
      '0x1dcafa759dd2905d4304194ea92349bda959cc4bfcdee6f1faa71e03a7f83e41'
    ).toEqual(strategyTree.getHexRoot())
  })
})

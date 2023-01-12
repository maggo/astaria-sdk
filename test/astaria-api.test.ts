import * as utils from '../src/strategy/utils'

// test file name is changed to prevent running in the CI
describe('Get response from proof service and execute on chain', () => {
  test.skip('signs merkle tree root using local', async () => {
    const [res] = await utils.getOffersByCollateral(
      '0xd6ef92fa2ef2cb702f0bfff54b111b076ac0237d',
      '209',
      '0x286055c312AC3F939d1409619396ed6a88401D08'
    )
    const cidRes = await utils.getProofByCidAndLeaf(
      res.cid ?? '',
      res.leaf ?? ''
    )
    console.log(cidRes)
    const validated = await utils.getIsValidated(
      '0x286055c312AC3F939d1409619396ed6a88401D08',
      res.cid ?? ''
    )
    console.log(validated)
  })
})

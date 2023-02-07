import { BigNumber } from 'ethers'
import * as utils from '../src/router/utils'

import { getProofByCidAndLeaf, getIsValidated } from '../src/strategy/utils'

// test file name is changed to prevent running in the CI
describe('Get response from proof service and execute on chain', () => {
  test.skip('signs merkle tree root using local', async () => {
    const { count, uniqueOffers } = await utils.getUniqueOffersByCollateral(
      '0xd6ef92fa2ef2cb702f0bfff54b111b076ac0237d',
      BigNumber.from(209),
      '0x286055c312AC3F939d1409619396ed6a88401D08',
      25,
      0
    )
    const cidRes = await getProofByCidAndLeaf(
      uniqueOffers[0].cid ?? '',
      uniqueOffers[0].leaf ?? ''
    )
    console.log(cidRes)
    const validated = await getIsValidated(
      '0x286055c312AC3F939d1409619396ed6a88401D08',
      uniqueOffers[0].cid ?? ''
    )
    console.log(validated)
  })
})

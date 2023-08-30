import { readFile } from 'fs/promises'
import { join } from 'path'
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

import { AstariaRouterABI } from '../src/abi/AstariaRouterABI'
import { convertProofServiceResponseToCommitment } from '../src/strategy/utils'
import { CollectionSchema, ProofServiceResponseSchema } from '../src/types'

// test file name is changed to prevent running in the CI
describe('Get response from proof service and execute on chain', () => {
  test.skip('signs merkle tree root using local', async () => {
    const jsonOffers = await readFile(
      join(__dirname, '__mocks__/offers.json'),
      'utf8'
    )
    const responseOffers = JSON.parse(jsonOffers)

    const jsonProof = await readFile(
      join(__dirname, '__mocks__/proof_service.json'),
      'utf8'
    )
    const responseProof = JSON.parse(jsonProof)

    //don't worry there isn't any real money here
    const privateKey =
      '0x95067b810f517769c5074b9b7977252154ec273cef5e79f65a7544b69a136836'

    const client = createWalletClient({
      chain: mainnet,
      account: privateKey,

      transport: http(),
    })

    const router = '0x0E8B3968C56b4D54831fD7E0fd3Db63CCAa4DBBC'

    // nft token id
    const id = 208n
    const amount = 500n

    const proofServiceResponse = ProofServiceResponseSchema.parse(responseProof)

    const collateral = CollectionSchema.parse(responseOffers[1])

    const commitment = convertProofServiceResponseToCommitment(
      proofServiceResponse,
      collateral,
      id,
      amount
    )

    client.writeContract({
      abi: AstariaRouterABI,
      address: router,
      args: [commitment],
      functionName: 'commitToLien',
    })
  })
})

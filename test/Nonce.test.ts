import { ethers, Wallet } from 'ethers'
import { VaultImplementation__factory } from '../src/contracts/factories/VaultImplementation__factory'
// test file name is changed to prevent running in the CI
describe('Nonce', () => {
  jest.setTimeout(90 * 1000)

  test('signs merkle tree root using remote', async () => {
    //don't worry there isn't any real money here
    const privateKey =
      '95067b810f517769c5074b9b7977252154ec273cef5e79f65a7544b69a136836'

    const network = 'goerli'
    const apiKey = 'QDsg62FF8hsq9JjzCRs1Oi-1ZBPKmx2U' // TODO: REMOVE THIS
    const provider = new ethers.providers.AlchemyProvider(network, apiKey)
    const wallet = new Wallet(privateKey, provider)

    const contract = VaultImplementation__factory.connect(
      '0xc3F235148C06e930D99Fc5eaB08F8ADB31e0B335',
      wallet
    )

    const txn = await contract.getStrategistNonce()
    console.log(txn)
  })
})

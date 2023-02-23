/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../common'
import type { WithdrawProxy, WithdrawProxyInterface } from '../WithdrawProxy'

const _abi = [
  {
    inputs: [
      {
        internalType: 'enum WithdrawProxy.InvalidStates',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'InvalidState',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotSupported',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'withdrawProxy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawProxyAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'publicVault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'publicVaultAmount',
        type: 'uint256',
      },
    ],
    name: 'Claimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CLAIMABLE_EPOCH',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'IMPL_TYPE',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [
      {
        internalType: 'contract IAstariaRouter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VAULT',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'convertToAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    name: 'convertToShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'withdrawProxy',
        type: 'address',
      },
    ],
    name: 'drain',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getExpected',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFinalAuctionEnd',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWithdrawRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newLienExpectedValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'finalAuctionDelta',
        type: 'uint256',
      },
    ],
    name: 'handleNewLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'increaseWithdrawReserveReceived',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'maxDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'maxMint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'maxRedeem',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'maxWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minDepositAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    name: 'previewDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'previewMint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'previewRedeem',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    name: 'previewWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'redeem',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'liquidationWithdrawRatio',
        type: 'uint256',
      },
    ],
    name: 'setWithdrawRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const _bytecode =
  '0x608060405234801561001057600080fd5b50611dfc806100206000396000f3fe608060405234801561001057600080fd5b50600436106102535760003560e01c8063645006ca11610146578063b460af94116100c3578063c6e6f59211610087578063c6e6f592146104b0578063ce96cb77146104c3578063d505accf146104d6578063d905777e146104e9578063dd62ed3e146104fc578063ef8b30f71461050f57600080fd5b8063b460af941461047a578063b701e7271461048d578063ba08765214610495578063c237c703146104a8578063c63d75b61461039057600080fd5b806395d89b411161010a57806395d89b411461043c578063989673b114610444578063a55737201461044c578063a9059cbb14610454578063b3d7f6b91461046757600080fd5b8063645006ca146103db5780636e553f65146103e257806370a08231146103f557806394bf804d14610408578063951b46af1461041b57600080fd5b806323b872dd116101d4578063402d267d11610198578063402d267d14610390578063411557d1146103a55780634cdad506146103ad5780634e71d92d146103c057806359a13ae5146103c857600080fd5b806323b872dd14610338578063313ce5671461034b57806332fe7b26146103605780633644e5151461038057806338d52e0f1461038857600080fd5b8063095ea7b31161021b578063095ea7b3146102e45780630a28a477146102f75780630aeba34e1461030a57806318160ddd1461031d5780631ccf45bc1461032557600080fd5b806301e1d1141461025857806301ffc9a714610273578063042ef56e146102a757806306fdde03146102bc57806307a2d13a146102d1575b600080fd5b610260610522565b6040519081526020015b60405180910390f35b610297610281366004611927565b6001600160e01b0319166316c510a760e21b1490565b604051901515815260200161026a565b6102ba6102b5366004611951565b61059b565b005b6102c46105e9565b60405161026a919061198e565b6102606102df366004611951565b61067c565b6102976102f23660046119dd565b6106b0565b610260610305366004611951565b610727565b610260610318366004611a07565b61075e565b61026061083f565b6102ba610333366004611951565b610851565b610297610346366004611a33565b6108b2565b60125b60405160ff909116815260200161026a565b6103686109a9565b6040516001600160a01b03909116815260200161026a565b6102606109b5565b610368610a39565b61026061039e366004611a6f565b5060001990565b610368610a43565b6102606103bb366004611951565b610a4f565b6102ba610a5a565b6102ba6103d6366004611a8a565b610de7565b6000610260565b6102606103f0366004611a07565b610e7c565b610260610403366004611a6f565b610e97565b610260610416366004611a07565b610ec3565b610423610f34565b60405167ffffffffffffffff909116815260200161026a565b6102c4610f40565b610260610fc8565b610260610fe4565b6102976104623660046119dd565b610fef565b610260610475366004611951565b611067565b610260610488366004611aac565b61108d565b6102606110de565b6102606104a3366004611aac565b6110f3565b61034e611139565b6102606104be366004611951565b611145565b6102606104d1366004611a6f565b61116c565b6102ba6104e4366004611ae8565b61119e565b6102606104f7366004611a6f565b611400565b61026061050a366004611b5b565b61142d565b61026061051d366004611951565b611469565b600061052c610a39565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610572573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105969190611b85565b905090565b6105a3610a43565b6001600160a01b0316336001600160a01b0316146105dc5760405162461bcd60e51b81526004016105d390611b9e565b60405180910390fd5b806105e5611474565b5550565b60606105f3610a39565b6001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610630573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106589190810190611be1565b6040516020016106689190611c8e565b604051602081830303815290604052905090565b60008061068761083f565b905080156106a7576106a261069a610522565b8490836114a2565b6106a9565b825b9392505050565b6000806106bb6114c0565b33600081815260028301602090815260408083206001600160a01b038a16808552908352928190208890555187815293945090927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a360019150505b92915050565b60008061073261083f565b9050801561074e576106a281610746610522565b8591906114ee565b678ac7230489e800009392505050565b6000610768610a43565b6001600160a01b0316336001600160a01b0316146107985760405162461bcd60e51b81526004016105d390611b9e565b60006107a2610a39565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa1580156107e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080c9190611b85565b90508084111561081a578093505b6108378385610827610a39565b6001600160a01b03169190611514565b509192915050565b60008061084a6114c0565b5492915050565b610859610a43565b6001600160a01b0316336001600160a01b0316146108895760405162461bcd60e51b81526004016105d390611b9e565b6000610893611474565b9050818160030160008282546108a99190611cde565b90915550505050565b6000806108bd6114c0565b6001600160a01b038616600090815260028201602090815260408083203384529091529020549091506000198114610920576108f98482611cf1565b6001600160a01b038716600090815260028401602090815260408083203384529091529020555b6001600160a01b03861660009081526001830160205260408120805486929061094a908490611cf1565b90915550506001600160a01b03808616600081815260018501602052604090819020805488019055519091881690600080516020611da7833981519152906109959088815260200190565b60405180910390a350600195945050505050565b6000610596600061158c565b6000610596604080517f2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd60208201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69181019190915246606082015230608082015260009060a00160405160208183030381529060405280519060200120905090565b60006105966115b1565b6000610596602961158c565b60006107218261067c565b6000610a64611474565b600281015490915064ffffffffff16600003610a9657600360405163683f44bb60e11b81526004016105d39190611d04565b610a9e610f34565b67ffffffffffffffff16610ab0610a43565b6001600160a01b031663b97dd9e26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610aed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b119190611d2c565b67ffffffffffffffff161015610b3d57600060405163683f44bb60e11b81526004016105d39190611d04565b600281015464ffffffffff16421015610b6c57600160405163683f44bb60e11b81526004016105d39190611d04565b6000808260030154610b7c610a39565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610bc2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be69190611b85565b610bf09190611cf1565b90508260010154811015610c9a57610c06610a43565b6001600160a01b03166365612e68610c458560000154670de0b6b3a7640000610c2f9190611cf1565b848760010154610c3f9190611cf1565b906115bd565b6040518263ffffffff1660e01b8152600401610c6391815260200190565b600060405180830381600087803b158015610c7d57600080fd5b505af1158015610c91573d6000803e3d6000fd5b50505050610d2b565b610ca2610a43565b6001600160a01b0316639ff2cfb4610cda8560000154670de0b6b3a7640000610ccb9190611cf1565b6001870154610c3f9086611cf1565b6040518263ffffffff1660e01b8152600401610cf891815260200190565b600060405180830381600087803b158015610d1257600080fd5b505af1158015610d26573d6000803e3d6000fd5b505050505b8254610d4a57610d45610d3c610a43565b82610827610a39565b610d76565b8254610d5f9082670de0b6b3a76400006114a2565b9150818103908214610d7657610d76610d3c610a43565b60028301805464ffffffffff191690557f8dab6d35466ca3cba614bc5b262979b277949786977e81107f375f7e39f7734a3083610db1610a43565b604080516001600160a01b03948516815260208101939093529216818301526060810184905290519081900360800190a1505050565b610def610a43565b6001600160a01b0316336001600160a01b031614610e1f5760405162461bcd60e51b81526004016105d390611b9e565b6000610e29611474565b6001810180548501905590506000610e424284016115d2565b600283015490915064ffffffffff9081169082161115610e765760028201805464ffffffffff191664ffffffffff83161790555b50505050565b6000604051630280e1e560e61b815260040160405180910390fd5b6000610ea16114c0565b6001600160a01b03909216600090815260019290920160205250604090205490565b6000610ecd610a43565b6001600160a01b0316336001600160a01b031614610f235760405162461bcd60e51b81526020600482015260136024820152721bdb9b1e481d985d5b1d0818d85b881b5a5b9d606a1b60448201526064016105d3565b610f2d82846115ea565b5090919050565b6000610596603d611655565b6060610f4a610a43565b610f52610a39565b6001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610f8f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610fb79190810190611be1565b604051602001610668929190611d56565b600080610fd3611474565b6002015464ffffffffff1692915050565b60008061084a611474565b600080610ffa6114c0565b336000908152600182016020526040812080549293508592909190611020908490611cf1565b90915550506001600160a01b038416600081815260018301602052604090819020805486019055513390600080516020611da7833981519152906107139087815260200190565b60008061107261083f565b9050801561074e576106a2611085610522565b8490836114ee565b600080611098611474565b600281015490915064ffffffffff16156110c857600260405163683f44bb60e11b81526004016105d39190611d04565b6110d385858561167a565b91505b509392505050565b6000806110e9611474565b6001015492915050565b6000806110fe611474565b600281015490915064ffffffffff161561112e57600260405163683f44bb60e11b81526004016105d39190611d04565b6110d3858585611767565b60006105966014611891565b60008061115061083f565b905080156106a7576106a281611164610522565b8591906114a2565b6000806111776114c0565b6001600160a01b03841660009081526001820160205260409020549091506106a99061067c565b428410156111ee5760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f4558504952454400000000000000000060448201526064016105d3565b600060016111fa6109b5565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98a8a8a6112266114c0565b6001600160a01b038f8116600090815260039290920160209081526040928390208054600181019091558351808301989098529582168784015293166060860152608085019190915260a084019290925260c08084018b90528251808503909101815260e08401909252815191012061190160f01b6101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015611315573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580159061134b5750876001600160a01b0316816001600160a01b0316145b6113885760405162461bcd60e51b815260206004820152600e60248201526d24a72b20a624a22fa9a4a3a722a960911b60448201526064016105d3565b856113916114c0565b6001600160a01b039283166000908152600291909101602090815260408083208b86168085529083529281902093909355915188815290928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b60008061140b6114c0565b6001600160a01b03909316600090815260019093016020525050604090205490565b6000806114386114c0565b6001600160a01b03948516600090815260029190910160209081526040808320959096168252939093525050205490565b600061072182611145565b60008061072160017f9d9972a5048ce9bc4a301fa478468497c41609cb7f4770f91626fcf592113934611cf1565b60008260001904841183021582026114b957600080fd5b5091020490565b60008061072160017f6c9d8be213da072972500acecface6c6d1d5ffbaace52819bc37703107293592611cf1565b600082600019048411830215820261150557600080fd5b50910281810615159190040190565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610e765760405162461bcd60e51b815260206004820152600f60248201526e1514905394d1915497d19052531151608a1b60448201526064016105d3565b6000806115a3600119368181013560f01c90030190565b929092013560601c92915050565b6000610596601561158c565b60006106a98383670de0b6b3a76400006114a2565b60006501000000000082106115e657600080fd5b5090565b60006115f46114c0565b90508181600001600082825461160a9190611cde565b90915550506001600160a01b0383166000818152600183016020908152604080832080548701905551858152600080516020611da783398151915291015b60405180910390a3505050565b60008061166c600119368181013560f01c90030190565b929092013560c01c92915050565b600061168584610727565b905060006116916114c0565b9050336001600160a01b03841614611705576001600160a01b038316600090815260028201602090815260408083203384529091529020546000198114611703576116dc8382611cf1565b6001600160a01b038516600090815260028401602090815260408083203384529091529020555b505b61170f83836118b6565b60408051868152602081018490526001600160a01b03808616929087169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a46110d68486610827610a39565b6000806117726114c0565b9050336001600160a01b038416146117e6576001600160a01b0383166000908152600282016020908152604080832033845290915290205460001981146117e4576117bd8682611cf1565b6001600160a01b038516600090815260028401602090815260408083203384529091529020555b505b6117ef85610a4f565b91508160000361182f5760405162461bcd60e51b815260206004820152600b60248201526a5a45524f5f41535345545360a81b60448201526064016105d3565b61183983866118b6565b60408051838152602081018790526001600160a01b03808616929087169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a46110d68483610827610a39565b6000806118a8600119368181013560f01c90030190565b929092013560f81c92915050565b60006118c06114c0565b6001600160a01b03841660009081526001820160205260408120805492935084929091906118ef908490611cf1565b9091555050805482900381556040518281526000906001600160a01b03851690600080516020611da783398151915290602001611648565b60006020828403121561193957600080fd5b81356001600160e01b0319811681146106a957600080fd5b60006020828403121561196357600080fd5b5035919050565b60005b8381101561198557818101518382015260200161196d565b50506000910152565b60208152600082518060208401526119ad81604085016020870161196a565b601f01601f19169190910160400192915050565b80356001600160a01b03811681146119d857600080fd5b919050565b600080604083850312156119f057600080fd5b6119f9836119c1565b946020939093013593505050565b60008060408385031215611a1a57600080fd5b82359150611a2a602084016119c1565b90509250929050565b600080600060608486031215611a4857600080fd5b611a51846119c1565b9250611a5f602085016119c1565b9150604084013590509250925092565b600060208284031215611a8157600080fd5b6106a9826119c1565b60008060408385031215611a9d57600080fd5b50508035926020909101359150565b600080600060608486031215611ac157600080fd5b83359250611ad1602085016119c1565b9150611adf604085016119c1565b90509250925092565b600080600080600080600060e0888a031215611b0357600080fd5b611b0c886119c1565b9650611b1a602089016119c1565b95506040880135945060608801359350608088013560ff81168114611b3e57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611b6e57600080fd5b611b77836119c1565b9150611a2a602084016119c1565b600060208284031215611b9757600080fd5b5051919050565b6020808252601390820152721bdb9b1e481d985d5b1d0818d85b8818d85b1b606a1b604082015260600190565b634e487b7160e01b600052604160045260246000fd5b600060208284031215611bf357600080fd5b815167ffffffffffffffff80821115611c0b57600080fd5b818401915084601f830112611c1f57600080fd5b815181811115611c3157611c31611bcb565b604051601f8201601f19908116603f01168101908382118183101715611c5957611c59611bcb565b81604052828152876020848701011115611c7257600080fd5b611c8383602083016020880161196a565b979650505050505050565b714153542d57697468647261775661756c742d60701b815260008251611cbb81601285016020870161196a565b9190910160120192915050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561072157610721611cc8565b8181038181111561072157610721611cc8565b6020810160048310611d2657634e487b7160e01b600052602160045260246000fd5b91905290565b600060208284031215611d3e57600080fd5b815167ffffffffffffffff811681146106a957600080fd5b644153542d5760d81b81526bffffffffffffffffffffffff198360601b166005820152602d60f81b601982015260008251611d9881601a85016020870161196a565b91909101601a01939250505056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212203a164acd1bee8f10fc9ced8c3a2c2bcc6e80a2eb7cab11344e256335d31c572d64736f6c63430008110033'

type WithdrawProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: WithdrawProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class WithdrawProxy__factory extends ContractFactory {
  constructor(...args: WithdrawProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WithdrawProxy> {
    return super.deploy(overrides || {}) as Promise<WithdrawProxy>
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): WithdrawProxy {
    return super.attach(address) as WithdrawProxy
  }
  override connect(signer: Signer): WithdrawProxy__factory {
    return super.connect(signer) as WithdrawProxy__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): WithdrawProxyInterface {
    return new utils.Interface(_abi) as WithdrawProxyInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WithdrawProxy {
    return new Contract(address, _abi, signerOrProvider) as WithdrawProxy
  }
}

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
    name: 'getState',
    outputs: [
      {
        internalType: 'uint256',
        name: 'withdrawRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expected',
        type: 'uint256',
      },
      {
        internalType: 'uint40',
        name: 'finalAuctionEnd',
        type: 'uint40',
      },
      {
        internalType: 'uint256',
        name: 'withdrawReserveReceived',
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
  '0x608060405234801561001057600080fd5b50611e75806100206000396000f3fe608060405234801561001057600080fd5b506004361061025e5760003560e01c8063645006ca11610146578063b460af94116100c3578063c6e6f59211610087578063c6e6f592146104f0578063ce96cb7714610503578063d505accf14610516578063d905777e14610529578063dd62ed3e1461053c578063ef8b30f71461054f57600080fd5b8063b460af94146104ba578063b701e727146104cd578063ba087652146104d5578063c237c703146104e8578063c63d75b6146103d057600080fd5b806395d89b411161010a57806395d89b411461047c578063989673b114610484578063a55737201461048c578063a9059cbb14610494578063b3d7f6b9146104a757600080fd5b8063645006ca1461041b5780636e553f651461042257806370a082311461043557806394bf804d14610448578063951b46af1461045b57600080fd5b80631ccf45bc116101df57806338d52e0f116101a357806338d52e0f146103c8578063402d267d146103d0578063411557d1146103e55780634cdad506146103ed5780634e71d92d1461040057806359a13ae51461040857600080fd5b80631ccf45bc1461036557806323b872dd14610378578063313ce5671461038b57806332fe7b26146103a05780633644e515146103c057600080fd5b8063095ea7b311610226578063095ea7b3146102ef5780630a28a477146103025780630aeba34e1461031557806318160ddd146103285780631865c57d1461033057600080fd5b806301e1d1141461026357806301ffc9a71461027e578063042ef56e146102b257806306fdde03146102c757806307a2d13a146102dc575b600080fd5b61026b610562565b6040519081526020015b60405180910390f35b6102a261028c3660046119a0565b6001600160e01b0319166316c510a760e21b1490565b6040519015158152602001610275565b6102c56102c03660046119ca565b6105db565b005b6102cf610629565b6040516102759190611a07565b61026b6102ea3660046119ca565b6106bc565b6102a26102fd366004611a56565b6106f0565b61026b6103103660046119ca565b610767565b61026b610323366004611a80565b61079e565b61026b61087f565b610338610891565b6040516102759493929190938452602084019290925264ffffffffff166040830152606082015260800190565b6102c56103733660046119ca565b6108ca565b6102a2610386366004611aac565b61092b565b60125b60405160ff9091168152602001610275565b6103a8610a22565b6040516001600160a01b039091168152602001610275565b61026b610a2e565b6103a8610ab2565b61026b6103de366004611ae8565b5060001990565b6103a8610abc565b61026b6103fb3660046119ca565b610ac8565b6102c5610ad3565b6102c5610416366004611b03565b610e60565b600061026b565b61026b610430366004611a80565b610ef5565b61026b610443366004611ae8565b610f10565b61026b610456366004611a80565b610f3c565b610463610fad565b60405167ffffffffffffffff9091168152602001610275565b6102cf610fb9565b61026b611041565b61026b61105d565b6102a26104a2366004611a56565b611068565b61026b6104b53660046119ca565b6110e0565b61026b6104c8366004611b25565b611106565b61026b611157565b61026b6104e3366004611b25565b61116c565b61038e6111b2565b61026b6104fe3660046119ca565b6111be565b61026b610511366004611ae8565b6111e5565b6102c5610524366004611b61565b611217565b61026b610537366004611ae8565b611479565b61026b61054a366004611bd4565b6114a6565b61026b61055d3660046119ca565b6114e2565b600061056c610ab2565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa1580156105b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d69190611bfe565b905090565b6105e3610abc565b6001600160a01b0316336001600160a01b03161461061c5760405162461bcd60e51b815260040161061390611c17565b60405180910390fd5b806106256114ed565b5550565b6060610633610ab2565b6001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610670573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106989190810190611c5a565b6040516020016106a89190611d07565b604051602081830303815290604052905090565b6000806106c761087f565b905080156106e7576106e26106da610562565b84908361151b565b6106e9565b825b9392505050565b6000806106fb611539565b33600081815260028301602090815260408083206001600160a01b038a16808552908352928190208890555187815293945090927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a360019150505b92915050565b60008061077261087f565b9050801561078e576106e281610786610562565b859190611567565b678ac7230489e800009392505050565b60006107a8610abc565b6001600160a01b0316336001600160a01b0316146107d85760405162461bcd60e51b815260040161061390611c17565b60006107e2610ab2565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610828573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084c9190611bfe565b90508084111561085a578093505b6108778385610867610ab2565b6001600160a01b0316919061158d565b509192915050565b60008061088a611539565b5492915050565b60008060008060006108a16114ed565b805460018201546002830154600390930154919890975064ffffffffff90921695509350915050565b6108d2610abc565b6001600160a01b0316336001600160a01b0316146109025760405162461bcd60e51b815260040161061390611c17565b600061090c6114ed565b9050818160030160008282546109229190611d57565b90915550505050565b600080610936611539565b6001600160a01b038616600090815260028201602090815260408083203384529091529020549091506000198114610999576109728482611d6a565b6001600160a01b038716600090815260028401602090815260408083203384529091529020555b6001600160a01b0386166000908152600183016020526040812080548692906109c3908490611d6a565b90915550506001600160a01b03808616600081815260018501602052604090819020805488019055519091881690600080516020611e2083398151915290610a0e9088815260200190565b60405180910390a350600195945050505050565b60006105d66000611605565b60006105d6604080517f2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd60208201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69181019190915246606082015230608082015260009060a00160405160208183030381529060405280519060200120905090565b60006105d661162a565b60006105d66029611605565b6000610761826106bc565b6000610add6114ed565b600281015490915064ffffffffff16600003610b0f57600360405163683f44bb60e11b81526004016106139190611d7d565b610b17610fad565b67ffffffffffffffff16610b29610abc565b6001600160a01b031663b97dd9e26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b66573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8a9190611da5565b67ffffffffffffffff161015610bb657600060405163683f44bb60e11b81526004016106139190611d7d565b600281015464ffffffffff16421015610be557600160405163683f44bb60e11b81526004016106139190611d7d565b6000808260030154610bf5610ab2565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610c3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5f9190611bfe565b610c699190611d6a565b90508260010154811015610d1357610c7f610abc565b6001600160a01b03166365612e68610cbe8560000154670de0b6b3a7640000610ca89190611d6a565b848760010154610cb89190611d6a565b90611636565b6040518263ffffffff1660e01b8152600401610cdc91815260200190565b600060405180830381600087803b158015610cf657600080fd5b505af1158015610d0a573d6000803e3d6000fd5b50505050610da4565b610d1b610abc565b6001600160a01b0316639ff2cfb4610d538560000154670de0b6b3a7640000610d449190611d6a565b6001870154610cb89086611d6a565b6040518263ffffffff1660e01b8152600401610d7191815260200190565b600060405180830381600087803b158015610d8b57600080fd5b505af1158015610d9f573d6000803e3d6000fd5b505050505b8254610dc357610dbe610db5610abc565b82610867610ab2565b610def565b8254610dd89082670de0b6b3a764000061151b565b9150818103908214610def57610def610db5610abc565b60028301805464ffffffffff191690557f8dab6d35466ca3cba614bc5b262979b277949786977e81107f375f7e39f7734a3083610e2a610abc565b604080516001600160a01b03948516815260208101939093529216818301526060810184905290519081900360800190a1505050565b610e68610abc565b6001600160a01b0316336001600160a01b031614610e985760405162461bcd60e51b815260040161061390611c17565b6000610ea26114ed565b6001810180548501905590506000610ebb42840161164b565b600283015490915064ffffffffff9081169082161115610eef5760028201805464ffffffffff191664ffffffffff83161790555b50505050565b6000604051630280e1e560e61b815260040160405180910390fd5b6000610f1a611539565b6001600160a01b03909216600090815260019290920160205250604090205490565b6000610f46610abc565b6001600160a01b0316336001600160a01b031614610f9c5760405162461bcd60e51b81526020600482015260136024820152721bdb9b1e481d985d5b1d0818d85b881b5a5b9d606a1b6044820152606401610613565b610fa68284611663565b5090919050565b60006105d6603d6116ce565b6060610fc3610abc565b610fcb610ab2565b6001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015611008573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110309190810190611c5a565b6040516020016106a8929190611dcf565b60008061104c6114ed565b6002015464ffffffffff1692915050565b60008061088a6114ed565b600080611073611539565b336000908152600182016020526040812080549293508592909190611099908490611d6a565b90915550506001600160a01b038416600081815260018301602052604090819020805486019055513390600080516020611e20833981519152906107539087815260200190565b6000806110eb61087f565b9050801561078e576106e26110fe610562565b849083611567565b6000806111116114ed565b600281015490915064ffffffffff161561114157600260405163683f44bb60e11b81526004016106139190611d7d565b61114c8585856116f3565b91505b509392505050565b6000806111626114ed565b6001015492915050565b6000806111776114ed565b600281015490915064ffffffffff16156111a757600260405163683f44bb60e11b81526004016106139190611d7d565b61114c8585856117e0565b60006105d6601461190a565b6000806111c961087f565b905080156106e7576106e2816111dd610562565b85919061151b565b6000806111f0611539565b6001600160a01b03841660009081526001820160205260409020549091506106e9906106bc565b428410156112675760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610613565b60006001611273610a2e565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98a8a8a61129f611539565b6001600160a01b038f8116600090815260039290920160209081526040928390208054600181019091558351808301989098529582168784015293166060860152608085019190915260a084019290925260c08084018b90528251808503909101815260e08401909252815191012061190160f01b6101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa15801561138e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906113c45750876001600160a01b0316816001600160a01b0316145b6114015760405162461bcd60e51b815260206004820152600e60248201526d24a72b20a624a22fa9a4a3a722a960911b6044820152606401610613565b8561140a611539565b6001600160a01b039283166000908152600291909101602090815260408083208b86168085529083529281902093909355915188815290928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b600080611484611539565b6001600160a01b03909316600090815260019093016020525050604090205490565b6000806114b1611539565b6001600160a01b03948516600090815260029190910160209081526040808320959096168252939093525050205490565b6000610761826111be565b60008061076160017f9d9972a5048ce9bc4a301fa478468497c41609cb7f4770f91626fcf592113934611d6a565b600082600019048411830215820261153257600080fd5b5091020490565b60008061076160017f6c9d8be213da072972500acecface6c6d1d5ffbaace52819bc37703107293592611d6a565b600082600019048411830215820261157e57600080fd5b50910281810615159190040190565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610eef5760405162461bcd60e51b815260206004820152600f60248201526e1514905394d1915497d19052531151608a1b6044820152606401610613565b60008061161c600119368181013560f01c90030190565b929092013560601c92915050565b60006105d66015611605565b60006106e98383670de0b6b3a764000061151b565b600065010000000000821061165f57600080fd5b5090565b600061166d611539565b9050818160000160008282546116839190611d57565b90915550506001600160a01b0383166000818152600183016020908152604080832080548701905551858152600080516020611e2083398151915291015b60405180910390a3505050565b6000806116e5600119368181013560f01c90030190565b929092013560c01c92915050565b60006116fe84610767565b9050600061170a611539565b9050336001600160a01b0384161461177e576001600160a01b03831660009081526002820160209081526040808320338452909152902054600019811461177c576117558382611d6a565b6001600160a01b038516600090815260028401602090815260408083203384529091529020555b505b611788838361192f565b60408051868152602081018490526001600160a01b03808616929087169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a461114f8486610867610ab2565b6000806117eb611539565b9050336001600160a01b0384161461185f576001600160a01b03831660009081526002820160209081526040808320338452909152902054600019811461185d576118368682611d6a565b6001600160a01b038516600090815260028401602090815260408083203384529091529020555b505b61186885610ac8565b9150816000036118a85760405162461bcd60e51b815260206004820152600b60248201526a5a45524f5f41535345545360a81b6044820152606401610613565b6118b2838661192f565b60408051838152602081018790526001600160a01b03808616929087169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a461114f8483610867610ab2565b600080611921600119368181013560f01c90030190565b929092013560f81c92915050565b6000611939611539565b6001600160a01b0384166000908152600182016020526040812080549293508492909190611968908490611d6a565b9091555050805482900381556040518281526000906001600160a01b03851690600080516020611e20833981519152906020016116c1565b6000602082840312156119b257600080fd5b81356001600160e01b0319811681146106e957600080fd5b6000602082840312156119dc57600080fd5b5035919050565b60005b838110156119fe5781810151838201526020016119e6565b50506000910152565b6020815260008251806020840152611a268160408501602087016119e3565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114611a5157600080fd5b919050565b60008060408385031215611a6957600080fd5b611a7283611a3a565b946020939093013593505050565b60008060408385031215611a9357600080fd5b82359150611aa360208401611a3a565b90509250929050565b600080600060608486031215611ac157600080fd5b611aca84611a3a565b9250611ad860208501611a3a565b9150604084013590509250925092565b600060208284031215611afa57600080fd5b6106e982611a3a565b60008060408385031215611b1657600080fd5b50508035926020909101359150565b600080600060608486031215611b3a57600080fd5b83359250611b4a60208501611a3a565b9150611b5860408501611a3a565b90509250925092565b600080600080600080600060e0888a031215611b7c57600080fd5b611b8588611a3a565b9650611b9360208901611a3a565b95506040880135945060608801359350608088013560ff81168114611bb757600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611be757600080fd5b611bf083611a3a565b9150611aa360208401611a3a565b600060208284031215611c1057600080fd5b5051919050565b6020808252601390820152721bdb9b1e481d985d5b1d0818d85b8818d85b1b606a1b604082015260600190565b634e487b7160e01b600052604160045260246000fd5b600060208284031215611c6c57600080fd5b815167ffffffffffffffff80821115611c8457600080fd5b818401915084601f830112611c9857600080fd5b815181811115611caa57611caa611c44565b604051601f8201601f19908116603f01168101908382118183101715611cd257611cd2611c44565b81604052828152876020848701011115611ceb57600080fd5b611cfc8360208301602088016119e3565b979650505050505050565b714153542d57697468647261775661756c742d60701b815260008251611d348160128501602087016119e3565b9190910160120192915050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561076157610761611d41565b8181038181111561076157610761611d41565b6020810160048310611d9f57634e487b7160e01b600052602160045260246000fd5b91905290565b600060208284031215611db757600080fd5b815167ffffffffffffffff811681146106e957600080fd5b644153542d5760d81b81526bffffffffffffffffffffffff198360601b166005820152602d60f81b601982015260008251611e1181601a8501602087016119e3565b91909101601a01939250505056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220020bcf786c0b5ceeb05f159fe4a998ad528232aaf95be4d3c44db8f36590a48a64736f6c63430008110033'

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

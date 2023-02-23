/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../common'
import type { ClearingHouse, ClearingHouseInterface } from '../ClearingHouse'

const _abi = [
  {
    inputs: [],
    name: 'InexactFraction',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum ClearingHouse.InvalidRequestReason',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'InvalidRequest',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'URI',
    type: 'event',
  },
  {
    inputs: [],
    name: 'COLLATERAL_ID',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
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
    inputs: [
      {
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
    ],
    name: 'balanceOfBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'output',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAuctionData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'startTime',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'endTime',
            type: 'uint48',
          },
          {
            internalType: 'address',
            name: 'liquidator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'lienId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amountOwed',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ClearingHouse.AuctionStack[]',
            name: 'stack',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ClearingHouse.AuctionData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
    inputs: [
      {
        internalType: 'address',
        name: 'operator_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data_',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
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
        name: 'identifier',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'startTime',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'endTime',
            type: 'uint48',
          },
          {
            internalType: 'address',
            name: 'liquidator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'lienId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amountOwed',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ClearingHouse.AuctionStack[]',
            name: 'stack',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ClearingHouse.AuctionData',
        name: 'auctionData',
        type: 'tuple',
      },
    ],
    name: 'setAuctionData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleLiquidatorNFTClaim',
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
    inputs: [
      {
        internalType: 'address',
        name: 'tokenContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'transferUnderlying',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'validateOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const _bytecode =
  '0x608060405234801561001057600080fd5b506123ba806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ff5760003560e01c80636a67acc511610097578063ca8d0ddb11610066578063ca8d0ddb14610253578063ce4635861461025b578063e985e9c51461026e578063f242432a1461028457600080fd5b80636a67acc51461020a578063a22cb4651461021f578063b06b41f914610231578063c237c7031461023957600080fd5b806332fe7b26116100d357806332fe7b26146101a457806336c43afd146101c45780633c7d3684146101d75780634e1273f4146101ea57600080fd5b8062fdd58e1461010457806301ffc9a71461012a578063150b7a021461015e5780632eb2c2d61461018a575b600080fd5b6101176101123660046113ea565b610297565b6040519081526020015b60405180910390f35b61014e610138366004611416565b6001600160e01b031916636cdb3d1360e11b1490565b6040519015158152602001610121565b61017161016c36600461148f565b6102a1565b6040516001600160e01b03199091168152602001610121565b6101a2610198366004611545565b5050505050505050565b005b6101ac6102b3565b6040516001600160a01b039091168152602001610121565b6101a26101d2366004611603565b6102c4565b6101a26101e536600461163d565b610370565b6101fd6101f836600461167f565b61045f565b60405161012191906116ea565b6102126104e1565b604051610121919061172e565b6101a261022d366004611807565b5050565b6101a2610631565b6102416107ac565b60405160ff9091168152602001610121565b6101176107b8565b6101a2610269366004611b40565b6107c4565b61014e61027c366004611c98565b600192915050565b6101a2610292366004611cc6565b610b7a565b6000195b92915050565b630a85bd0160e11b5b95945050505050565b60006102bf6000610b8a565b905090565b60006102d06000610b8a565b9050806001600160a01b03166341700b976040518163ffffffff1660e01b8152600401602060405180830381865afa158015610310573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103349190611d41565b6001600160a01b0316336001600160a01b03161461035157600080fd5b600061035b610baf565b905082816103698282611ef4565b5050505050565b600061037a6102b3565b9050806001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103de9190611d41565b6001600160a01b0316336001600160a01b0316146103fb57600080fd5b604051632142170760e11b81523060048201526001600160a01b038381166024830152604482018590528516906342842e0e90606401600060405180830381600087803b15801561044b57600080fd5b505af1158015610198573d6000803e3d6000fd5b6060836001600160401b0381111561047957610479611840565b6040519080825280602002602001820160405280156104a2578160200160208202803683370190505b50905060005b848110156104d8576000198282815181106104c5576104c5611fc4565b60209081029190910101526001016104a8565b50949350505050565b6105436040518060e001604052806000815260200160008152602001600065ffffffffffff168152602001600065ffffffffffff16815260200160006001600160a01b0316815260200160006001600160a01b03168152602001606081525090565b61054b610baf565b6040805160e081018252825481526001830154602080830191909152600284015465ffffffffffff80821684860152660100000000000082041660608401526001600160a01b03600160601b9091048116608084015260038501541660a083015260048401805484518184028101840190955280855292949360c0860193909260009084015b828210156106245760008481526020908190206040805160608101825260038602909201805483526001808201548486015260029091015464ffffffffff169183019190915290835290920191016105d1565b5050505081525050905090565b600061063b6102b3565b9050806001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa15801561067b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069f9190611d41565b6001600160a01b0316336001600160a01b0316146106bc57600080fd5b60006106c6610baf565b905060006106d26107b8565b9050826001600160a01b03166341700b976040518163ffffffff1660e01b8152600401602060405180830381865afa158015610712573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107369190611d41565b604051633624ea6b60e21b81526001600160a01b03919091169063d893a9ac9061076d90600090859082906004808a019101612037565b600060405180830381600087803b15801561078757600080fd5b505af115801561079b573d6000803e3d6000fd5b505050506107a7610bdd565b505050565b60006102bf6014610c1e565b60006102bf6015610c43565b60006107ce6102b3565b9050806001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa15801561080e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108329190611d41565b6001600160a01b0316336001600160a01b03161461084f57600080fd5b604080516001808252818301909252600091816020015b61086e6112d5565b815260200190600190039081610866579050509050828160008151811061089757610897611fc4565b60200260200101819052508260000151604001516000815181106108bd576108bd611fc4565b6020026020010151602001516001600160a01b031663095ea7b3836001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015610915573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109399190611d41565b6001600160a01b03166384eafda06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610976573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099a9190611d41565b85516040015180516000906109b1576109b1611fc4565b6020026020010151604001516040518363ffffffff1660e01b81526004016109ee9291906001600160a01b03929092168252602082015260400190565b600060405180830381600087803b158015610a0857600080fd5b505af1158015610a1c573d6000803e3d6000fd5b50505050816001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a5e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a829190611d41565b6001600160a01b031663387b66296040518163ffffffff1660e01b8152600401602060405180830381865afa158015610abf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae39190611d41565b6001600160a01b03166388147732826040518263ffffffff1660e01b8152600401610b0e91906121cf565b6020604051808303816000875af1158015610b2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b51919061230e565b6107a757600260405163eac08f1960e01b8152600401610b71919061232b565b60405180910390fd5b610b82610c65565b505050505050565b600080610ba1600119368181013560f01c90030190565b929092013560601c92915050565b60008061029b60017f80e7a921bf2aade58bb98771db2ced811354981ccd3c2a634356cac5cf993148612345565b6000610be7610baf565b600080825560018201819055600282018190556003820180546001600160a01b031916905590915081906107a760048301826112f5565b600080610c35600119368181013560f01c90030190565b929092013560f81c92915050565b600080610c5a600119368181013560f01c90030190565b929092013592915050565b6000610c6f6102b3565b90506000610c7b610baf565b6003810154815460018084015460028501549495506001600160a01b0390931693600093610cc39392909165ffffffffffff8082169266010000000000009092041690611202565b905080600003610ce957600160405163eac08f1960e01b8152600401610b71919061232b565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015610d30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d549190612358565b905080821115610d7a57600060405163eac08f1960e01b8152600401610b71919061232b565b6000610d846107b8565b604051631276cf5360e01b81526004808201859052919250908601906000906001600160a01b03891690631276cf5390602401602060405180830381865afa158015610dd4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df89190612358565b9050610e048185612345565b6002880154909450610e2a906001600160a01b0388811691600160601b90041683611257565b856001600160a01b031663095ea7b3896001600160a01b03166396d6401d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9b9190611d41565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018790526044016020604051808303816000875af1158015610ee8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0c919061230e565b50876001600160a01b03166341700b976040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6f9190611d41565b604051633624ea6b60e21b81526001600160a01b03919091169063d893a9ac90610fa5908990879089906004808f019101612037565b600060405180830381600087803b158015610fbf57600080fd5b505af1158015610fd3573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092506001600160a01b03891691506370a0823190602401602060405180830381865afa15801561101e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110429190612358565b9050801561112e5761112e896001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa15801561108b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110af9190611d41565b6001600160a01b0316636352211e866040518263ffffffff1660e01b81526004016110dc91815260200190565b602060405180830381865afa1580156110f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111d9190611d41565b6001600160a01b0389169083611257565b886001600160a01b031663f5f1f1a76040518163ffffffff1660e01b8152600401602060405180830381865afa15801561116c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111909190611d41565b6001600160a01b0316632e993611856040518263ffffffff1660e01b81526004016111bd91815260200190565b600060405180830381600087803b1580156111d757600080fd5b505af11580156111eb573d6000803e3d6000fd5b505050506111f7610bdd565b505050505050505050565b600084861461124d57838303428590038082036000611221838a611de1565b61122b838c611de1565b6112359190612371565b905085848783030401811515029450505050506102aa565b5092949350505050565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d11600160005114161716915050806112cf5760405162461bcd60e51b815260206004820152600f60248201526e1514905394d1915497d19052531151608a1b6044820152606401610b71565b50505050565b60405180604001604052806112e8611319565b8152602001606081525090565b50805460008255600302906000526020600020908101906113169190611396565b50565b60405180610160016040528060006001600160a01b0316815260200160006001600160a01b031681526020016060815260200160608152602001600060038111156113665761136661206e565b815260006020820181905260408201819052606082018190526080820181905260a0820181905260c09091015290565b5b808211156113c1576000808255600182015560028101805464ffffffffff19169055600301611397565b5090565b6001600160a01b038116811461131657600080fd5b80356113e5816113c5565b919050565b600080604083850312156113fd57600080fd5b8235611408816113c5565b946020939093013593505050565b60006020828403121561142857600080fd5b81356001600160e01b03198116811461144057600080fd5b9392505050565b60008083601f84011261145957600080fd5b5081356001600160401b0381111561147057600080fd5b60208301915083602082850101111561148857600080fd5b9250929050565b6000806000806000608086880312156114a757600080fd5b85356114b2816113c5565b945060208601356114c2816113c5565b93506040860135925060608601356001600160401b038111156114e457600080fd5b6114f088828901611447565b969995985093965092949392505050565b60008083601f84011261151357600080fd5b5081356001600160401b0381111561152a57600080fd5b6020830191508360208260051b850101111561148857600080fd5b60008060008060008060008060a0898b03121561156157600080fd5b883561156c816113c5565b9750602089013561157c816113c5565b965060408901356001600160401b038082111561159857600080fd5b6115a48c838d01611501565b909850965060608b01359150808211156115bd57600080fd5b6115c98c838d01611501565b909650945060808b01359150808211156115e257600080fd5b506115ef8b828c01611447565b999c989b5096995094979396929594505050565b60006020828403121561161557600080fd5b81356001600160401b0381111561162b57600080fd5b820160e0818503121561144057600080fd5b60008060006060848603121561165257600080fd5b833561165d816113c5565b9250602084013591506040840135611674816113c5565b809150509250925092565b6000806000806040858703121561169557600080fd5b84356001600160401b03808211156116ac57600080fd5b6116b888838901611501565b909650945060208701359150808211156116d157600080fd5b506116de87828801611501565b95989497509550505050565b6020808252825182820181905260009190848201906040850190845b8181101561172257835183529284019291840191600101611706565b50909695505050505050565b6000602080835261010083018451828501528185015160408181870152808701519150606065ffffffffffff8084168289015280828a0151166080890152506080880151925060018060a01b0380841660a08901528060a08a01511660c08901525060c0880151925060e080880152838351808652610120890191508685019550600094505b808510156117ec57855180518352878101518884015284015164ffffffffff16848301529486019460019490940193908201906117b4565b5098975050505050505050565b801515811461131657600080fd5b6000806040838503121561181a57600080fd5b8235611825816113c5565b91506020830135611835816117f9565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60405160a081016001600160401b038111828210171561187857611878611840565b60405290565b60405160c081016001600160401b038111828210171561187857611878611840565b604080519081016001600160401b038111828210171561187857611878611840565b60405161016081016001600160401b038111828210171561187857611878611840565b604051601f8201601f191681016001600160401b038111828210171561190d5761190d611840565b604052919050565b60006001600160401b0382111561192e5761192e611840565b5060051b60200190565b8035600681106113e557600080fd5b600082601f83011261195857600080fd5b8135602061196d61196883611915565b6118e5565b82815260a0928302850182019282820191908785111561198c57600080fd5b8387015b858110156119f75781818a0312156119a85760008081fd5b6119b0611856565b6119b982611938565b8152858201356119c8816113c5565b818701526040828101359082015260608083013590820152608080830135908201528452928401928101611990565b5090979650505050505050565b600082601f830112611a1557600080fd5b81356020611a2561196883611915565b82815260c09283028501820192828201919087851115611a4457600080fd5b8387015b858110156119f75781818a031215611a605760008081fd5b611a6861187e565b611a7182611938565b815285820135611a80816113c5565b8187015260408281013590820152606080830135908201526080808301359082015260a080830135611ab1816113c5565b908201528452928401928101611a48565b8035600481106113e557600080fd5b600082601f830112611ae257600080fd5b81356001600160401b03811115611afb57611afb611840565b611b0e601f8201601f19166020016118e5565b818152846020838601011115611b2357600080fd5b816020850160208301376000918101602001919091529392505050565b600060208284031215611b5257600080fd5b81356001600160401b0380821115611b6957600080fd5b9083019060408286031215611b7d57600080fd5b611b856118a0565b823582811115611b9457600080fd5b83016101608188031215611ba757600080fd5b611baf6118c2565b611bb8826113da565b8152611bc6602083016113da565b6020820152604082013584811115611bdd57600080fd5b611be989828501611947565b604083015250606082013584811115611c0157600080fd5b611c0d89828501611a04565b606083015250611c1f60808301611ac2565b608082015260a082013560a082015260c082013560c082015260e082013560e08201526101008083013581830152506101208083013581830152506101408083013581830152508083525050602083013582811115611c7d57600080fd5b611c8987828601611ad1565b60208301525095945050505050565b60008060408385031215611cab57600080fd5b8235611cb6816113c5565b91506020830135611835816113c5565b60008060008060008060a08789031215611cdf57600080fd5b8635611cea816113c5565b95506020870135611cfa816113c5565b9450604087013593506060870135925060808701356001600160401b03811115611d2357600080fd5b611d2f89828a01611447565b979a9699509497509295939492505050565b600060208284031215611d5357600080fd5b8151611440816113c5565b6000813565ffffffffffff8116811461029b57600080fd5b6000813561029b816113c5565b6000808335601e19843603018112611d9a57600080fd5b8301803591506001600160401b03821115611db457600080fd5b602001915060608102360382131561148857600080fd5b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761029b5761029b611dcb565b813581556020820135600182015560028101604083013564ffffffffff8116808214611e2357600080fd5b825464ffffffffff191617909155505050565b68010000000000000000831115611e4f57611e4f611840565b805483825580841015611ebf5760038181028181048314611e7257611e72611dcb565b8582028281048714611e8657611e86611dcb565b6000858152602081209283019291909101905b82821015611eba578082558060018301558060028301558382019150611e99565b505050505b5060008181526020812083915b85811015610b8257611ede8383611df8565b6060929092019160039190910190600101611ecc565b81358155602082013560018201556002810165ffffffffffff611f1960408501611d5e565b1681546bffffffffffff000000000000611f3560608701611d5e565b60301b166080860135611f47816113c5565b6bffffffffffffffffffffffff939093161760609290921b6bffffffffffffffffffffffff19169190911790915550611fa9611f8560a08401611d76565b6003830180546001600160a01b0319166001600160a01b0392909216919091179055565b611fb660c0830183611d83565b6112cf818360048601611e36565b634e487b7160e01b600052603260045260246000fd5b6000815480845260208085019450836000528060002060005b8381101561202c578154875260018083015484890152600283015464ffffffffff16604089015260609097019660039092019101611ff3565b509495945050505050565b60018060a01b03851681528360208201528260408201526080606082015260006120646080830184611fda565b9695505050505050565b634e487b7160e01b600052602160045260246000fd5b600681106120945761209461206e565b9052565b600081518084526020808501945080840160005b8381101561202c5781516120c1888251612084565b838101516001600160a01b03168885015260408082015190890152606080820151908901526080908101519088015260a090960195908201906001016120ac565b600081518084526020808501945080840160005b8381101561202c57815161212b888251612084565b808401516001600160a01b0390811689860152604080830151908a0152606080830151908a0152608080830151908a015260a091820151169088015260c09096019590820190600101612116565b600481106120945761209461206e565b6000815180845260005b818110156121af57602081850181015186830182015201612193565b506000602082860101526020601f19601f83011685010191505092915050565b60006020808301818452808551808352604092508286019150828160051b87010184880160005b8381101561230057603f19898403810186528251805188865280516001600160a01b031689870152898101516060612238818901836001600160a01b03169052565b8a8301519150610160608081818b01526122566101a08b0185612098565b935082850151925060a0878b860301818c01526122738585612102565b975081860151945060c0935061228b848c0186612179565b85015160e08b81019190915292850151610100808c019190915292850151610120808c019190915292850151610140808c019190915292850151918a0191909152509091015161018087015250880151848203898601526122ec8282612189565b9689019694505050908601906001016121f6565b509098975050505050505050565b60006020828403121561232057600080fd5b8151611440816117f9565b602081016003831061233f5761233f61206e565b91905290565b8181038181111561029b5761029b611dcb565b60006020828403121561236a57600080fd5b5051919050565b8082018082111561029b5761029b611dcb56fea26469706673582212208646fdfb2ce8d93f020deaf6692ea16f3eecce3b3fd640928dad7875e91b47f464736f6c63430008110033'

type ClearingHouseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: ClearingHouseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class ClearingHouse__factory extends ContractFactory {
  constructor(...args: ClearingHouseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ClearingHouse> {
    return super.deploy(overrides || {}) as Promise<ClearingHouse>
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): ClearingHouse {
    return super.attach(address) as ClearingHouse
  }
  override connect(signer: Signer): ClearingHouse__factory {
    return super.connect(signer) as ClearingHouse__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): ClearingHouseInterface {
    return new utils.Interface(_abi) as ClearingHouseInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClearingHouse {
    return new Contract(address, _abi, signerOrProvider) as ClearingHouse
  }
}

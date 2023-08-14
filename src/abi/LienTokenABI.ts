export const LienTokenABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InexactFraction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFileData',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum ILienToken.InvalidLienStates',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'InvalidLienState',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLoanState',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'InvalidTokenId',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnsupportedFile',
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
        indexed: true,
        internalType: 'uint256',
        name: 'id',
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
        indexed: true,
        internalType: 'address',
        name: 'owner',
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
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Authority',
        name: 'newAuthority',
        type: 'address',
      },
    ],
    name: 'AuthorityUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum ILienToken.FileType',
        name: 'what',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'FileUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
    ],
    name: 'NewLien',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lienId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Payment',
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
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
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
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'authority',
    outputs: [
      {
        internalType: 'contract Authority',
        name: '',
        type: 'address',
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
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
    ],
    name: 'calculateSlope',
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
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'feeTo',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILienToken.LienActionEncumber',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'createLien',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lienId',
        type: 'uint256',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'newStack',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'owingAtEnd',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'enum ILienToken.FileType',
            name: 'what',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct ILienToken.File',
        name: 'incoming',
        type: 'tuple',
      },
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
    ],
    name: 'getAuctionLiquidator',
    outputs: [
      {
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
    ],
    name: 'getCollateralState',
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
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
    ],
    name: 'getInterest',
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
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'getOwed',
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
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
    ],
    name: 'getOwed',
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
        name: 'auctionWindow',
        type: 'uint256',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
    ],
    name: 'handleLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Authority',
        name: '_AUTHORITY',
        type: 'address',
      },
      {
        internalType: 'contract ITransferProxy',
        name: '_TRANSFER_PROXY',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'collateralType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'address payable',
                name: 'vault',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'collateralId',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'maxAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'rate',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'duration',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPotentialDebt',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'liquidationInitialAsk',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct ILienToken.Details',
                name: 'details',
                type: 'tuple',
              },
            ],
            internalType: 'struct ILienToken.Lien',
            name: 'lien',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint40',
                name: 'last',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'end',
                type: 'uint40',
              },
            ],
            internalType: 'struct ILienToken.Point',
            name: 'point',
            type: 'tuple',
          },
        ],
        internalType: 'struct ILienToken.Stack',
        name: 'stack',
        type: 'tuple',
      },
    ],
    name: 'makePayment',
    outputs: [],
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
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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
        name: 'id',
        type: 'uint256',
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
        name: 'id',
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
        internalType: 'contract Authority',
        name: 'newAuthority',
        type: 'address',
      },
    ],
    name: 'setAuthority',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
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
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

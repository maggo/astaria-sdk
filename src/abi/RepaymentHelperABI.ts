export const RepaymentHelperABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_WETH9',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_lienToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_transferProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'contract IWETH9',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lienToken',
    outputs: [
      {
        internalType: 'contract ILienToken',
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
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferProxy',
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
    stateMutability: 'payable',
    type: 'receive',
  },
] as const
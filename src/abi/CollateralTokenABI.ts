export const CollateralTokenABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InvalidCollateral',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum ICollateralToken.InvalidCollateralStates',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'InvalidCollateralState',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidConduitKey',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPaymentToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSender',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTarget',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidZoneHash',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ListPriceTooLow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ProtocolPaused',
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
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'depositedFor',
        type: 'address',
      },
    ],
    name: 'Deposit721',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum ICollateralToken.FileType',
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
        indexed: false,
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
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
        indexed: false,
        internalType: 'struct Order',
        name: 'listingOrder',
        type: 'tuple',
      },
    ],
    name: 'ListedOnSeaport',
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
        internalType: 'address',
        name: 'underlyingAsset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'ReleaseTo',
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
    inputs: [],
    name: 'CONDUIT_CONTROLLER',
    outputs: [
      {
        internalType: 'contract ConduitControllerInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SEAPORT',
    outputs: [
      {
        internalType: 'contract ConsiderationInterface',
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
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'settlementToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'collateralId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startingPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endingPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct ICollateralToken.AuctionVaultParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'auctionVault',
    outputs: [
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
        name: 'orderParameters',
        type: 'tuple',
      },
    ],
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
        name: 'from',
        type: 'address',
      },
    ],
    name: 'depositERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'enum ICollateralToken.FileType',
            name: 'what',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct ICollateralToken.File',
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
        components: [
          {
            internalType: 'enum ICollateralToken.FileType',
            name: 'what',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct ICollateralToken.File[]',
        name: 'files',
        type: 'tuple[]',
      },
    ],
    name: 'fileBatch',
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
    inputs: [],
    name: 'getConduit',
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
    inputs: [],
    name: 'getConduitKey',
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
    name: 'getSeaportMetadata',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'metadata',
            type: 'bytes',
          },
        ],
        internalType: 'struct Schema[]',
        name: 'schemas',
        type: 'tuple[]',
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
    name: 'getUnderlying',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
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
        internalType: 'contract Authority',
        name: 'AUTHORITY_',
        type: 'address',
      },
      {
        internalType: 'contract ITransferProxy',
        name: 'TRANSFER_PROXY_',
        type: 'address',
      },
      {
        internalType: 'contract ILienToken',
        name: 'LIEN_TOKEN_',
        type: 'address',
      },
      {
        internalType: 'contract ConsiderationInterface',
        name: 'SEAPORT_',
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
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'counterAtLiquidation',
        type: 'uint256',
      },
    ],
    name: 'liquidatorNFTClaim',
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
        internalType: 'uint256',
        name: 'collateralId',
        type: 'uint256',
      },
    ],
    name: 'release',
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
        name: 'collateralId',
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
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'orderHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'fulfiller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'offerer',
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
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
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
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            internalType: 'bytes32[]',
            name: 'orderHashes',
            type: 'bytes32[]',
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
        ],
        internalType: 'struct ZoneParameters',
        name: 'zoneParameters',
        type: 'tuple',
      },
    ],
    name: 'validateOrder',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'validOrderMagicValue',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

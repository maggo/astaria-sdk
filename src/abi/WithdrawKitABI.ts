export const WithdrawKitABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'finalAuctionEnd',
        type: 'uint256',
      },
    ],
    name: 'FinalAuctionNotEnded',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'epoch',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'liensOpenForEpoch',
        type: 'uint256',
      },
    ],
    name: 'LiensOpenForEpoch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MinAmountError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'epoch',
        type: 'uint64',
      },
      {
        internalType: 'bytes',
        name: 'reason',
        type: 'bytes',
      },
    ],
    name: 'ProcessEpochError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'epoch',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'reserve',
        type: 'uint256',
      },
    ],
    name: 'WithdrawReserveNotZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'contract IWithdrawProxy',
        name: 'withdrawProxy',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minAmountOut',
        type: 'uint256',
      },
    ],
    name: 'redeem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

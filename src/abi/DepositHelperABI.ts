export const DepositHelperABI = [
  {
    inputs: [
      { internalType: 'address', name: '_transferProxy', type: 'address' },
      { internalType: 'address', name: '_weth', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferProxy',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

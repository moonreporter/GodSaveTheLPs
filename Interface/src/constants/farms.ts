import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

export const POOLS: AddressMap = {
  [ChainId.MATIC_TESTNET]: {
    '0xd4f3a200bbd8d105faed6e8ed995f8a12ad4e276': {
      id: 0,
      token0: {
        id: '0x740bBb10512409d52b1e861189AF79236aeC5201',
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
      token1: {
        id: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
        name: 'Wrapped MATIC',
        symbol: 'WMATIC',
        decimals: 18,
      },
      name: 'Solarbeam LP',
      symbol: 'SLP',
    },
    '0x740bBb10512409d52b1e861189AF79236aeC5201': {
      id: 1,
      token0: {
        id: '0x740bBb10512409d52b1e861189AF79236aeC5201',
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
    },
    '0x0b3e28Dc53d9E8E870014b36aF54FF9CF45De7Ab': {
      id: 2,
      token0: {
        id: '0x740bBb10512409d52b1e861189AF79236aeC5201',
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
      token1: {
        id: '0x0636617c67CB84D49C1417F641629Db7d8c065BA',
        name: 'USDC Test Coin',
        symbol: 'USDCt',
        decimals: 18,
      },
      name: 'Solarbeam LP',
      symbol: 'SLP',
    },
  },
}

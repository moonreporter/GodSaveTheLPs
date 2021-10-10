import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  lpToken: string
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [id: string]: PairInfo
  }
}

export const VAULTS: AddressMap = {
  [ChainId.MATIC_TESTNET]: {
    '0': {
      id: 0,
      lpToken: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
      token0: {
        id: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
    },
    '1': {
      id: 1,
      lpToken: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
      token0: {
        id: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
    },
    '2': {
      id: 2,
      lpToken: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
      token0: {
        id: '0x8Dd5d27874D877666193251756334b9291ED114F', // Changed this
        name: 'Solarbeam',
        symbol: 'SOLAR',
        decimals: 18,
      },
    }
  },
}

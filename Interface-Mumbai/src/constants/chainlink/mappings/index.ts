import BSC from './bsc'
import { ChainId } from '../../../sdk'
import HECO from './heco'
import KOVAN from './kovan'
import MAINNET from './mainnet'
import MATIC from './matic'
import XDAI from './xdai'

export type ChainlinkMappingList = {
  readonly [address: string]: {
    from: string
    to: string
    decimals: number
    fromDecimals: number
    toDecimals: number
    warning?: string
    address?: string
  }
}

export const CHAINLINK_MAPPING: {
  [chainId in ChainId]?: ChainlinkMappingList
} = {
  [ChainId.MAINNET]: MAINNET,
  [ChainId.KOVAN]: KOVAN,
  [ChainId.BSC]: BSC,
  [ChainId.HECO]: HECO,
  [ChainId.MATIC]: MATIC,
  [ChainId.XDAI]: XDAI,
}

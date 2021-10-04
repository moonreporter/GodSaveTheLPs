import { AbstractCurrency } from './AbstractCurrency'
import { ChainId } from '../enums'
import { Currency } from './Currency'
import invariant from 'tiny-invariant'
import { validateAndParseAddress } from '../functions/validateAndParseAddress'
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends AbstractCurrency {
  public readonly chainId: ChainId
  public readonly address: string

  public readonly isNative: false = false
  public readonly isToken: true = true

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string
  ) {
    super(chainId, decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address === other.address
    )
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(
  currencyA: Currency,
  currencyB: Currency
): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH9: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM]: new Token(
    ChainId.ARBITRUM,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_TESTNET]: new Token(
    ChainId.ARBITRUM_TESTNET,
    '0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.FANTOM]: new Token(
    ChainId.FANTOM,
    '0x74b23882a30290451A17c44f4F05243b6b58C76d',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.OKEX]: new Token(
    ChainId.OKEX,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.HECO]: new Token(
    ChainId.HECO,
    '0x64FF637fB478863B7468bc97D30a5bF3A428a1fD',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.HARMONY]: new Token(
    ChainId.HARMONY,
    '0x6983D1E6DEf3690C4d616b13597A09e6193EA013',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.XDAI]: new Token(
    ChainId.XDAI,
    '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
}

export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: WETH9[ChainId.MAINNET],
  [ChainId.ROPSTEN]: WETH9[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GÖRLI]: WETH9[ChainId.GÖRLI],
  [ChainId.KOVAN]: WETH9[ChainId.KOVAN],
  [ChainId.FANTOM]: new Token(
    ChainId.FANTOM,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.FANTOM_TESTNET]: new Token(
    ChainId.FANTOM_TESTNET,
    '0xf1277d1Ed8AD466beddF92ef448A132661956621',
    18,
    'FTM',
    'Wrapped FTM'
  ),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.XDAI]: new Token(
    ChainId.XDAI,
    '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    18,
    'WXDAI',
    'Wrapped xDai'
  ),
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.ARBITRUM]: WETH9[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_TESTNET]: WETH9[ChainId.ARBITRUM_TESTNET],
  [ChainId.MOONBEAM_TESTNET]: new Token(
    ChainId.MOONBEAM_TESTNET,
    '0xe73763DB808ecCDC0E36bC8E32510ED126910394',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.AVALANCHE_TESTNET]: new Token(
    ChainId.AVALANCHE_TESTNET,
    '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.HECO]: new Token(
    ChainId.HECO,
    '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
    18,
    'WHT',
    'Wrapped HT'
  ),
  [ChainId.HECO_TESTNET]: new Token(
    ChainId.HECO_TESTNET,
    '0x5B2DA6F42CA09C77D577a12BeaD0446148830687',
    18,
    'WHT',
    'Wrapped HT'
  ),
  [ChainId.HARMONY]: new Token(
    ChainId.HARMONY,
    '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
    18,
    'WONE',
    'Wrapped ONE'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0x7a2afac38517d512E55C0bCe3b6805c10a04D60F',
    18,
    'WONE',
    'Wrapped ONE'
  ),
  [ChainId.OKEX]: new Token(
    ChainId.OKEX,
    '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15',
    18,
    'WOKT',
    'Wrapped OKExChain'
  ),
  [ChainId.OKEX_TESTNET]: new Token(
    ChainId.OKEX_TESTNET,
    '0x2219845942d28716c0F7C605765fABDcA1a7d9E0',
    18,
    'WOKT',
    'Wrapped OKExChain'
  ),
  [ChainId.CELO]: new Token(
    ChainId.CELO,
    '0x471EcE3750Da237f93B8E339c536989b8978a438',
    18,
    'CELO',
    'Celo'
  ),
  [ChainId.PALM]: new Token(
    ChainId.PALM,
    '0xF98cABF0a963452C5536330408B2590567611a71',
    18,
    'WPALM',
    'Wrapped Palm'
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
}

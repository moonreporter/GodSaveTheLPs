import gql from 'graphql-tag'

export const factoryQuery = gql`
  query factoryQuery($id: String! = "0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac", $block: Block_height) {
    factory(id: $id, block: $block) {
      id
      volumeUSD
      liquidityUSD
    }
  }
`

export const userIdsQuery = gql`
  query userIdsQuery($first: Int! = 1000, $skip: Int! = 0) {
    users(first: $first, skip: $skip) {
      id
    }
  }
`
export const uniswapUserQuery = gql`
  query uniswapUserQuery($id: String!) {
    uniswapUser: user(id: $id) {
      id
      liquidityPositions {
        id
        liquidityTokenBalance
        # historicalSnapshots {
        #   id
        #   reserve0
        #   reserve1
        #   block
        #   timestamp
        #   liquidityTokenBalance
        #   liquidityTokenTotalSupply
        # }
      }
    }
  }
`

export const bundleFields = gql`
  fragment bundleFields on Bundle {
    id
    ethPrice
  }
`

export const ethPriceQuery = gql`
  query ethPriceQuery($id: Int! = 1, $block: Block_height) {
    bundles(id: $id, block: $block) {
      ...bundleFields
    }
  }
  ${bundleFields}
`

export const ethPriceTimeTravelQuery = gql`
  query ethPriceTimeTravelQuery($id: Int! = 1, $block: Block_height!) {
    bundles(id: $id, block: $block) {
      ...bundleFields
    }
  }
  ${bundleFields}
`

export const tokenPriceQuery = gql`
  query tokenPriceQuery($id: String!) {
    token(id: $id) {
      id
      derivedETH
    }
  }
`

export const dayDataFieldsQuery = gql`
  fragment dayDataFields on DayData {
    id
    date
    volumeETH
    volumeUSD
    untrackedVolume
    liquidityETH
    liquidityUSD
    txCount
  }
`

// Dashboard...
export const dayDatasQuery = gql`
  query dayDatasQuery($first: Int! = 1000, $date: Int! = 0, $where: DayData_filter) {
    dayDatas(first: $first, orderBy: date, orderDirection: desc, where: $where) {
      ...dayDataFields
    }
  }
  ${dayDataFieldsQuery}
`

// Pairs...
export const pairFieldsQuery = gql`
  fragment pairFields on Pair {
    id
    reserveUSD
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    trackedReserveETH
    token0 {
      ...PairToken
    }
    token1 {
      ...PairToken
    }
    reserve0
    reserve1
    token0Price
    token1Price
    totalSupply
    txCount
    timestamp
  }
  fragment PairToken on Token {
    id
    name
    symbol
    totalSupply
    derivedETH
  }
`

export const pairQuery = gql`
  query pairQuery($id: String!) {
    pair(id: $id) {
      ...pairFields
    }
  }
  ${pairFieldsQuery}
`

export const pairTimeTravelQuery = gql`
  query pairTimeTravelQuery($id: String!, $block: Block_height!) {
    pair(id: $id, block: $block) {
      ...pairFields
    }
  }
  ${pairFieldsQuery}
`

export const pairIdsQuery = gql`
  query pairIdsQuery {
    pairs(first: 1000) {
      id
    }
  }
`

export const pairCountQuery = gql`
  query pairCountQuery {
    uniswapFactories {
      pairCount
    }
  }
`

export const pairDayDatasQuery = gql`
  query pairDayDatasQuery($first: Int = 1000, $date: Int = 0, $pairs: [Bytes]!) {
    pairDayDatas(first: $first, orderBy: date, orderDirection: desc, where: { pair_in: $pairs, date_gt: $date }) {
      date
      pair {
        id
      }
      token0 {
        derivedETH
      }
      token1 {
        derivedETH
      }
      reserveUSD
      volumeToken0
      volumeToken1
      volumeUSD
      txCount
    }
  }
`

export const liquidityPositionsQuery = gql`
  query liquidityPositionSubsetQuery($first: Int! = 1000, $where: LiquidityPosition_filter) {
    liquidityPositions(first: $first, where: $where) {
      id
      liquidityTokenBalance
      user {
        id
      }
      pair {
        id
      }
    }
  }
`

export const pairsQuery = gql`
  query pair(
    $skip: Int = 0
    $first: Int = 1000
    $where: Pair_filter
    $block: Block_height
    $orderBy: Pair_orderBy = "trackedReserveETH"
    $orderDirection: OrderDirection = "desc"
  ) {
    pairs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      ...pairFields
    }
  }
  ${pairFieldsQuery}
`

export const pairsTimeTravelQuery = gql`
  query pairsTimeTravelQuery($first: Int! = 1000, $pairAddresses: [Bytes]!, $block: Block_height!) {
    pairs(
      first: $first
      block: $block
      orderBy: trackedReserveETH
      orderDirection: desc
      where: { id_in: $pairAddresses }
    ) {
      id
      reserveUSD
      trackedReserveETH
      volumeUSD
      untrackedVolumeUSD
      txCount
    }
  }
`

// Tokens...
export const tokenFieldsQuery = gql`
  fragment tokenFields on Token {
    id
    symbol
    name
    decimals
    totalSupply
    volume
    volumeUSD
    untrackedVolumeUSD
    txCount
    liquidity
    derivedETH
  }
`

export const tokenQuery = gql`
  query tokenQuery($id: String!, $block: Block_height) {
    token(id: $id, block: $block) {
      ...tokenFields
    }
  }
  ${tokenFieldsQuery}
`

export const tokenTimeTravelQuery = gql`
  query tokenTimeTravelQuery($id: String!, $block: Block_height!) {
    token(id: $id, block: $block) {
      ...tokenFields
    }
  }
  ${tokenFieldsQuery}
`

export const tokenIdsQuery = gql`
  query tokenIdsQuery {
    tokens(first: 1000) {
      id
    }
  }
`

export const tokenDayDatasQuery = gql`
  query tokenDayDatasQuery($first: Int! = 1000, $tokens: [Bytes]!, $date: Int! = 0) {
    tokenDayDatas(first: $first, orderBy: date, orderDirection: desc, where: { token_in: $tokens, date_gt: $date }) {
      id
      date
      token {
        id
      }
      volumeUSD
      liquidityUSD
      priceUSD
      txCount
    }
  }
`

export const tokenPairsQuery = gql`
  query tokenPairsQuery($id: String!) {
    pairs0: pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc, where: { token0: $id }) {
      ...pairFields
    }
    pairs1: pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc, where: { token1: $id }) {
      ...pairFields
    }
  }
  ${pairFieldsQuery}
`

export const tokensQuery = gql`
  query tokensQuery($first: Int! = 1000, $block: Block_height) {
    tokens(first: $first, orderBy: volumeUSD, orderDirection: desc, block: $block) {
      ...tokenFields
      dayData(first: 7, skip: 0, orderBy: date, order: asc) {
        id
        priceUSD
      }
      # hourData(first: 168, skip: 0, orderBy: date, order: asc) {
      #   priceUSD
      # }
    }
  }
  ${tokenFieldsQuery}
`

export const tokenSubsetQuery = gql`
  query tokenSubsetQuery(
    $first: Int! = 1000
    $tokenAddresses: [Bytes]!
    $orderBy: String! = "id"
    $orderDirection: String! = "desc"
  ) {
    tokens(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: { id_in: $tokenAddresses }) {
      ...tokenFields
    }
  }
  ${tokenFieldsQuery}
`

export const tokensTimeTravelQuery = gql`
  query tokensTimeTravelQuery($first: Int! = 1000, $block: Block_height!) {
    tokens(first: $first, block: $block) {
      ...tokenFields
    }
  }
  ${tokenFieldsQuery}
`

// Transactions...
export const transactionsQuery = gql`
  query transactionsQuery($pairAddresses: [Bytes]!) {
    swaps(orderBy: timestamp, orderDirection: desc, where: { pair_in: $pairAddresses }) {
      id
      timestamp
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      sender
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
    }
    mints(orderBy: timestamp, orderDirection: desc, where: { pair_in: $pairAddresses }) {
      id
      timestamp
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
      to
    }
    burns(orderBy: timestamp, orderDirection: desc, where: { pair_in: $pairAddresses }) {
      id
      timestamp
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
      to
    }
  }
`

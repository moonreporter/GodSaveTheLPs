import { classNames, formatNumber, formatNumberScale, formatPercent } from '../../../functions'

import ColoredNumber from '../ColoredNumber'
import CurrencyLogo from '../../../components/CurrencyLogo'
import React from 'react'
import Table from '../../../components/Table'
import _ from 'lodash'
import { useCurrency } from '../../../hooks/Tokens'

interface TokenListProps {
  tokens: {
    token: {
      address: string
      symbol: string
    }
    liquidity: number
    volume24h: number
    price: number
    change1d: number
    change1w: number
  }[]
}

interface TokenListNameProps {
  token: {
    address: string
    symbol: string
  }
}

function TokenListName({ token }: TokenListNameProps): JSX.Element {
  const currency = useCurrency(token.address)

  return (
    <>
      <div className="flex items-center">
        <CurrencyLogo currency={currency} size={28} />
        <div className="ml-3 font-bold text-high-emphesis">{token.symbol}</div>
      </div>
    </>
  )
}

export default function TokenList({ tokens }: TokenListProps): JSX.Element {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'token',
        Cell: (props) => <TokenListName token={props.value} />,
        disableSortBy: true,
        align: 'left',
      },
      {
        Header: 'Liquidity',
        accessor: 'liquidity',
        Cell: (props) => formatNumberScale(props.value, true),
        align: 'right',
      },
      {
        Header: 'Volume (24h)',
        accessor: 'volume24h',
        Cell: (props) => formatNumber(props.value, true),
        align: 'right',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: (props) => formatNumber(props.value, true),
        align: 'right',
      },
      {
        Header: '24h',
        accessor: 'change1d',
        Cell: (props) => <ColoredNumber number={props.value} percent={true} />,
        align: 'right',
      },
      {
        Header: '7d',
        accessor: 'change1w',
        Cell: (props) => <ColoredNumber number={props.value} percent={true} />,
        align: 'right',
      },
    ],
    []
  )

  return <>{tokens && <Table columns={columns} data={tokens} defaultSortBy={{ id: 'liquidity', desc: true }} />}</>
}

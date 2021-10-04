import { AutoColumn, ColumnCenter } from '../Column'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { ArrowUpCircle } from 'react-feather'
import CloseIcon from '../CloseIcon'
import { CustomLightSpinner } from '../Spinner'
import ExternalLink from '../ExternalLink'
import { RowBetween } from '../Row'
import { getExplorerLink } from '../../functions/explorer'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'

const ConfirmOrLoadingWrapper = styled.div`
  width: 100%;
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

export function LoadingView({ children, onDismiss }: { children: any; onDismiss: () => void }) {
  const { i18n } = useLingui()
  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <CustomLightSpinner src="/blue-loader.svg" alt="loader" size={'90px'} />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        {children}
        <div>{i18n._(t`Confirm this transaction in your wallet`)}</div>
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  )
}

export function SubmittedView({
  children,
  onDismiss,
  hash,
}: {
  children: any
  onDismiss: () => void
  hash: string | undefined
}) {
  const theme = useContext(ThemeContext)
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()

  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <ArrowUpCircle strokeWidth={0.5} size={90} color="currentColor" />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        {children}
        {chainId && hash && (
          <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')} style={{ marginLeft: '4px' }}>
            <div>{i18n._(t`View transaction on explorer`)}</div>
          </ExternalLink>
        )}
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  )
}

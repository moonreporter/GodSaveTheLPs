import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useModalOpen, useTokenStatsModalToggle } from '../../state/application/hooks'

import { ApplicationModal } from '../../state/application/actions'
import ExternalLink from '../../components/ExternalLink'
import Image from 'next/image'
import Modal from '../../components/Modal'
import ModalHeader from '../../components/ModalHeader'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Typography from '../../components/Typography'
import { useTokenInfo } from '../../features/farm/hooks'
import { formatNumberScale } from '../../functions'
import { ExternalLink as LinkIcon } from 'react-feather'
import PriceContext from '../../contexts/priceContext'
import { useSolarContract } from '../../hooks'
import QuestionHelper from '../../components/QuestionHelper'

const CloseIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const HeaderRow = styled.div`
  margin-bottom: 1rem;
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function TokenStatsModal({ token }: { token: any }) {
  const { i18n } = useLingui()

  const priceData = useContext(PriceContext)
  let tokenInfo = useTokenInfo(useSolarContract())

  if (token.symbol == 'MOVR') tokenInfo = { circulatingSupply: '1500000', burnt: '0', totalSupply: '0', vaults: '0' }

  const price = formatNumberScale(priceData?.data?.[token.symbol.toLowerCase()], true, 2)

  const modalOpen = useModalOpen(token.symbol == 'SOLAR' ? ApplicationModal.SOLAR_STATS : ApplicationModal.MOVR_STATS)

  const toggleWalletModal = useTokenStatsModalToggle(token)

  function getSummaryLine(title, value) {
    return (
      <div className="flex flex-col gap-2 bg-dark-800 rounded py-1 px-3 w-full">
        <div className="flex items-center justify-between">
          {title}
          <Typography variant="sm" className="flex items-center font-bold py-0.5">
            {value}
          </Typography>
        </div>
      </div>
    )
  }

  function getModalContent() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <ModalHeader title={i18n._(t`${token['name']}`)} onClose={toggleWalletModal} />
          <div className="flex flex-row w-full py-4">
            {token.icon && (
              <Image
                src={token['icon']}
                alt={token['name']}
                width="64px"
                height="64px"
                objectFit="contain"
                className="items-center"
              />
            )}
            <div className="flex flex-1 flex-col">
              <div className="flex flex-row items-center px-3">
                <div className="text-primary text-2xl">{token['symbol']}</div>
              </div>
              <div className="flex items-center justify-between space-x-3 gap-2">
                {token.address && (
                  <ExternalLink
                    href={
                      'https://mumbai.polygonscan.com/token/0x740bBb10512409d52b1e861189AF79236aeC5201'
                    }
                    className="px-3 ring-0 ring-transparent ring-opacity-0"
                    color="light-green"
                    startIcon={<LinkIcon size={16} />}
                  >
                    <Typography variant="xs" className="hover:underline py-0.5 currentColor">
                      {i18n._(t`View Contract`)}
                    </Typography>
                  </ExternalLink>
                )}
              </div>
            </div>
            <div className="flex items-center  text-primary text-bold">
              <div className="ml-2 text-primary text-base text-secondary text-2xl">{`${price}`}</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Typography weight={700}>{i18n._(t`Supply & Market Cap`)}</Typography>
          </div>
          <div className="flex flex-col flex-nowrap gap-1 -m-1">
            {getSummaryLine(
              <div className="flex items-center">
                <Typography variant="sm" className="flex items-center py-0.5">
                  {i18n._(t`Circulating Supply`)}
                </Typography>
                {token.symbol == 'SOLAR' && (
                  <QuestionHelper
                    text={
                      <div className="flex flex-col gap-2 py-1 px-3 w-full">
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Total
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            {formatNumberScale(tokenInfo.totalSupply, false, 2)}
                          </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Burnt
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            - {formatNumberScale(tokenInfo.burnt, false, 2)}
                          </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Locked
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            - {formatNumberScale(tokenInfo.vaults, false, 2)}
                          </Typography>
                        </div>
                        <hr></hr>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Circulating
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            {formatNumberScale(tokenInfo.circulatingSupply, false, 2)}
                          </Typography>
                        </div>
                      </div>
                    }
                  />
                )}
              </div>,
              formatNumberScale(tokenInfo.circulatingSupply, false, 2)
            )}
            {getSummaryLine(
              <Typography variant="sm" className="flex items-center py-0.5">
                {i18n._(t`Market Cap`)}
              </Typography>,
              formatNumberScale(
                Number(tokenInfo.circulatingSupply) * (priceData?.data?.[token.symbol.toLowerCase()] || 0),
                true,
                2
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={modalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      {getModalContent()}
    </Modal>
  )
}

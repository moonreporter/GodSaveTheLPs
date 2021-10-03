import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Loader from '../Loader'
import { NetworkContextName } from '../../constants'
import { network } from '../../connectors'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import useEagerConnect from '../../hooks/useEagerConnect'
import useInactiveListener from '../../hooks/useInactiveListener'
import { useLingui } from '@lingui/react'
import { useWeb3React } from '@web3-react/core'
import { useActiveWeb3React } from '../../hooks'
import { SUPPORTED_NETWORKS } from '../../modals/NetworkModal'
import { ChainId } from '../../sdk'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2``

const GnosisManagerNoSSR = dynamic(() => import('./GnosisManager'), {
  ssr: false,
})

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { i18n } = useLingui()
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)

  const { chainId, library, account } = useActiveWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  useEffect(() => {
    if (window && window.ethereum) {
      const provider: any = window.ethereum

      const params = SUPPORTED_NETWORKS[ChainId.MOONRIVER]

      if (provider) {
        try {
          provider
            .request({
              method: 'wallet_addEthereumChain',
              params: [params],
            })
            .then((r) => {
              console.log(r)
            })
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
        }
      }
    } else {
      console.error("Can't setup the MOVR network on metamask because window.ethereum is undefined")
    }
  }, [])

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <MessageWrapper>
        <div className="text-secondary">
          {i18n._(t`Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device`)}
        </div>
      </MessageWrapper>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? (
      <MessageWrapper>
        <Loader />
      </MessageWrapper>
    ) : null
  }

  return (
    <>
      <GnosisManagerNoSSR />
      {children}
    </>
  )
}

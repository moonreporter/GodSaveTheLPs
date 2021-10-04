import { keccak256, pack } from '@ethersproject/solidity'
import { INIT_CODE_HASH } from '../constants'
import { getCreate2Address } from '@ethersproject/address'
import { Token } from '../sdk'

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(
      ['bytes'],
      [pack(['address', 'address'], [token0.address, token1.address])]
    ),
    INIT_CODE_HASH
  )
}

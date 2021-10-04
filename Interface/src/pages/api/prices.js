const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
const NETWORK_URL = 'https://polygon-mumbai.g.alchemy.com/v2/NR4BiquJS_8Db9qDj8rGXgWEGMTRitXQ'
const web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let movrUSDCContract = new web3.eth.Contract(IUniswapV2PairABI, '0xd4f3a200BBD8D105fAED6E8ED995F8a12ad4e276') // This is like MaticUSDtest pair contract
  const movrUSDCReserves = await movrUSDCContract.methods.getReserves().call()

  const movrUSDCPrice = (Number(movrUSDCReserves.reserve1) / Number(movrUSDCReserves.reserve0) ) // * 1e12 <--TO ONLY INCLUDE IF IT IS REAL USDC with 6 decimals

  let solarMovrContract = new web3.eth.Contract(IUniswapV2PairABI, '0x56935b828d7d3d1d14c87919b860639a61a4dfd0') // This is like MaticSolar pair contract
  const solarMovrReserves = await solarMovrContract.methods.getReserves().call()

  const solarMovrPrice = Number(solarMovrReserves.reserve1) / Number(solarMovrReserves.reserve0)

  //let ribMovrContract = new web3.eth.Contract(IUniswapV2PairABI, '0x0acDB54E610dAbC82b8FA454b21AD425ae460DF9')  // Not yet changed, expect error
  //const ribMovrReserves = await ribMovrContract.methods.getReserves().call()

  //const ribMovrPrice = Number(ribMovrReserves.reserve0) / Number(ribMovrReserves.reserve1)

  let ret = {}
  ret['movr'] = movrUSDCPrice
  ret['solar'] = solarMovrPrice * movrUSDCPrice
  //ret['rib'] = ribMovrPrice * movrUSDCPrice
  ret['usdc'] = 1

  res.status(200).json(ret)
}

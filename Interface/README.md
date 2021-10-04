# Uniswap/SushiSwap Clone Interface
Uniswap/SushiSwap Clone on Polygon (Matic) Mumbai Testnet

## Quickstart
To start developing your application run "yarn dev". This starts the development server on http://localhost:3000.

## Current Configuration
Configured for Polygon (Matic) Mumbai Testnet.

## Deployed contract location
https://mumbai.polygonscan.com/
* "solarForwarder" at 0xC8de2C820818a347a56e0382e02Bc58Ccf296Af8
* "Multicall2" at 0x5625b03De42553340E70CaD2fFED8ef581F449Bc
* "SolarBeamToken" at 0x740bBb10512409d52b1e861189AF79236aeC5201
* "SolarDistributor" at 0x1cB2B70196F107845f479bDB3A8CF0EFe64E6616
* "SolarFactory" at 0x1fA9a2f390C901df7023Ad652C361b6FA5124eA1
* "SolarLocker" at 0xa6998813709A68C9b37BCc9511521a7021cFB896
* "SolarRouter02" at 0x3559162F3A8210A0002a5f377a53De1FF3a2aDA7
* "Timelock" at 0xAADa433A386a5521502ee3A3e064461CD37dbC9F

Test Tokens Created:
* "USDCtest" at 0x0636617c67CB84D49C1417F641629Db7d8c065BA
* "SHIBtest" at 0xD7C5BB823bB5E4D6581605B057c92486D1f5CE6a

Wrapped Matic Contract (ERC20 Version):
* "WMATIC" at 0x9c3c9283d3e44854697cd22d3faa240cfb032889

LP Token created:
* USDCt/WMATIC at 0xd4f3a200bbd8d105faed6e8ed995f8a12ad4e276
* Solar/WMATIC at 0x56935b828d7d3d1d14c87919b860639a61a4dfd0

## Areas to work on to change network & deployed contracts:
* "src/pages/api/farms.js" (specify the correct erc20 tokens - farms.js, prices.js)
* "src/pages/api/prices.js"
* "src/connectors/index.ts" (Change "defaultChainId", "supportedChainIds", rpc for walletconnect) 
* "src/constants/chains.ts" (Change "SupportedChainId")
* "src/constants/token-lists/solarbeam.tokenlist.json" (Change "chainId", token "address")
* "src/pages/locker/create/index.tsx" (Change 1285 of "{LOCKER_ADDRESS[chainId || 1285]}")
* "src/constants/farms.ts" (Change pool addresses)
* "src/pages/api/farms.js" (Change distributorContract to new deployed address)
* "src/pages/api/prices.js" (Change contracts to new deployed addresses)
* "src/constants/multicall/index.ts" (Change multicall address)
* "src/constants/tokens/index.ts" (Add your network's addresses and native token)
* "src/constants/addresses.ts" (Add your network's addresses and native token) (SOLAR_VAULT_ADDRESS did not exist have to recheck)
* "src/constants/farms.ts" (Change the farm pools but I am unsure of the token0, token1 and id what they mean)
* "src/constants/vaults.ts" (Change to new vault contracts)
* "src/constants/routing.ts" (Change FACTORY_ADDRESS, ROUTER_ADDRESS, INIT_CODE_HASH)
* "/src/hooks/useV2Pairs.ts" (Change Chainid from "ChainId.MOONRIVER" to "ChainId.MATIC_TESTNET")
* "/src/sdk/constants/addresses.ts" (Include FACTORY_ADDRESS, and ROUTER_ADDRESS)
* "/src/modals/NetworkModal/index.tsx" (Include Matic Testnet. Important note chainId: '0x13881'//MAKE SURE THIS IS IN HEXADECIMAL SO USE A DECIMAL TO HEXIDECIMAL CONVERTER)
* "/src/components/Web3ReactManager/index.tsx" (Change "ChainId.MOONRIVER" to "ChainId.MATIC_TESTNET". Prevented wrong Network triggering)
* "/src/components/CurrencyLogo/index.tsx" (Include "[ChainId.MATIC_TESTNET]: 'matic testnet',")
* "/src/components/Header/index.tsx" (Change Chainid from "ChainId.MOONRIVER" to "ChainId.MATIC_TESTNET")
* "/src/components/TokenStats/index.tsx" (Change Chainid from "ChainId.MOONRIVER" to "ChainId.MATIC_TESTNET", replace Solar token address)
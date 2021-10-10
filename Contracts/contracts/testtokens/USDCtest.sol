// contracts/ExampleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract USDCtest is ERC20 {
    constructor ()
        ERC20("USDC Test Coin", "USDCt")
    {       
        _mint(msg.sender, 1000000000000 * 10 ** decimals() );
        _mint(0xB69B3a334a7C979a9867d87570649c7ab7239F0c, 1000000 * 10 ** decimals() );
    }
}
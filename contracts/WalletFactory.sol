// SPDX-License-Identifier: MIT

import "./Wallet.sol";

pragma solidity ^0.8.0;

contract WalletFactory {
    
    mapping(address => address) public walletOwnership;

    function createWallet() external {
        require(walletOwnership[msg.sender] == address(0));
        Wallet wallet = new Wallet(msg.sender);
        walletOwnership[msg.sender]=address(wallet);
    }
}
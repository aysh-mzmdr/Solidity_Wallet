// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract wallet{

    uint public balance;
    address public owner;

    constructor(){
        owner=msg.sender;
    }

    modifier onlyOwner(){
        require(owner==msg.sender);
        _;
    }

    function debit(uint _amount,address payable _receiver) public onlyOwner{
        require(_amount<=balance);
        balance-=_amount;
        _receiver.transfer(_amount);
    }

    function credit() public payable onlyOwner{
        balance+=msg.value;
    }

    receive() external payable{
        balance+=msg.value;
    }
}

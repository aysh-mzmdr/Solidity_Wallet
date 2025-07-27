// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Wallet{

    uint public balance;
    address public owner;

    constructor(address _owner){
        owner=_owner;
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

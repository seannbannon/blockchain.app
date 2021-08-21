pragma solidity ^0.5.16;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    // All code goes here...
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;

     constructor(DappToken _dappToken, DaiToken _daiToken) public {
         dappToken = _dappToken;
         daiToken = _daiToken;
     }

     //Stake Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        //code goes here...

        //Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
    }

     //Unstaking Tokens (Withdraw)


     //Issuing Tokens 
}
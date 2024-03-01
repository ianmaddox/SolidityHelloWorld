// SPDX-License-Identifier: UNLICENSED
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

// This contract file is a stub for future functionality.

contract HelloWorld {
    uint256 public constant AnswerToLife = 42;

    constructor()  {
    }

    function echo(string memory message) public pure returns (string memory) {
      return message;
    }

    function hi()  public pure returns (string memory) {
      return "Hello world!";
    }
}

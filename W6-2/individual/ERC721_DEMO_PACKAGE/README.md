<!-- Installation -->

## Installation

```sh

npm install --save-dev erc721a

```

<!-- USAGE EXAMPLES -->

## Usage

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract Azuki is ERC721A {
  constructor() ERC721A("Azuki", "AZUKI") {}

  function mint(uint256 quantity) external payable {
    // _safeMint's second argument now takes in a quantity, not a tokenId.
    _safeMint(msg.sender, quantity);
  }
}

```

pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract Azuki is ERC721A {
  constructor() ERC721A("Test", "TEST") {}

  function mint(uint256 quantity) external payable {
    // _safeMint's second argument now takes in a quantity, not a tokenId.
    _safeMint(msg.sender, quantity);
  }
}

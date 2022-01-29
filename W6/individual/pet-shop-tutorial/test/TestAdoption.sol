pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  // 調用DeployedAddresses智能合約來獲取它的地址
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  // 寵物的id, 將用於測試收養功能
  uint expectedPetId = 8;

  // 獲取當前合約的地址
  address expectedAdopter = address(this);

  function testUserCanAdoptPet() public {
    uint returnedId = adoption.adopt(expectedPetId);

    Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
  }

  function testGetAdopterAddressByPetId() public {
    address adopter = adoption.adopters(expectedPetId);

    Assert.equal(adopter, expectedAdopter, "Owner of the expected pet should be this contract.");
  }

  function testGetAdopterAddressByPetIdInArray() public {
    address[16] memory adopters = adoption.getAdopters();

    // 由於adopters是一個數組，並且我們從第一次採用測試中知道我們採用了 pet expectedPetId，我們將測試合約地址與expectedPetId數組中的位置進行比較。
    Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of the expected pet should be this contract.");
  }
}
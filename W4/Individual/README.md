# ChainShot

![](./ChainShot.PNG)

# CryptoZombies

![](LV1.PNG)
![](LV2.PNG)

- A contract is the fundamental building block of Ethereum applications.
- All solidity source code should start with a "version pragma".
- State variables are permanently stored in contract storage.
- In Solidity, uint is actually an alias for uint256, a 256-bit unsigned integer.
- It's convention (but not required) to start function parameter variable names with an underscore (_) in order to differentiate them from global variables.
- In Solidity, functions are public by default.
- It's good practice to mark your functions as private by default, and then only make public the functions you want to expose to the world.
- It's convention to start private function names with an underscore (_).
- In Solidity, the function declaration contains the type of the return value.
- A view function, meaning it's only viewing the data but not modifying it.
- A pure its return value depends only on its function parameters.
- Ethereum has the hash function keccak256 built in, which is a version of SHA3. A hash function basically maps an input into a random 256-bit hexadecimal number.
- Events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
- A mapping is essentially a key-value store for storing and looking up data.
- In Solidity, there are certain global variables that are available to all functions. One of these is msg.sender, which refers to the address of the person (or smart contract) who called the current function.
- require makes it so that the function will throw an error and stop executing if some condition is not true.
- When you have multiple files and you want to import one file into another, Solidity uses the import keyword.
- Storage refers to variables stored permanently on the blockchain. Memory variables are temporary, and are erased between external function calls to your contract.
- internal is the same as private, except that it's also accessible to contracts that inherit from this contract.
- external is similar to public, except that these functions can ONLY be called outside the contract — they can't be called by other functions inside that contract.

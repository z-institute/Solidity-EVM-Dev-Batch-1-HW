### 2. ChainShot 截圖
   - 截圖 ![](./Self-Paced_Course_Programming.png)

   - 截圖 ![](./Self-Paced_Course_Solidity.png)

   知識點
   1. `pure` function is isolated, does not read from anything outside itself and promises not to modify contract state.
      `view` function can read contract state but promises not to modify contract state.
### 3. Lesson 1 Zombie Factory
   - 截圖 ![](./Lesson_1_CryptoZombie.png)

### Lesson 2 Zombies Attack
   - 截圖 ![](./Lesson_2_CryptoZombie.png)

   知識點
   1. function parameter : reference type and value type
```
value type: Solidity compiler creates a new copy of the value of the parameter and passes it to your function
reference type: If your function changes the value of the variable it receives, the value of the original variable gets changed

string 要加 memory
```
   2. Ethereum has the hash function keccak256 built in, which is a version of SHA3. A hash function basically maps an input into a random 256-bit hexadecimal number.

   3. Events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen. Your app front-end could then listen for the event.
```js
var event = ZombieFactory.NewZombie(function(error, result) {
  if (error) return
  generateZombie(result.zombieId, result.name, result.dna)
})
```
   4. `Storage` refers to variables stored permanently on the blockchain, just like HDD.
      `Memory` variables are temporary, and are erased between external function calls to your contract, just like RAM.
      If you just want a copy, you can use `memory`.
   5. Function Visibility:
      `internal` is the same as `private`, except that it's also accessible to contracts that inherit from this contract. (Hey, that sounds like what we want here!).
      `external` is similar to `public`, except that these functions can ONLY be called outside the contract — they can't be called by other functions inside that contract. We'll talk about why you might want to use external vs public later.

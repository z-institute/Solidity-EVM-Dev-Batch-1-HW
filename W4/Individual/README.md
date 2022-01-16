![](./0116_1.png)
![](./0116_3.png)
![](./0116_4.png)
![](./0116_2.png)

## personal note
##### 1. external比public省，如果要EOA或other contract呼叫用public=internal+external
##### 2. library usually use pure，不能收ether，不能繼承，不能被破壞，沒有state
##### 3. msg.sender預設是address 要轉ether要轉型成payable
##### 4. contract default cannot receive ether，要用payable function
##### 5. stateMutability {view,pure,payable,nonpayable(default)}
##### 6. receive() external payable 不能接受參數、return 接收用
         fallback() 錯誤處理用
##### 7.revert()回復合約狀態
##### 8.TypeError Operator - not compatible with types function 如果要取用別的合約的public變數 需要用getter() 因此要加()
##### 9.string memory
##### 10.event Deployed(variable declaration) => emit Deployed(variable)

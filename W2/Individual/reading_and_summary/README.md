1. Ethereum Hard Fork Bug that split Ethereum’s chain in two

Summary: Geth在某個版本更新中加了對分裂（分叉）避免的code，因為Geth並沒有告知大家這部分的更新，所以有些服務並沒有及時更新，導致分叉產生，進而導致以Geth為底層的Dapp連帶地受到影響。

解決方法: 身為底層，又被多數Dapp應用，應該要在每次更新都在社群主動發布類似readme的檔案，或是提供訂閱服務，讓訂閱者收到消息。

2. How to retrieve tokens stuck in a crowdsale?
讓智能合約都implente 一個interface，而這個interface中的transfer method 必須有回傳值，如果method執行後成功會回傳一個值ex: true, 而失敗應該會是ex: false。因為交易是atomic，如果失敗可以回滾。


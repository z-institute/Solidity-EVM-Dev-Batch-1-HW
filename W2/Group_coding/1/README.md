# 客製化參數設計想法
  - Genesis Block 的參數設計影響到整個區塊鏈的設計
```
GENESIS_PARAMS = {
  'difficulty': 0x02,     // POW 難度參數不要設定太高，出塊速度能快些，也減少資源浪費
  'gas_limit' : 0xffff,   // Gas 上限為65535 Gwei，挖礦難度降低，出塊速度快，挖礦機率增加，Gas下降，讓鏈上交易量更大，更健康
  'nonce' : bytes(0),
  'timestamp' : 0x00,     // 初始區塊出塊時間
  'extra_data': bytes('This blockchain is created on 2021/12/25 00:00 by Ethan, Walter, Lemonde.', 'utf-8'),
}
```

# 客製化參數設計想法
  - 是不是要客制 BlockHeader (以下未定)
```
  difficulty=eth_constants.GENESIS_DIFFICULTY,
  extra_data=decode_hex("0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa"),
  gas_limit=eth_constants.GENESIS_GAS_LIMIT,
  gas_used=0,
  bloom=0,
  mix_hash=eth_constants.ZERO_HASH32,
  nonce=eth_constants.GENESIS_NONCE,
  block_number=0,
  parent_hash=eth_constants.ZERO_HASH32,
  receipt_root=eth_constants.BLANK_ROOT_HASH,
  uncles_hash=eth_constants.EMPTY_UNCLE_HASH,
  state_root=decode_hex("0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544"),
  timestamp=0,
  transaction_root=eth_constants.BLANK_ROOT_HASH,
```

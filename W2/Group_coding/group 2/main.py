def main(request):
  try:
    from eth import constants
    from eth.consensus.pow import mine_pow_nonce
    from eth.chains.base import MiningChain
    from eth.vm.forks.byzantium import ByzantiumVM
    from eth.db.atomic import AtomicDB

    GENESIS_PARAMS = {
          'difficulty': 1,
          'gas_limit': 3141592,
          'timestamp': 1638366284,
      }

    klass = MiningChain.configure(
        __name__='TestChain',
        vm_configuration=(
            (constants.GENESIS_BLOCK_NUMBER, ByzantiumVM),
        ))
    chain = klass.from_genesis(AtomicDB(), GENESIS_PARAMS)

    block_result = chain.get_vm().finalize_block(chain.get_block())
    block = block_result.block

    # nonce and mix_hash for this block
    nonce, mix_hash = mine_pow_nonce(
        block.number,
        block.header.mining_hash,
        block.header.difficulty)

    block = chain.mine_block(mix_hash=mix_hash, nonce=nonce)

    return str(block)

    print(block)
      
  except Exception as e:
    return str(e)
    print(e)

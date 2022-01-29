import { useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Ifo, PoolIds } from 'config/constants/types'
import { useERC20, useIfoV1Contract } from 'hooks/useContract'
import { multicallv2 } from 'utils/multicall'
import ifoV1Abi from 'config/abi/ifoV1.json'
import { BIG_ZERO } from 'utils/bigNumber'
import useIfoAllowance from '../useIfoAllowance'
import { WalletIfoState, WalletIfoData } from '../../types'

interface UserInfo {
  amount: BigNumber
  claimed: boolean
}

const initialState = {
  isInitialized: false,
  [PoolIds.poolUnlimited]: {
    amountTokenCommittedInLP: BIG_ZERO,
    hasClaimed: false,
    isPendingTx: false,
    offeringAmountInToken: BIG_ZERO,
    refundingAmountInLP: BIG_ZERO,
    taxAmountInLP: BIG_ZERO, // Not used
  },
}

/**
 * Gets all data from an IFO related to a wallet
 */
const useGetWalletIfoData = (ifo: Ifo): WalletIfoData => {
  const [state, setState] = useState<WalletIfoState>(initialState)

  const { address, currency } = ifo
  const { poolUnlimited } = state

  const { account } = useWeb3React()
  const contract = useIfoV1Contract(address)
  const currencyContract = useERC20(currency.address)
  const allowance = useIfoAllowance(currencyContract, address, poolUnlimited.isPendingTx)

  const setPendingTx = (status: boolean) =>
    setState((prevState) => ({
      ...prevState,
      [PoolIds.poolUnlimited]: {
        ...prevState.poolUnlimited,
        isPendingTx: status,
      },
    }))

  const setIsClaimed = () => {
    setState((prevState) => ({
      ...prevState,
      [PoolIds.poolUnlimited]: {
        ...prevState.poolUnlimited,
        hasClaimed: true,
      },
    }))
  }

  const fetchIfoData = useCallback(async () => {
    const ifoCalls = ['getOfferingAmount', 'userInfo', 'getRefundingAmount'].map((method) => ({
      address,
      name: method,
      params: [account],
    }))

    const [offeringAmount, userInfoResponse, refundingAmount] = await multicallv2(ifoV1Abi, ifoCalls)
    const parsedUserInfo: UserInfo = userInfoResponse
      ? {
          amount: new BigNumber(userInfoResponse.amount.toString()),
          claimed: userInfoResponse.claimed,
        }
      : { amount: BIG_ZERO, claimed: false }

    setState((prevState) => ({
      isInitialized: true,
      [PoolIds.poolUnlimited]: {
        ...prevState.poolUnlimited,
        amountTokenCommittedInLP: parsedUserInfo.amount,
        hasClaimed: parsedUserInfo.claimed,
        offeringAmountInToken: offeringAmount ? new BigNumber(offeringAmount[0].toString()) : BIG_ZERO,
        refundingAmountInLP: refundingAmount ? new BigNumber(refundingAmount[0].toString()) : BIG_ZERO,
      },
    }))
  }, [account, address])

  const resetIfoData = useCallback(() => {
    setState(initialState)
  }, [])

  return { ...state, allowance, contract, setPendingTx, setIsClaimed, fetchIfoData, resetIfoData }
}

export default useGetWalletIfoData

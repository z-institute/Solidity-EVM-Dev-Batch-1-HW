import React, { useState, useEffect } from 'react'
import { Text, Flex, Skeleton, Image } from '@pancakeswap/uikit'
import { useFarmAuctionContract } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import Balance from 'components/Balance'
import styled from 'styled-components'

const BurnedText = styled(Text)`
  font-size: 52px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const AuctionCakeBurn: React.FC = () => {
  const [burnedCakeAmount, setBurnedCakeAmount] = useState(0)
  const { t } = useTranslation()
  const farmAuctionContract = useFarmAuctionContract(false)
  const cakePriceBusd = usePriceCakeBusd()

  const burnedAmountAsUSD = cakePriceBusd.times(burnedCakeAmount)

  useEffect(() => {
    const fetchBurnedCakeAmount = async () => {
      try {
        const amount = await farmAuctionContract.totalCollected()
        const amountAsBN = ethersToBigNumber(amount)
        setBurnedCakeAmount(getBalanceNumber(amountAsBN))
      } catch (error) {
        console.error('Failed to fetch burned auction cake', error)
      }
    }
    if (burnedCakeAmount === 0) {
      fetchBurnedCakeAmount()
    }
  }, [burnedCakeAmount, farmAuctionContract])
  return (
    <Flex flexDirection={['column-reverse', null, 'row']}>
      <Flex flexDirection="column" flex="2">
        {burnedCakeAmount !== 0 ? (
          <Balance fontSize="64px" bold value={burnedCakeAmount} decimals={0} unit=" CAKE" />
        ) : (
          <Skeleton width="256px" height="64px" />
        )}
        <BurnedText textTransform="uppercase" bold color="secondary">
          {t('Burned')}
        </BurnedText>
        <Text fontSize="24px" bold>
          {t('through community auctions so far!')}
        </Text>
        {!burnedAmountAsUSD.isNaN() && !burnedAmountAsUSD.isZero() ? (
          <Text color="textSubtle">
            ~${burnedAmountAsUSD.toNumber().toLocaleString('en', { maximumFractionDigits: 0 })}
          </Text>
        ) : (
          <Skeleton width="128px" />
        )}
      </Flex>
      <Image width={350} height={320} src="/images/burnt-cake.png" alt={t('Burnt CAKE')} />
    </Flex>
  )
}

export default AuctionCakeBurn

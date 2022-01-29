import { FACTORY_ADDRESS } from '@pancakeswap/sdk'
import { getUnixTime, sub } from 'date-fns'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from 'react'
import { SWRConfig } from 'swr'
import { bitQueryServerClient, infoServerClient } from 'utils/graphql'
import { getBlocksFromTimestamps } from 'views/Info/hooks/useBlocksFromTimestamps'
import Home from '../views/Home'

const IndexPage = ({ totalTx30Days, addressCount30Days }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          totalTx30Days,
          addressCount30Days,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

// Values fetched from TheGraph and BitQuery jan 24, 2022
const txCount = 54780336
const addressCount = 4425459

export const getStaticProps: GetStaticProps = async () => {
  const totalTxQuery = gql`
    query TotalTransactions($id: ID!, $block: Block_height) {
      pancakeFactory(id: $id, block: $block) {
        totalTransactions
      }
    }
  `

  const days30Ago = sub(new Date(), { days: 30 })

  const results = {
    totalTx30Days: txCount,
    addressCount30Days: addressCount,
  }

  try {
    const [days30AgoBlock] = await getBlocksFromTimestamps([getUnixTime(days30Ago)])

    if (!days30AgoBlock) {
      throw new Error('No block found for 30 days ago')
    }

    const totalTx = await infoServerClient.request(totalTxQuery, {
      id: FACTORY_ADDRESS,
    })
    const totalTx30DaysAgo = await infoServerClient.request(totalTxQuery, {
      block: {
        number: days30AgoBlock.number,
      },
      id: FACTORY_ADDRESS,
    })

    if (
      totalTx?.pancakeFactory?.totalTransactions &&
      totalTx30DaysAgo?.pancakeFactory?.totalTransactions &&
      parseInt(totalTx.pancakeFactory.totalTransactions) > parseInt(totalTx30DaysAgo.pancakeFactory.totalTransactions)
    ) {
      results.totalTx30Days =
        parseInt(totalTx.pancakeFactory.totalTransactions) - parseInt(totalTx30DaysAgo.pancakeFactory.totalTransactions)
    }
  } catch (error) {
    console.error('Error when fetching total tx count', error)
  }

  const usersQuery = gql`
    query userCount($since: ISO8601DateTime, $till: ISO8601DateTime) {
      ethereum(network: bsc) {
        dexTrades(exchangeName: { in: ["Pancake", "Pancake v2"] }, date: { since: $since, till: $till }) {
          count(uniq: senders)
        }
      }
    }
  `

  try {
    const result = await bitQueryServerClient.request(usersQuery, {
      since: days30Ago.toISOString(),
      till: new Date().toISOString(),
    })
    if (result?.ethereum?.dexTrades?.[0]?.count) {
      results.addressCount30Days = result.ethereum.dexTrades[0].count
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Error when fetching address count', error)
    }
  }

  return {
    props: results,
    revalidate: 60 * 60 * 24 * 30, // 30 days
  }
}

export default IndexPage

import React from 'react'
import { Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import Crumbs from './Crumbs'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <PageHeader>
      <Crumbs />
      <Heading as="h1" scale="xxl" color="secondary">
        {t('Leaderboard')}
      </Heading>
    </PageHeader>
  )
}

export default Hero

import React from 'react'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { StyledCollectibleCard } from './styles'
import CardBody from './CardBody'
import { CollectibleCardProps } from './types'
import { nftsBaseUrl, pancakeBunniesAddress } from '../../constants'

const CollectibleLinkCard: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, ...props }) => {
  const urlId =
    nft.collectionAddress.toLowerCase() === pancakeBunniesAddress.toLowerCase() ? nft.attributes[0].value : nft.tokenId
  return (
    <StyledCollectibleCard {...props}>
      <NextLinkFromReactRouter to={`${nftsBaseUrl}/collections/${nft.collectionAddress}/${urlId}`}>
        <CardBody nft={nft} nftLocation={nftLocation} currentAskPrice={currentAskPrice} />
      </NextLinkFromReactRouter>
    </StyledCollectibleCard>
  )
}

export default CollectibleLinkCard

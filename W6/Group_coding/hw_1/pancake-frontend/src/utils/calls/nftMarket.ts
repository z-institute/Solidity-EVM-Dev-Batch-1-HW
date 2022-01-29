import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'

/**
 * Buy a NFT with BNB
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @returns transaction hash, or null
 */
export const buyTokenUsingBNB = async (
  contract: Contract,
  collectionAddress: string,
  tokenId: number,
): Promise<string> => {
  try {
    const tx = await contract.buyTokenUsingBNB(collectionAddress, tokenId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Buy a NFT with WBNB
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param price
 * @returns transaction hash, or null
 */
export const buyTokenUsingWBNB = async (
  contract: Contract,
  collectionAddress: string,
  tokenId: number,
  price: BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.buyTokenUsingWBNB(collectionAddress, tokenId, price)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * List a NFT for sale
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param askPrice
 * @returns transaction hash, or null
 */
export const createAskOrder = async (
  contract: Contract,
  collectionAddress: string,
  tokenId: number,
  askPrice: BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.createAskOrder(collectionAddress, tokenId, askPrice)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Update the price of a listed NFT
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param newPrice
 * @returns transaction hash, or null
 */
export const modifyAskOrder = async (
  contract: Contract,
  collectionAddress: string,
  tokenId: number,
  newPrice: BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.modifyAskOrder(collectionAddress, tokenId, newPrice)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Cancel a NFT sale listing. The caller needs to be the NFT owner.
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @returns transaction hash, or null
 */
export const cancelAskOrder = async (
  contract: Contract,
  collectionAddress: string,
  tokenId: number,
): Promise<string> => {
  try {
    const tx = await contract.cancelAskOrder(collectionAddress, tokenId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Get pending WBNB revenues for a user
 * @param contract
 * @param userAddress
 * @returns pending revenues, or null if failed
 */
export const getPendingRevenue = async (contract: Contract, userAddress: string): Promise<BigNumber> => {
  try {
    const res = await contract.pendingRevenue(userAddress)
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Claim WBNB pending revenues for a connected users
 * @param contract
 * @returns transaction hash, or null
 */
export const claimPendingRevenue = async (contract: Contract): Promise<string> => {
  try {
    const tx = await contract.claimPendingRevenue()
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

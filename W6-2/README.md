# Difference between ERC721 and ERC721A

## CONTEXT

Gas prices on Ethereum have been consistently high for months, and the dev community needs to adapt. When popular NFT projects begin to mint, gas prices spike up, resulting in the entire ecosystem paying millions in gas fees to transact. At Azuki, we are building a brand for the metaverse together with our community. The focus for the dev team has been to optimize our contract and enable our community to spend as little as possible in gas fees when minting.

Instead of using OpenZeppelin’s popular default implementations of IERC721 and IERC721Enumerable, we’ve written our version (which we’ll refer to as ERC721A for the rest of this post) and are excited to announce that the Azuki contract will enable minting multiple NFTs for essentially the same gas cost of minting a single NFT.

### Optimization 1 - Removing duplicate storage from OpenZeppelin’s (OZ) ERC721Enumerable

The widely-used OZ implementation of IERC721Enumerable includes redundant storage of each token’s metadata. This denormalized approach optimizes for read functions at a significant cost to write functions, which isn’t ideal given that users are much less likely to pay for read functions. Additionally, the fact that our tokens are serially numbered starting from 0 lets us remove some redundant storage from the base implementation. We strongly suggest all new launches examine this file closely if they are looking for a large win.

### Optimization 2 - updating the owner’s balance once per batch mint request, instead of per minted NFT

Suppose Alice has 2 tokens and wants to buy 5 more. In Solidity, it costs gas to update a stored value. Therefore, if we are tracking in storage how many tokens Alice owns, it would be cheaper to update Alice’s holdings from 2 directly to 7 with one update, instead of updating that value 5 times (once per additional token, from 2 to 3, 3 to 4, etc).

While this is a relatively simple concept, the vast majority of bulk mints in the NFT space have not adopted this yet because the OZ default implementation does not include a batch mint API, and it’s tempting to grab an existing solution off the shelf without tweaking it. We highly recommend all projects consider this trick if they support batch mints.

### Optimization 3 - updating the owner data once per batch mint request, instead of per minted NFT

This is similar in spirit to optimization 2. Suppose Alice wanted to buy 3 tokens - token #100, #101, and #102. Instead of saving Alice as the owner 3 times (each time costing us gas), we can instead save the owner value just once in a way that semantically implies that Alice owns all 3 of those tokens.

How? Suppose Alice mints tokens #100, #101, and #102, and Bob mints tokens #103 and #104. The internal owner tracker would look like this:

The key here is that if we wanted to see who owned #102, we don’t need to actually have Alice set explicitly as the explicit owner of #102 to do so. We could just change the ownerOf function to do the following:

Key insight: ownerOf still works as expected if we change its implementation to decrement until it finds an explicit owner set.

While these deferred owner writes may still take place later in the token's lifecycle if the tokens aren't HODL-ed, we still expect heavy net savings from this overall due to how this reduces gas spent at mint, thus decreasing the severity of concentrated gas spikes for the entire ecosystem at mint time. This optimization involves some additional logic, especially when it comes to transfers, but is beyond the scope of this blog. The contract will be public before mint time and devs will be happy to answer any questions and discuss!

CLOSING

# Reference

- [ERC721A Article](https://www.azuki.com/erc721a)
- [ERC721A Repository](https://github.com/chiru-labs/ERC721A)

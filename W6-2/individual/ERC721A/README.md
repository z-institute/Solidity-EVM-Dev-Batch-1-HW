# ERC721A
ERC721A 是 Azuki 團隊推出的 ERC721 合約改良版，透過從 OpenZeppelin (OZ) ERC721Enumerable 中刪除重複存儲，並在每次 mint 請求才更新一次存儲數據而不是每 mint 一個 NFT 就更新一次可以大幅降低一次 mint 多個 NFT 的成本


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // 事件：NFT 铸造
    event NFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    // 铸造 NFT
    function mint(string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(msg.sender, tokenId, tokenURI);

        return tokenId;
    }

    // 获取下一个 Token ID
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // 批量铸造（可选）
    function batchMint(
        string[] memory tokenURIs
    ) public returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);

        for (uint256 i = 0; i < tokenURIs.length; i++) {
            tokenIds[i] = mint(tokenURIs[i]);
        }

        return tokenIds;
    }
}

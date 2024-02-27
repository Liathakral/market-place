 // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTmarketPlace is  ERC721URIStorage {
    address payable owner;
    uint256 private tokenids;
    uint256 private itemsSold;
    

    constructor()ERC721("JUJUTSU","JJK") {
         owner = payable(msg.sender);
    }

    mapping(address => string[]) private TokenOwner;

    uint256 listingPrice=0.0001 ether ;

    struct MarketItem{
        uint256 tokenid;
        address  owner;
        address  seller;
        uint256 Price;
        bool sold;
        
    }

    event MarketItemCreated(
        uint256 indexed tokenid,
        address  owner,
        address  seller,
        uint256 Price,
        bool sold
        );
        

    mapping (uint256 => MarketItem) private idToMarketItem;
    
    function getListingprice() public view returns(uint256){
        return listingPrice;
    }


    function createToken(string memory tokenURI, uint256 price ) public payable returns(uint){
        tokenids++;
        uint256 newtokenid = tokenids;
        _mint(msg.sender, newtokenid);
        _setTokenURI(newtokenid, tokenURI);
        createMarketItem(newtokenid , price);
        return newtokenid;
    }
    function createMarketItem(uint256 tokenid, uint256 price) private  {
    require(price>0,"price must be atleast 1 wei");
    require(msg.value == listingPrice, "amount should be equal to listing price!");
    
    idToMarketItem[tokenid] = MarketItem(
        tokenid,
        payable(address(this)),
        payable(msg.sender),
        price,
        false
        
    );
      _transfer(msg.sender, address(this), tokenid);
      emit MarketItemCreated(
        tokenid,
        msg.sender,
        address(this),
        price,
        false
      );
 

    }

    event ItemSold(uint256 tokenid,address _owner);
   /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }
   
   
    // Function to transfer token ownership
    
    function CreateMarketSale(uint256 tokenid) public  payable {
      uint price = idToMarketItem[tokenid].Price;
      address seller = idToMarketItem[tokenid].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
    
      itemsSold++;
      idToMarketItem[tokenid] =  MarketItem(
        tokenid,
        payable(msg.sender),
        payable(address(0)),
       idToMarketItem[tokenid].Price,
        true
      );
      _transfer(address(this), msg.sender,tokenid);
      payable(owner).transfer(listingPrice);
      payable(seller).transfer(price);
      
    }

    function FetchMarketItems()public view returns(MarketItem[] memory){
        uint256 currentItems = tokenids - itemsSold;
        uint currentindex = 0;
        MarketItem[] memory items = new MarketItem[](currentItems);
        for(uint256 i = 0 ; i <= currentItems ;i++){
            if(idToMarketItem[i+1].owner == address(this)){
                uint currentid = i+1;
                MarketItem storage current= idToMarketItem[currentid];
                items[currentindex] = current;
                currentindex++;
            }
        }
        return items;
    } 

   function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = tokenids;
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].Price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      itemsSold--;

      _transfer(msg.sender, address(this), tokenId);
    }

}

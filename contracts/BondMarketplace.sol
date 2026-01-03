// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GovernmentBondToken.sol";

/**
 * @title BondMarketplace
 * @dev Secondary market for trading government bond tokens
 */
contract BondMarketplace {
    
    struct Listing {
        address seller;
        address bondToken;
        uint256 amount;
        uint256 pricePerToken;
        bool isActive;
    }
    
    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;
    mapping(address => uint256[]) public userListings;
    
    uint256 public platformFee = 50; // 0.5% in basis points
    address public feeRecipient;
    
    event ListingCreated(uint256 indexed listingId, address indexed seller, address bondToken, uint256 amount, uint256 pricePerToken);
    event ListingCancelled(uint256 indexed listingId);
    event BondPurchased(uint256 indexed listingId, address indexed buyer, uint256 amount, uint256 totalPrice);
    
    constructor(address _feeRecipient) {
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @dev Create a new bond listing
     */
    function createListing(address bondToken, uint256 amount, uint256 pricePerToken) external returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(pricePerToken > 0, "Price must be greater than 0");
        
        GovernmentBondToken bond = GovernmentBondToken(bondToken);
        require(bond.balanceOf(msg.sender) >= amount, "Insufficient bond balance");
        
        uint256 listingId = nextListingId++;
        
        listings[listingId] = Listing({
            seller: msg.sender,
            bondToken: bondToken,
            amount: amount,
            pricePerToken: pricePerToken,
            isActive: true
        });
        
        userListings[msg.sender].push(listingId);
        
        emit ListingCreated(listingId, msg.sender, bondToken, amount, pricePerToken);
        
        return listingId;
    }
    
    /**
     * @dev Purchase bonds from a listing
     */
    function purchaseBonds(uint256 listingId, uint256 amount) external payable {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(amount > 0 && amount <= listing.amount, "Invalid amount");
        
        uint256 totalPrice = amount * listing.pricePerToken;
        require(msg.value >= totalPrice, "Insufficient payment");
        
        uint256 fee = (totalPrice * platformFee) / 10000;
        uint256 sellerPayment = totalPrice - fee;
        
        // Transfer bond tokens
        GovernmentBondToken bond = GovernmentBondToken(listing.bondToken);
        require(bond.transferFrom(listing.seller, msg.sender, amount), "Token transfer failed");
        
        // Update listing
        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.isActive = false;
        }
        
        // Transfer payments
        payable(listing.seller).transfer(sellerPayment);
        payable(feeRecipient).transfer(fee);
        
        // Refund excess
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
        
        emit BondPurchased(listingId, msg.sender, amount, totalPrice);
    }
    
    /**
     * @dev Cancel a listing
     */
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not listing owner");
        require(listing.isActive, "Listing not active");
        
        listing.isActive = false;
        
        emit ListingCancelled(listingId);
    }
    
    /**
     * @dev Get active listings
     */
    function getActiveListing(uint256 listingId) external view returns (
        address seller,
        address bondToken,
        uint256 amount,
        uint256 pricePerToken,
        bool isActive
    ) {
        Listing memory listing = listings[listingId];
        return (
            listing.seller,
            listing.bondToken,
            listing.amount,
            listing.pricePerToken,
            listing.isActive
        );
    }
}

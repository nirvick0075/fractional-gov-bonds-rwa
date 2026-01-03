// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title GovernmentBondToken
 * @dev Tokenized Government Bond with fractional ownership and automated coupon payments
 */
contract GovernmentBondToken is ERC20, Ownable, ReentrancyGuard, Pausable {
    
    struct BondMetadata {
        string issuer;              // Government issuer name
        uint256 maturityDate;       // Unix timestamp
        uint256 couponRate;         // Basis points (e.g., 500 = 5%)
        uint256 faceValue;          // Total face value in USD (18 decimals)
        uint256 lastCouponPayment;  // Last coupon payment timestamp
        uint256 couponFrequency;    // Payment frequency in seconds (e.g., 180 days)
        string riskLevel;           // AAA, AA, A, BBB, etc.
        bool isActive;
    }
    
    BondMetadata public bondMetadata;
    
    mapping(address => uint256) public lastClaimedCoupon;
    mapping(address => uint256) public totalCouponsEarned;
    
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public totalCouponsPaid;
    
    event CouponPaid(address indexed holder, uint256 amount);
    event BondLiquidated(address indexed seller, address indexed buyer, uint256 amount, uint256 price);
    event BondMatured(uint256 totalPayout);
    
    constructor(
        string memory name,
        string memory symbol,
        string memory issuer,
        uint256 maturityDate,
        uint256 couponRate,
        uint256 faceValue,
        uint256 couponFrequency,
        string memory riskLevel,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(maturityDate > block.timestamp, "Maturity date must be in future");
        require(couponRate > 0 && couponRate <= BASIS_POINTS, "Invalid coupon rate");
        
        bondMetadata = BondMetadata({
            issuer: issuer,
            maturityDate: maturityDate,
            couponRate: couponRate,
            faceValue: faceValue,
            lastCouponPayment: block.timestamp,
            couponFrequency: couponFrequency,
            riskLevel: riskLevel,
            isActive: true
        });
        
        _mint(owner(), initialSupply * 10 ** decimals());
    }
    
    /**
     * @dev Calculate pending coupon payment for a holder
     */
    function calculatePendingCoupon(address holder) public view returns (uint256) {
        if (!bondMetadata.isActive || block.timestamp >= bondMetadata.maturityDate) {
            return 0;
        }
        
        uint256 holderBalance = balanceOf(holder);
        if (holderBalance == 0) return 0;
        
        uint256 lastClaimed = lastClaimedCoupon[holder];
        if (lastClaimed == 0) lastClaimed = bondMetadata.lastCouponPayment;
        
        uint256 timeElapsed = block.timestamp - lastClaimed;
        if (timeElapsed < bondMetadata.couponFrequency) return 0;
        
        // Calculate proportional coupon based on holder's share
        uint256 holderShare = (holderBalance * BASIS_POINTS) / totalSupply();
        uint256 periodCoupon = (bondMetadata.faceValue * bondMetadata.couponRate) / BASIS_POINTS;
        
        return (periodCoupon * holderShare) / BASIS_POINTS;
    }
    
    /**
     * @dev Claim coupon payment
     */
    function claimCoupon() external nonReentrant whenNotPaused {
        uint256 couponAmount = calculatePendingCoupon(msg.sender);
        require(couponAmount > 0, "No coupon available to claim");
        
        lastClaimedCoupon[msg.sender] = block.timestamp;
        totalCouponsEarned[msg.sender] += couponAmount;
        totalCouponsPaid += couponAmount;
        
        // Transfer coupon payment (assumes contract has sufficient balance)
        payable(msg.sender).transfer(couponAmount);
        
        emit CouponPaid(msg.sender, couponAmount);
    }
    
    /**
     * @dev Liquidate bond tokens (sell on secondary market)
     */
    function liquidateBond(address buyer, uint256 amount, uint256 price) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        require(amount > 0, "Amount must be greater than 0");
        require(buyer != address(0), "Invalid buyer address");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Transfer tokens from seller to buyer
        _transfer(msg.sender, buyer, amount);
        
        emit BondLiquidated(msg.sender, buyer, amount, price);
    }
    
    /**
     * @dev Mature bond and distribute final payment
     */
    function matureBond() external onlyOwner {
        require(block.timestamp >= bondMetadata.maturityDate, "Bond not yet matured");
        require(bondMetadata.isActive, "Bond already matured");
        
        bondMetadata.isActive = false;
        
        emit BondMatured(bondMetadata.faceValue);
    }
    
    /**
     * @dev Get bond information
     */
    function getBondInfo() external view returns (
        string memory issuer,
        uint256 maturityDate,
        uint256 couponRate,
        uint256 faceValue,
        string memory riskLevel,
        bool isActive
    ) {
        return (
            bondMetadata.issuer,
            bondMetadata.maturityDate,
            bondMetadata.couponRate,
            bondMetadata.faceValue,
            bondMetadata.riskLevel,
            bondMetadata.isActive
        );
    }
    
    /**
     * @dev Calculate days until maturity
     */
    function daysUntilMaturity() external view returns (uint256) {
        if (block.timestamp >= bondMetadata.maturityDate) return 0;
        return (bondMetadata.maturityDate - block.timestamp) / 1 days;
    }
    
    /**
     * @dev Deposit funds for coupon payments
     */
    function depositCouponFunds() external payable onlyOwner {
        require(msg.value > 0, "Must deposit funds");
    }
    
    /**
     * @dev Emergency pause
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    receive() external payable {}
}

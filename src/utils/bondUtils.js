import { ethers } from 'ethers';
import { BOND_TOKEN_ABI, MARKETPLACE_ABI, CONTRACT_ADDRESSES } from '../config/contracts';

/**
 * Get Bond Token Contract Instance
 */
export const getBondTokenContract = (bondAddress, signerOrProvider) => {
  return new ethers.Contract(bondAddress, BOND_TOKEN_ABI, signerOrProvider);
};

/**
 * Get Marketplace Contract Instance
 */
export const getMarketplaceContract = (signerOrProvider) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.marketplace,
    MARKETPLACE_ABI,
    signerOrProvider
  );
};

/**
 * Get Bond Metadata
 */
export const getBondMetadata = async (bondAddress, provider) => {
  try {
    const contract = getBondTokenContract(bondAddress, provider);
    const [issuer, maturityDate, couponRate, faceValue, riskLevel, isActive] =
      await contract.getBondInfo();

    return {
      issuer,
      maturityDate: Number(maturityDate),
      couponRate: Number(couponRate),
      faceValue: ethers.formatEther(faceValue),
      riskLevel,
      isActive,
    };
  } catch (error) {
    console.error('Error fetching bond metadata:', error);
    throw error;
  }
};

/**
 * Get User Bond Balance
 */
export const getUserBondBalance = async (bondAddress, userAddress, provider) => {
  try {
    const contract = getBondTokenContract(bondAddress, provider);
    const balance = await contract.balanceOf(userAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching bond balance:', error);
    throw error;
  }
};

/**
 * Get Pending Coupon Payment
 */
export const getPendingCoupon = async (bondAddress, userAddress, provider) => {
  try {
    const contract = getBondTokenContract(bondAddress, provider);
    const pending = await contract.calculatePendingCoupon(userAddress);
    return ethers.formatEther(pending);
  } catch (error) {
    console.error('Error fetching pending coupon:', error);
    throw error;
  }
};

/**
 * Claim Coupon Payment
 */
export const claimCoupon = async (bondAddress, signer) => {
  try {
    const contract = getBondTokenContract(bondAddress, signer);
    const tx = await contract.claimCoupon();
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error claiming coupon:', error);
    throw error;
  }
};

/**
 * Approve Bond Token Spending
 */
export const approveBondToken = async (bondAddress, spenderAddress, amount, signer) => {
  try {
    const contract = getBondTokenContract(bondAddress, signer);
    const tx = await contract.approve(spenderAddress, ethers.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error approving bond token:', error);
    throw error;
  }
};

/**
 * Create Marketplace Listing
 */
export const createListing = async (bondAddress, amount, pricePerToken, signer) => {
  try {
    const marketplace = getMarketplaceContract(signer);
    
    // First approve marketplace to spend tokens
    await approveBondToken(bondAddress, CONTRACT_ADDRESSES.marketplace, amount, signer);
    
    // Create listing
    const tx = await marketplace.createListing(
      bondAddress,
      ethers.parseEther(amount),
      ethers.parseEther(pricePerToken)
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

/**
 * Purchase Bonds from Listing
 */
export const purchaseBonds = async (listingId, amount, pricePerToken, signer) => {
  try {
    const marketplace = getMarketplaceContract(signer);
    const totalPrice = ethers.parseEther((Number(amount) * Number(pricePerToken)).toString());
    
    const tx = await marketplace.purchaseBonds(listingId, ethers.parseEther(amount), {
      value: totalPrice,
    });
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error purchasing bonds:', error);
    throw error;
  }
};

/**
 * Cancel Listing
 */
export const cancelListing = async (listingId, signer) => {
  try {
    const marketplace = getMarketplaceContract(signer);
    const tx = await marketplace.cancelListing(listingId);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error canceling listing:', error);
    throw error;
  }
};

/**
 * Get Active Listing Details
 */
export const getListingDetails = async (listingId, provider) => {
  try {
    const marketplace = getMarketplaceContract(provider);
    const [seller, bondToken, amount, pricePerToken, isActive] =
      await marketplace.getActiveListing(listingId);

    return {
      seller,
      bondToken,
      amount: ethers.formatEther(amount),
      pricePerToken: ethers.formatEther(pricePerToken),
      isActive,
    };
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
};

/**
 * Transfer Bond Tokens
 */
export const transferBondTokens = async (bondAddress, toAddress, amount, signer) => {
  try {
    const contract = getBondTokenContract(bondAddress, signer);
    const tx = await contract.transfer(toAddress, ethers.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error transferring bond tokens:', error);
    throw error;
  }
};

/**
 * Get Days Until Maturity
 */
export const getDaysUntilMaturity = async (bondAddress, provider) => {
  try {
    const contract = getBondTokenContract(bondAddress, provider);
    const days = await contract.daysUntilMaturity();
    return Number(days);
  } catch (error) {
    console.error('Error fetching days until maturity:', error);
    throw error;
  }
};

/**
 * Get Total Coupons Earned
 */
export const getTotalCouponsEarned = async (bondAddress, userAddress, provider) => {
  try {
    const contract = getBondTokenContract(bondAddress, provider);
    const total = await contract.totalCouponsEarned(userAddress);
    return ethers.formatEther(total);
  } catch (error) {
    console.error('Error fetching total coupons earned:', error);
    throw error;
  }
};

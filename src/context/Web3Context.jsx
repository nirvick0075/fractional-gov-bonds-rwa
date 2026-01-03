import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '../config/contracts';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    checkIfWalletConnected();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Update balance when account or network changes
  useEffect(() => {
    if (account && provider) {
      updateBalance();
    }
  }, [account, provider, network]);

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        await connectWallet();
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      if (!window.ethereum) {
        toast.error('Please install MetaMask to use this application');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create provider and signer
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const web3Network = await web3Provider.getNetwork();

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setNetwork(web3Network);
      setIsConnected(true);

      // Get balance
      const balance = await web3Provider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(balance));

      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setNetwork(null);
    setBalance('0');
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      toast.info('Account changed');
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const updateBalance = async () => {
    try {
      if (provider && account) {
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const switchNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      toast.success('Network switched successfully');
    } catch (error) {
      if (error.code === 4902) {
        toast.error('Network not found. Please add it to MetaMask.');
      } else {
        toast.error('Failed to switch network');
      }
    }
  };

  const getNetworkName = () => {
    if (!network) return 'Not connected';
    return SUPPORTED_NETWORKS[Number(network.chainId)]?.name || `Chain ${network.chainId}`;
  };

  const getExplorerUrl = (txHash) => {
    if (!network) return null;
    const networkInfo = SUPPORTED_NETWORKS[Number(network.chainId)];
    return networkInfo ? `${networkInfo.explorer}/tx/${txHash}` : null;
  };

  const getAddressExplorerUrl = (address) => {
    if (!network) return null;
    const networkInfo = SUPPORTED_NETWORKS[Number(network.chainId)];
    return networkInfo ? `${networkInfo.explorer}/address/${address}` : null;
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const value = {
    account,
    provider,
    signer,
    network,
    balance,
    isConnecting,
    isConnected,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    getNetworkName,
    getExplorerUrl,
    getAddressExplorerUrl,
    formatAddress,
    updateBalance,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

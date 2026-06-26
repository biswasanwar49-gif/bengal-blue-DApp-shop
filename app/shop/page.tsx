 'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  Wallet,
  UserCircle,
  PackageOpen,
  ShieldCheck,
  Repeat,
  ArrowRight,
  Star,
  MapPin,
  Truck,
  CreditCard,
  Users,
} from 'lucide-react';
import { ethers } from 'ethers';
import { ESCROW_MARKETPLACE_ADDRESS } from '../../src/config';
import contractABI from '../../src/EscrowMarketplaceABI.json';

const topOffers = [
  'Free shipping on orders over $75',
  'Exclusive wallet cashback up to 5%',
  'New arrivals: sustainable tech accessories',
];

const categories = [
  { label: 'Mobile', value: 'mobile' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Smart Home', value: 'smart-home' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const loadBlockchainProducts = async () => {
    try {
      setLoading(true);
      let provider;

      if (typeof window !== 'undefined' && (window as any).ethereum) {
        provider = new ethers.BrowserProvider((window as any).ethereum);
      } else {
        provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");
      }

      const contract = new ethers.Contract(ESCROW_MARKETPLACE_ADDRESS, contractABI, provider);
      const productCount = await contract.productCount(); 
      const tempProducts = [];
      
      for (let i = 1; i <= Number(productCount); i++) {
        try {
          const prod = await contract.products(i);
          
          if (prod) {
            tempProducts.push({
              id: prod[0] ? Number(prod[0]) : i,
              seller: prod[1] || "",
              name: prod[2] || "Unnamed Product",
              price: prod[3] ? ethers.formatEther(prod[4] === true || typeof prod[4] === 'boolean' ? prod[3] : prod[2]) : "0", 
              buyer: "", 
              status: 0, 
              active: prod[4] === true || prod[4] === undefined
            });
          }
        } catch (loopError) {
          console.error(`Error loading product ID ${i}:`, loopError);
          continue;
        }
      }
      
      setProducts(tempProducts);
    } catch (error) {
      console.error("Error loading products from blockchain:", error);
    } finally {
      setLoading(false);
    }
  };

  // প্রোডাক্ট কেনার নতুন ফাংশন
  const buyProduct = async (id: number, priceInEther: string) => {
    if (!walletAddress) {
      alert("❌ Please connect your wallet first!");
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ESCROW_MARKETPLACE_ADDRESS, contractABI, signer);

        const priceInWei = ethers.parseEther(priceInEther);
        alert(`⏳ Smart Contract Call Initiated for Product ID #${id}. Please confirm in MetaMask...`);

        const tx = await contract.buyProduct(id, { value: priceInWei });
        alert("🚀 Transaction submitted! Waiting for block confirmation...");
        await tx.wait();

        alert("✅ Product purchased successfully through Escrow!");
        loadBlockchainProducts();
      }
    } catch (error: any) {
      console.error("Purchase error:", error);
      alert(`❌ Transaction failed: ${error.reason || error.message || error}`);
    }
  };

  useEffect(() => {
    loadBlockchainProducts();
  }, []);
  
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          alert("Wallet connected!");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
    }
  };

  const ADMIN_WALLET = "0x1dB969Dc7F8656B47774e6f5b73B3c103013b92D".toLowerCase();

  const handleAdminClick = () => {
    if (!walletAddress) {
      alert("❌ Please connect your MetaMask wallet first!");
      return;
    }

    if (walletAddress.toLowerCase() === ADMIN_WALLET) {
      window.location.href = '/admin'; 
    } else {
      alert("🔒 Access Denied! You are not an authorized admin of this site.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    alert("Wallet is now disconnected.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="min-h-screen overflow-hidden">
        {/* নেভিগেশন/টপ বার সেকশন */}
        <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <p className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
              BlockCart DApp
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={walletAddress ? disconnectWallet : connectWallet}
                className="rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition"
              >
                {walletAddress 
                  ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` 
                  : "Connect Wallet"
                }
              </button>
            </div>
          </div>
        </div>

        {/* প্রোডাক্ট গ্যালারি ও শপ সেকশন */}
        <section id="products" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            
            {/* হেডার ও ক্যাটাগরি ফিল্টার */}
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-500">Featured collection</p>
                <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Selected products with cart, wishlist, and escrow signals.</h2>
              </div>
            </div>

            {/* প্রোডাক্ট কন্ডিশন লজিক */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em]" role="status"></div>
                <p className="mt-4 text-lg text-slate-400 animate-pulse font-medium">Loading blockchain assets...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20 backdrop-blur-sm px-6">
                <p className="text-xl text-slate-400 font-medium">No active products found on the smart contract.</p>
              </div>
            ) : (
              /* ৩ কলামের গ্রিড */
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-700/50 hover:shadow-blue-500/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </span>
                      <span className="text-xs font-mono text-slate-500">ID #{product.id}</span>
                    </div>
                    
                    <div className="mt-6 h-52 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-between shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Blockchain Asset</p>
                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 px-2 space-y-1">
                      <div className="flex items-baseline gap-1">
                        <p className="text-3xl font-extrabold tracking-tight text-white">{product.price}</p>
                        <p className="text-sm font-bold text-blue-400 tracking-wider">ETH</p>
                      </div>
                      <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Ready for Sale
                      </p>
                    </div>

                    {/* বাই বাটন যেখানে onClick ইভেন্ট যোগ করা হয়েছে */}
                    <div className="mt-6">
                      <button 
                        onClick={() => buyProduct(product.id, product.price)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98]"
                      >
                        Buy Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-white mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold tracking-wide text-slate-400">Stay Updated</p>
            <p className="text-xs text-slate-500 mt-1">Blockchain decentralized ecommerce experience.</p>
          </div>
          <div className="text-center md:text-right text-xs text-slate-500">
            © 2026 BlockCart. Designed for a modern decentralized ecommerce experience.
          </div>
        </div>
      </footer>
    </div>
  );
}
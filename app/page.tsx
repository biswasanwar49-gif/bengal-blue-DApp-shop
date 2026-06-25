"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

// স্মার্ট কন্ট্রাক্টের ABI এবং অ্যাড্রেস
 import { ESCROW_MARKETPLACE_ADDRESS, ESCROW_MARKETPLACE_ABI } from '../src/config';

declare global {
  interface Window {
    ethereum?: any;
  }
}
// প্রোডাক্ট ডেটার টাইপ সেটিং
interface Product {
  id: number;
  name: string;
  priceInEther: string;
  seller: string;
  active: boolean;
}


export default function Home() {
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  // নতুন প্রোডাক্ট তৈরি করার স্টেট
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [listingLoading, setListingLoading] = useState<boolean>(false);

   useEffect(() => {
  setIsMounted(true); // ১. মাউন্ট স্টেট ট্রু করবে
  loadBlockchainData(); // ২. ব্লকচেইন ডাটা লোড করবে
}, []);

  // ব্লকচেইন থেকে ডেটা লোড করার মূল ফাংশন
  async function loadBlockchainData() {
    try {
      if (!window.ethereum) {
        console.log("Metamask not found");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      // স্মার্ট কন্ট্রাক্ট ইনস্ট্যান্স তৈরি
      const marketplaceContract = new ethers.Contract(
        ESCROW_MARKETPLACE_ADDRESS,
        ESCROW_MARKETPLACE_ABI,
        signer
      );
      setContract(marketplaceContract);

      // টোটাল প্রোডাক্ট কাউন্ট নেওয়া
      const count = await marketplaceContract.productCount();
      const totalProducts = Number(count);
      const tempProducts: Product[] = [];

      // লুপ চালিয়ে প্রতিটি প্রোডাক্ট লোড করা
      for (let i = 1; i <= totalProducts; i++) {
        const prod = await marketplaceContract.getProduct(i);
        
        tempProducts.push({
          id: Number(prod.id),
          name: prod.name,
          priceInEther: ethers.formatEther(prod.priceWei),
          seller: prod.seller,
          active: prod.active,
        });
      }

      setProducts(tempProducts);
      console.log("All products loaded:", tempProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products from contract:", error);
      setLoading(false);
    }
    finally {
    setLoading(false);
  }
  
  }

  // ১. প্রোডাক্ট কেনার জন্য ফ্রন্টএন্ড ফাংশন (Buy Product)
const handleBuyProduct = async (id: number, priceInEther: string) => {
  try {
    if (!contract) return alert("Contract not loaded!");
    
    // ইথার ভ্যালুকে সরাসরি Wei তে কনভার্ট করা (রিমিক্স ট্রিকের মতো)
    const priceInWei = ethers.parseEther(priceInEther.toString());
    
    // ট্রানজেকশন কল
    const tx = await contract.buyProduct(id, { value: priceInWei });
    console.log("Buying product, transaction hash:", tx.hash);
    
    await tx.wait(); // ব্লকচেইনে কনফার্ম হওয়া পর্যন্ত অপেক্ষা করবে
    alert("Product purchased successfully! Refreshing data...");
    window.location.reload();
  } catch (error: any) {
    console.error("Buy Product Error:", error);
    alert("Transaction failed: " + (error.reason || error.message));
  }
};

// ২. প্রোডাক্ট শিপ করার জন্য ফ্রন্টএন্ড ফাংশন (Ship Product)
const handleMarkShipped = async (id: number) => {
  try {
    if (!contract) return alert("Contract not loaded!");
    const tx = await contract.markShipped(id);
    await tx.wait();
    alert("Product marked as Shipped!");
    window.location.reload();
  } catch (error: any) {
    console.error("Ship Error:", error);
    alert("Shipping failed: " + (error.reason || error.message));
  }
};

// ৩. ডেলিভারি কনফার্ম করার জন্য ফ্রন্টএন্ড ফাংশন (Confirm Delivery)
const handleConfirmReceived = async (id: number) => {
  try {
    if (!contract) return alert("Contract not loaded!");
    const tx = await contract.confirmReceived(id);
    await tx.wait();
    alert("Delivery Confirmed & Funds Released!");
    window.location.reload();
  } catch (error: any) {
    console.error("Delivery Confirm Error:", error);
    alert("Confirmation failed: " + (error.reason || error.message));
  }
};

 // নতুন প্রোডাক্ট লিস্ট করার ফাংশন
  async function mintAndListProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!contract || !productName || !productPrice) return;

    try {
      setListingLoading(true);
      const priceInWei = ethers.parseEther(productPrice);

      // কন্ট্রাক্টের listProduct ফাংশন কল
      const tx = await contract.listProduct(productName, priceInWei);
      await tx.wait();

      setProductName("");
      setProductPrice("");
      alert("Product Listed Successfully!");
      
      // ড্যাশবোর্ড রিফ্রেশ করা
      await loadBlockchainData();
    } catch (error) {
      console.error("Error listing product:", error);
      alert("Listing failed!");
    } finally {
      setListingLoading(false);
    }
  }
  async function buyProduct(productId: number, price: any) {
    if (!contract) return;
    try {
      const tx = await contract.buyProduct(productId, { value: price });
      await tx.wait();
      alert("Product Purchased Successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error purchasing product:", error);
    }
  }

   if (!isMounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading Blockchain Marketplace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* হেডার সেকশন */}
      <header className="max-w-6xl mx-auto flex justify-between items-center border-b border-slate-800 pb-5 mb-10">
        <div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            BlockCart DApp Shop
          </h1>
          <p className="text-xs text-slate-400 mt-1">Web3 Escrow-Backed Retail Network</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Connected Wallet</p>
          <p className="text-xs font-mono text-blue-400 font-semibold mt-0.5">
            {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Not Connected"}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বিক্রেতার ড্যাশবোর্ড ফর্ম */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
          <h2 className="text-lg font-bold text-green-400 mb-1">Seller Dashboard</h2>
          <p className="text-xs text-slate-400 mb-6">List new products directly onto the smart contract.</p>

          <form onSubmit={mintAndListProduct} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. Premium API Key"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                Price (ETH)
              </label>
              <input
                type="number"
                step="0.0001"
                placeholder="e.g. 0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={listingLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition-colors mt-2 shadow-lg shadow-green-900/20"
            >
              {listingLoading ? "Minting & Listing..." : "Mint & List Product"}
            </button>
          </form>
        </section>
        
    
  

  
  <div className="product-list-section" style={{ padding: '20px', background: '#121214', color: '#fff', borderRadius: '12px', marginTop: '20px' }}>
    <h2>লাইভ ব্লকচেইন প্রোডাক্টসমূহ ({products.length})</h2>
    
    {products.length === 0 ? (
      <p style={{ color: '#94a3b8', marginTop: '10px' }}>কোনো প্রোডাক্ট লাইভ নেই। অনুগ্রহ করে নতুন প্রোডাক্ট যোগ করুন।</p>
    ) : (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
        {products.map((product: any, index: number) => (
          <div key={index} style={{ border: '1px solid #334155', padding: '15px', borderRadius: '8px', background: '#1e293b', width: '250px' }}>
            <h4 style={{ fontWeight: 'bold' }}>{product.name}</h4>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>মূল্য: {ethers.formatEther(product.price)} ETH</p>
            <p style={{ fontSize: '14px' }}>অবস্থা: {product.active ? "🟢 বিক্রির জন্য প্রস্তুত" : "🔴 বিক্রিত"}</p>
            
            {product.active && (
              <button 
                onClick={() => buyProduct(product.id, product.price)}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'semibold' }}
              >
                Buy Product
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
  



        {/* লাইভ মার্কেটপ্লেস গ্রিড */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-extrabold text-white mb-6 tracking-tight">
            Active Live Marketplace
          </h2>

          {products.length === 0 ? (
            <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-sm text-slate-500">
                No active listings found. Connect wallet or list a product to start!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => {
                const isSeller = account.toLowerCase() === product.seller.toLowerCase();

                return (
                  <div
                    key={product.id}
                    className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col h-full text-left justify-between"
                  >
                    <div>
                      {/* আইডি এবং স্ট্যাটাস ব্যাজ */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-blue-500 bg-blue-950/50 border border-blue-900 px-2.5 py-1 rounded-md">
                          ID #{product.id}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                            product.active
                              ? "text-yellow-500 bg-yellow-950/50 border border-yellow-900"
                              : "text-green-500 bg-green-950/50 border border-green-900"
                          }`}
                        >
                          {product.active ? "• Escrow Open" : "✓ Completed"}
                        </span>
                      </div>
                      
                      {/* প্রোডাক্ট নাম ও বিক্রেতার অ্যাড্রেস */}
                      <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-[11px] text-slate-500 truncate mb-4">
                        Seller: <span className="text-blue-400 font-mono">{product.seller}</span>
                      </p>
                    </div>

                    {/* প্রাইস এবং বাটন কন্ট্রোল সেকশন */}
                    <div className="pt-4 border-t border-slate-950 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Price</p>
                          <p className="text-lg font-black text-white">{product.priceInEther} ETH</p>
                        </div>
                        
                      </div>
                      {product.active && (
  <button
    onClick={() => handleBuyProduct(product.id, product.priceInEther)}
    className="w-full mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all"
  >
    Buy Product #{product.id}
  </button>
)}

                      {/* স্মার্ট এস্ক্রো টেস্ট কন্ট্রোল */}
                      <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
                        <p className="text-[10px] font-semibold text-center text-blue-400 mb-2 tracking-wider uppercase">
                          ⚡ Escrow Testing Control
                        </p>

                        <div className="flex gap-2 justify-center">
                          {/* Ship বাটন: শুধুমাত্র বিক্রেতা দেখতে পাবেন */}
                          {product.active && isSeller && (
                            <button
                              onClick={() => handleMarkShipped(product.id)}
                              className="w-full px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-colors"
                            >
                              Ship #{product.id}
                            </button>
                          )}

                          {/* Confirm Delivery বাটন: ক্রেতা বা অন্য কোনো অ্যাকাউন্ট দেখতে পাবেন */}
                          {product.active && !isSeller && (
                            <button
                              onClick={() => handleConfirmReceived(product.id)}
                              className="w-full px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors"
                            >
                              Confirm Delivery #{product.id}
                            </button>
                          )}
                          
                          {/* প্রোডাক্টটি কমপ্লিট হয়ে গেলে */}
                          {!product.active && (
                            <p className="w-full text-[11px] text-green-500 font-bold text-center py-1">
                              ✓ Funds Released to Seller
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
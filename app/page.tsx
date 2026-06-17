'use client';
import { useState } from 'react';
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

const featuredProducts = [
  {
    name: 'Aurora Smart Speaker',
    price: '$159',
    badge: 'Trending',
    rating: 4.9,
    stock: 'In stock',
    color: 'from-sky-500 to-cyan-500',
  },
  {
    name: 'Nexa Streetwear Jacket',
    price: '$128',
    badge: 'New',
    rating: 4.7,
    stock: 'Few left',
    color: 'from-violet-500 to-blue-400',
  },
  {
    name: 'Luma Daypack',
    price: '$79',
    badge: 'Popular',
    rating: 4.8,
    stock: 'In stock',
    color: 'from-cyan-400 to-sky-500',
  },
];

const reviews = [
  {
    name: 'Sara K.',
    feedback: 'This DApp homepage feels premium, fast, and modern. The wallet-first experience feels ready for real users.',
  },
  {
    name: 'Jason M.',
    feedback: 'The product carousel and delivery tracking section make browsing feel effortless—very trendy and clean.',
  },
];

const featureList = [
  {
    icon: <Wallet className="h-5 w-5 text-cyan-500" />,
    title: 'Wallet Ready',
    description: 'Connect and pay with crypto-ready wallets for faster checkout and secure access.',
  },
  {
    icon: <Truck className="h-5 w-5 text-cyan-500" />,
    title: 'Fast Delivery',
    description: 'Flexible delivery options, real-time tracking, and smart return requests.',
  },
  {
    icon: <PackageOpen className="h-5 w-5 text-cyan-500" />,
    title: 'Inventory Control',
    description: 'Live stock updates with admin tools to keep every product listing accurate.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-500" />,
    title: 'Secure Orders',
    description: 'Decentralized payments, order protection, and a buyer-first review system.',
  },
];

export default function Home() {
const [walletAddress, setWalletAddress] = useState<string>("");
  
// Wallet connection function using MetaMask
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
    // 1. Check if the wallet is connected by verifying if walletAddress state has a value. If not, it prompts the user to connect their MetaMask wallet first.
    if (!walletAddress) {
      alert("❌ Please connect your MetaMask wallet first!");
      return;
    }

    // 2. Compare walletAddress with the predefined ADMIN_WALLET address
    if (walletAddress.toLowerCase() === ADMIN_WALLET) {
      // if it matches, it allows access to the admin panel
      window.location.href = '/admin'; 
    } else {
      // if it doesn't match, it shows an access denied message
      alert("🔒 Access Denied! You are not an authorized admin of this site.");
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress("");
    alert("Wallet is now disconnected.");
  };

   

  
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="bg-white/90 border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm text-slate-600 sm:px-6 lg:px-8">
          <p className="font-medium text-slate-800">BlockCart DApp:</p>
          <div className="flex gap-4">
            {topOffers.map((offer) => (
              <span key={offer}>{offer}</span>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-soft">
              <span className="font-bold">BB</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">BlockCart</p>
              <p className="text-xs text-slate-500">Decentralized commerce</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#home" className="transition hover:text-blue-600">Home</a>
            <Link href="/shop" className="transition hover:text-blue-600">Shop</Link>
            <Link href="/dashboard" className="transition hover:text-blue-600">Dashboard</Link>
            <a href="#categories" className="transition hover:text-blue-600">Categories</a>
            <Link href="/about" className="transition hover:text-blue-600">About</Link>
            <Link href="/contact" className="transition hover:text-blue-600">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
  {/* 🔒 admin panel link */}
  <button 
    onClick={handleAdminClick} 
    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
  >
    Admin Panel
  </button>
            <Link href="/account" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 md:inline-flex">
              <UserCircle className="h-4 w-4" />
              My Account
            </Link>
      <button 
  onClick={walletAddress ? disconnectWallet : connectWallet}
  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
>
  {walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} (Disconnect)` 
    : "Connect Wallet"
  }
</button>
      </div>
   </div>
   

        
      </header>

      <section id="home" className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm text-blue-600">
              <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">New</span>
              Trendy decentralized ecommerce built for buyers and admins.
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Shop smart with a modern DApp storefront powered by wallet, tracking, and product intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A BlockCart homepage crafted for discovery, fast checkout, product filtering, reviews, and a sleek admin experience for managing stock, returns, and delivery.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-blue-500">
                  Explore products
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
                  Learn more
                </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/90 p-6 shadow-soft border border-slate-200">
                <span className="text-3xl font-semibold text-blue-600">24K+</span>
                <p className="mt-3 text-sm text-slate-600">Active buyers every month</p>
              </div>
              <div className="rounded-3xl bg-white/90 p-6 shadow-soft border border-slate-200">
                <span className="text-3xl font-semibold text-blue-600">98%</span>
                <p className="mt-3 text-sm text-slate-600">Fast delivery satisfaction</p>
              </div>
              <div className="rounded-3xl bg-white/90 p-6 shadow-soft border border-slate-200">
                <span className="text-3xl font-semibold text-blue-600">1.8K</span>
                <p className="mt-3 text-sm text-slate-600">Verified reviews and ratings</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[2.5rem] bg-blue-600 text-white shadow-soft">
            <div className="hero-glow absolute inset-0 opacity-80"></div>
            <div className="relative grid gap-6 p-8 sm:p-10 lg:p-12">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-200">
                  <span>Top pick</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">Hot</span>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Urban Airbuds Pro</p>
                    <p className="mt-2 text-sm text-slate-100">Immersive sound, minimal style, wallet-friendly checkout.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white/10 p-6 shadow-inner backdrop-blur-xl">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-200">Suggested for you</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">Decentralized product discovery.</h2>
                  </div>
                  <div className="grid place-items-center rounded-3xl bg-white/10 px-5 py-5 text-white shadow-soft">
                    <span className="text-lg font-semibold">3.8s</span>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-200">load time</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">Live experience</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-2xl font-semibold text-white">95%</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Repeat buyers</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-2xl font-semibold text-white">4.8</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Average rating</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-500">Featured collection</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Selected products with cart, wishlist, and review signals.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category.value} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <motion.div key={product.name} whileHover={{ y: -8 }} className="section-card overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-3xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    {product.badge}
                  </span>
                  <button className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-blue-600 hover:text-white">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className={`mt-6 h-48 rounded-[2rem] bg-gradient-to-br ${product.color} p-6 text-white shadow-soft`}>
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-100/90">Smart pick</p>
                      <h3 className="mt-4 text-2xl font-semibold">{product.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-4xl font-semibold">{product.price}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-100/90">
                        <Star className="h-4 w-4" />
                        <span>{product.rating} rating</span>
                        <span className="mx-2">•</span>
                        <span>{product.stock}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </button>
                  <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Browse by category</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Find products by style, use case, and delivery preference.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {['New Arrivals', 'Wallet Deals', 'Fast Delivery', 'Verified Reviews'].map((item) => (
              <div key={item} className="section-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-soft">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Fast filters, relevant products, and smart sorting for the trending items you want.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Smart experience</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Everything buyers and admins need in one landing page.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                The design balances product discovery, search, wallet access, delivery tracking, return support, and admin-level stock insight—all in a responsive layout.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {featureList.map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/5 text-cyan-500">{feature.icon}</div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-400 p-8 text-white shadow-soft">
              <div className="mb-8 grid gap-5 rounded-[2rem] bg-white/10 p-6">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-200">
                  <span>Delivery</span>
                  <span>Fast route</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-3xl bg-white/20 p-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Express tracking</h4>
                    <p className="mt-2 text-sm text-slate-200">Realtime updates for every shipment, from pack to arrival.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-[2rem] bg-white/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-3xl bg-white/20 p-3">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Secure checkout</h4>
                    <p className="mt-2 text-sm text-slate-200">Crypto wallet support and trusted delivery options.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-3xl bg-white/20 p-3">
                    <Repeat className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Easy returns</h4>
                    <p className="mt-2 text-sm text-slate-200">Simple return flows with visibility for buyer and admin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Customer feedback</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Buyers love the trending UX and responsive product flow.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.name} className="section-card p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{review.name}</p>
                    <p className="text-sm text-slate-500">Verified buyer</p>
                  </div>
                </div>
                <p className="mt-6 text-slate-600">“{review.feedback}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-10 shadow-soft sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">About the DApp</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">A homepage designed for modern ecommerce with decentralized trust.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                The layout combines marketplace essentials—search, recommendations, filtering, product cards, wishlist, cart, and buyer reviews—with admin-ready control panels and delivery tracking.
              </p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-50 p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-blue-600/5 p-3 text-blue-600"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-slate-950">Contact</p>
                  <p className="mt-2 text-sm text-slate-600">Reach out for custom DApp product strategy and admin panel design.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-blue-600/5 p-3 text-blue-600"><Truck className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-slate-950">Delivery</p>
                  <p className="mt-2 text-sm text-slate-600">Offer delivery options, tracking, and returns for every order.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-blue-600/5 p-3 text-blue-600"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-slate-950">Trust</p>
                  <p className="mt-2 text-sm text-slate-600">Secure order flows, buyer reviews, and admin inventory updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-blue-600 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <h3 className="text-2xl font-semibold">BlockCart DApp</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
              Trendy ecommerce design built for wallet integration, product browsing, delivery tracking, and admin management.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Quick links</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li><Link href="/shop" className="transition hover:text-white">Shop</Link></li>
              <li><a href="#categories" className="transition hover:text-white">Categories</a></li>
              <li><Link href="/about" className="transition hover:text-white">About</Link></li>
              <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Stay updated</p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-200 focus:border-cyan-500 focus:bg-white/20" />
              <button className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-300 sm:px-6 lg:px-8">
          © 2026 BlockCart. Designed for a modern decentralized ecommerce experience.
        </div>
      </footer>
    </main>
  );
}

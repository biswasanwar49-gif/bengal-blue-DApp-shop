'use client';

import Link from 'next/link';
import { AlertTriangle, BarChart3, Box, DollarSign, Eye, Package, Settings, ShoppingCart, Star, TrendingUp, Users, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const adminMenuItems = [
  { label: 'Overview', href: '/admin', icon: BarChart3 },
  { label: 'Products', href: '/admin/products', icon: Box },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Returns', href: '/admin/returns', icon: Package },
  { label: 'Delivery', href: '/admin/delivery', icon: Zap },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Categories', href: '/admin/categories', icon: Eye },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const revenueData = [
  { month: 'Jan', revenue: 12.5, label: 'Jan' },
  { month: 'Feb', revenue: 15.8, label: 'Feb' },
  { month: 'Mar', revenue: 18.2, label: 'Mar' },
  { month: 'Apr', revenue: 22.1, label: 'Apr' },
  { month: 'May', revenue: 25.5, label: 'May' },
  { month: 'Jun', revenue: 28.9, label: 'Jun' },
  { month: 'Jul', revenue: 32.3, label: 'Jul' },
  { month: 'Aug', revenue: 35.7, label: 'Aug' },
  { month: 'Sep', revenue: 38.1, label: 'Sep' },
  { month: 'Oct', revenue: 41.5, label: 'Oct' },
  { month: 'Nov', revenue: 45.2, label: 'Nov' },
  { month: 'Dec', revenue: 48.6, label: 'Dec' },
];

const orderStatuses = [
  { label: 'Delivered', value: 45, color: 'bg-emerald-500' },
  { label: 'In transit', value: 30, color: 'bg-bengal-blue' },
  { label: 'Processing', value: 18, color: 'bg-amber-500' },
  { label: 'Cancelled', value: 7, color: 'bg-rose-500' },
];

export default function AdminPage() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex gap-6 lg:flex-row">
        <aside className="hidden w-64 flex-col gap-6 bg-white p-6 shadow-soft lg:flex sticky top-0 h-screen overflow-y-auto">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-bengal-blue to-bengal-blue-soft p-5 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Admin store owner</p>
            <p className="mt-3 text-lg font-semibold">BlockCart</p>
            <p className="mt-1 text-sm text-slate-200">Admin access</p>
          </div>

          <nav className="flex flex-col gap-1 text-sm">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/admin';
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? 'bg-bengal-blue/10 text-bengal-blue'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-950">Analytics & management</h1>
              </div>
              <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                Back to store
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Inventory attention required</p>
                  <p className="text-sm text-slate-600">1 product out of stock, 1 running low on inventory</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Total revenue</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">48.62 ETH</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bengal-blue/10 text-bengal-blue">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="font-semibold">+12.4%</span>
                  </div>
                  <span className="text-slate-500">from last month</span>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1 bg-slate-50 rounded-lg p-2">
                  {[3, 5, 4, 7, 6, 8, 9, 7, 9, 10, 11, 12].map((val, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-bengal-blue/60" style={{ height: `${(val / 12) * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Orders this month</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">1,284</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bengal-cyan/10 text-bengal-cyan">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="font-semibold">+8.1%</span>
                  </div>
                  <span className="text-slate-500">vs last month</span>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1 bg-slate-50 rounded-lg p-2">
                  {[4, 6, 5, 8, 7, 9, 10, 8, 10, 11, 12, 13].map((val, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-bengal-cyan/60" style={{ height: `${(val / 13) * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Total customers</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">8,940</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="font-semibold">+5.7%</span>
                  </div>
                  <span className="text-slate-500">new customers</span>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1 bg-slate-50 rounded-lg p-2">
                  {[5, 7, 6, 9, 8, 10, 11, 9, 11, 12, 13, 14].map((val, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-purple-400/60" style={{ height: `${(val / 14) * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Conversion rate</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">3.84%</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-rose-600">
                    <ArrowDownRight className="h-4 w-4" />
                    <span className="font-semibold">-1.2%</span>
                  </div>
                  <span className="text-slate-500">from last month</span>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1 bg-slate-50 rounded-lg p-2">
                  {[6, 8, 7, 10, 9, 11, 12, 10, 11, 12, 11, 10].map((val, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-amber-400/60" style={{ height: `${(val / 12) * 100}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft lg:col-span-2">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Revenue chart</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Revenue (Last 12 months in ETH)</h2>

                <div className="mt-8 space-y-6">
                  <div className="flex items-end gap-1 overflow-x-auto" style={{ height: '200px' }}>
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="relative h-40 w-8 rounded-t-lg bg-slate-100">
                          <div
                            className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-bengal-blue to-bengal-cyan transition-all"
                            style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{data.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Highest month</p>
                      <p className="mt-2 font-semibold text-slate-950">48.62 ETH (Dec)</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Average month</p>
                      <p className="mt-2 font-semibold text-slate-950">30.55 ETH</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Total revenue</p>
                      <p className="mt-2 font-semibold text-slate-950">366.6 ETH</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Distribution</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Order status</h2>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex items-center justify-center">
                    <svg className="h-48 w-48" viewBox="0 0 100 100">
                      {[45, 30, 18, 7].reduce((acc, val, idx) => {
                        const colors = ['#1f3a5f', '#06b6d4', '#f59e0b', '#f43f5e'];
                        const startAngle = acc.reduce((sum, o: any) => sum + o.percentage, 0) * 3.6;
                        const endAngle = (acc.reduce((sum, o: any) => sum + o.percentage, 0) + val) * 3.6;
                        const startRad = (startAngle - 90) * (Math.PI / 180);
                        const endRad = (endAngle - 90) * (Math.PI / 180);
                        const x1 = 50 + 45 * Math.cos(startRad);
                        const y1 = 50 + 45 * Math.sin(startRad);
                        const x2 = 50 + 45 * Math.cos(endRad);
                        const y2 = 50 + 45 * Math.sin(endRad);
                        const largeArc = val > 50 ? 1 : 0;
                        const path = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;
                        acc.push({
                          path,
                          fill: colors[idx],
                          percentage: val,
                        });
                        return acc;
                      }, [] as any[]).map((segment, idx) => (
                        <path key={idx} d={segment.path} fill={segment.fill} stroke="white" strokeWidth="1" />
                      ))}
                    </svg>
                  </div>

                  <div className="space-y-3">
                    {orderStatuses.map((status) => (
                      <div key={status.label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${status.color}`} />
                          <span className="text-sm font-medium text-slate-900">{status.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{status.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// --- ALL CALCULATOR DATA BUILT DIRECTLY HERE ---
const CALCULATORS = [
  { slug: 'profit', title: 'Profit Calculator', description: 'Calculate your exact net profit after all expenses, ads, and fees.', icon: '💰', fields: [{ id: 'revenue', label: 'Total Revenue', placeholder: '100000' }, { id: 'productCost', label: 'Product Cost', placeholder: '40000', deduct: true }, { id: 'ads', label: 'Advertising Cost', placeholder: '15000', deduct: true }, { id: 'shipping', label: 'Shipping & Packaging', placeholder: '5000', deduct: true }, { id: 'fees', label: 'Platform/Payment Fees (%)', placeholder: '3', percent: true }] },
  { slug: 'roi', title: 'ROI Calculator', description: 'Measure the return on your investment to ensure your business is growing.', icon: '📈', fields: [{ id: 'investment', label: 'Total Investment', placeholder: '50000' }, { id: 'return', label: 'Total Return (Revenue)', placeholder: '80000' }] },
  { slug: 'margin', title: 'Margin Calculator', description: 'Find out your exact profit margin percentage to price your products correctly.', icon: '📊', fields: [{ id: 'cost', label: 'Total Cost', placeholder: '40000' }, { id: 'revenue', label: 'Selling Price (Revenue)', placeholder: '100000' }] },
  { slug: 'roas', title: 'ROAS Calculator', description: 'Calculate Return on Ad Spend to optimize your Facebook and TikTok ads.', icon: '🎯', fields: [{ id: 'adSpend', label: 'Total Ad Spend', placeholder: '20000' }, { id: 'adRevenue', label: 'Revenue from Ads', placeholder: '100000' }] },
  { slug: 'break-even', title: 'Break Even Calculator', description: 'Know exactly how many units you need to sell to cover all your costs.', icon: '⚖️', fields: [{ id: 'fixedCosts', label: 'Fixed Costs (Monthly)', placeholder: '50000' }, { id: 'pricePerUnit', label: 'Selling Price per Unit', placeholder: '2000' }, { id: 'costPerUnit', label: 'Cost per Unit', placeholder: '800' }] },
  { slug: 'discount', title: 'Discount Calculator', description: 'Calculate sale prices and discount amounts for your promotions.', icon: '💸', fields: [{ id: 'originalPrice', label: 'Original Price', placeholder: '2000' }, { id: 'discountPercent', label: 'Discount Percentage (%)', placeholder: '20', percent: true }] },
  { slug: 'shipping', title: 'Shipping Cost Calculator', description: 'Estimate your total shipping costs including packaging and courier charges.', icon: '📦', fields: [{ id: 'weight', label: 'Package Weight (kg)', placeholder: '2' }, { id: 'ratePerKg', label: 'Rate per Kg', placeholder: '150' }, { id: 'packaging', label: 'Packaging Cost', placeholder: '50', deduct: true }] },
  { slug: 'cod', title: 'COD Charges Calculator', description: 'Calculate Cash on Delivery fees charged by courier companies.', icon: '💳', fields: [{ id: 'orderValue', label: 'Order Value', placeholder: '5000' }, { id: 'codPercent', label: 'COD Fee Percentage (%)', placeholder: '2', percent: true }] },
  { slug: 'tax', title: 'Tax Calculator', description: 'Calculate sales tax, VAT, or GST on your products.', icon: '💵', fields: [{ id: 'amount', label: 'Amount', placeholder: '10000' }, { id: 'taxRate', label: 'Tax Rate (%)', placeholder: '16', percent: true }] },
  { slug: 'cpc', title: 'CPC Calculator', description: 'Calculate Cost Per Click for your advertising campaigns.', icon: '📉', fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'clicks', label: 'Total Clicks', placeholder: '250' }] },
  { slug: 'cpa', title: 'CPA Calculator', description: 'Calculate Cost Per Acquisition to measure campaign effectiveness.', icon: '👥', fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '10000' }, { id: 'conversions', label: 'Total Conversions', placeholder: '50' }] },
  { slug: 'revenue', title: 'Revenue Calculator', description: 'Project your total revenue based on units sold and average price.', icon: '💰', fields: [{ id: 'unitsSold', label: 'Units Sold', placeholder: '100' }, { id: 'pricePerUnit', label: 'Price per Unit', placeholder: '2000' }] },
  { slug: 'monthly-profit', title: 'Monthly Profit Calculator', description: 'Calculate your monthly profit after all recurring expenses.', icon: '📅', fields: [{ id: 'monthlyRevenue', label: 'Monthly Revenue', placeholder: '300000' }, { id: 'monthlyExpenses', label: 'Monthly Expenses', placeholder: '200000', deduct: true }] },
  { slug: 'yearly-profit', title: 'Yearly Profit Calculator', description: 'Project your annual profit and growth.', icon: '📆', fields: [{ id: 'yearlyRevenue', label: 'Yearly Revenue', placeholder: '3600000' }, { id: 'yearlyExpenses', label: 'Yearly Expenses', placeholder: '2400000', deduct: true }] },
  { slug: 'currency', title: 'Currency Converter', description: 'Convert between PKR, USD, EUR, and other currencies.', icon: '💱', fields: [{ id: 'amount', label: 'Amount', placeholder: '1000' }, { id: 'exchangeRate', label: 'Exchange Rate', placeholder: '278' }] },
  { slug: 'commission', title: 'Commission Calculator', description: 'Calculate platform commissions (Daraz, Shopify, Amazon, etc.).', icon: '📊', fields: [{ id: 'saleAmount', label: 'Sale Amount', placeholder: '5000' }, { id: 'commissionRate', label: 'Commission Rate (%)', placeholder: '5', percent: true }] },
  { slug: 'bundle', title: 'Bundle Pricing Calculator', description: 'Calculate profitable bundle prices for product combinations.', icon: '🎁', fields: [{ id: 'product1Cost', label: 'Product 1 Cost', placeholder: '500', deduct: true }, { id: 'product2Cost', label: 'Product 2 Cost', placeholder: '300', deduct: true }, { id: 'bundlePrice', label: 'Bundle Selling Price', placeholder: '1200' }] },
  { slug: 'markup', title: 'Markup Calculator', description: 'Calculate the markup percentage needed to achieve your target profit.', icon: '🏷️', fields: [{ id: 'cost', label: 'Product Cost', placeholder: '800' }, { id: 'sellingPrice', label: 'Selling Price', placeholder: '1200' }] },
  { slug: 'returns', title: 'Returns Calculator', description: 'Calculate the impact of product returns on your profit.', icon: '🔄', fields: [{ id: 'totalOrders', label: 'Total Orders', placeholder: '100' }, { id: 'returnRate', label: 'Return Rate (%)', placeholder: '10', percent: true }, { id: 'orderValue', label: 'Average Order Value', placeholder: '2000' }] },
  { slug: 'cpm', title: 'CPM Calculator', description: 'Calculate Cost Per Mille (thousand impressions) for brand awareness campaigns.', icon: '📢', fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'impressions', label: 'Total Impressions', placeholder: '100000' }] }
];

function getCalculatorBySlug(slug: string) {
  return CALCULATORS.find(c => c.slug === slug);
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = getCalculatorBySlug(params.slug);
  const [inputs, setInputs] = useState<Record<string, number>>({});

  if (!calc) notFound();

  const handleChange = (id: string, val: string) => {
    setInputs(prev => ({ ...prev, [id]: parseFloat(val) || 0 }));
  };

  // --- CALCULATION LOGIC ---
  let res1 = 0, res2 = 0, label1 = 'Result', label2 = 'Result 2';
  const s = calc.slug;
  const i = inputs;

  if (s === 'profit') {
    const rev = i.revenue || 0;
    const costs = (i.productCost || 0) + (i.ads || 0) + (i.shipping || 0);
    const fees = rev * ((i.fees || 0) / 100);
    res1 = rev - (costs + fees); res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Net Profit'; label2 = 'Profit Margin';
  } else if (s === 'roi') {
    const inv = i.investment || 0; const ret = i.return || 0;
    res1 = ret - inv; res2 = inv > 0 ? ((ret - inv) / inv) * 100 : 0; label1 = 'Net Gain'; label2 = 'ROI Percentage';
  } else if (s === 'margin') {
    const cost = i.cost || 0; const rev = i.revenue || 0;
    res1 = rev - cost; res2 = rev > 0 ? ((rev - cost) / rev) * 100 : 0; label1 = 'Gross Profit'; label2 = 'Margin Percentage';
  } else if (s === 'roas') {
    const spend = i.adSpend || 0; const rev = i.adRevenue || 0;
    res1 = rev - spend; res2 = spend > 0 ? rev / spend : 0; label1 = 'Net Ad Profit'; label2 = 'ROAS';
  } else if (s === 'break-even') {
    const fixed = i.fixedCosts || 0; const price = i.pricePerUnit || 0; const cost = i.costPerUnit || 0;
    const contrib = price - cost; res1 = contrib > 0 ? fixed / contrib : 0; res2 = res1 * price; label1 = 'Units to Break Even'; label2 = 'Revenue to Break Even';
  } else if (s === 'discount') {
    const orig = i.originalPrice || 0; const disc = i.discountPercent || 0;
    res1 = orig * (disc / 100); res2 = orig - res1; label1 = 'Discount Amount'; label2 = 'Final Price';
  } else if (s === 'shipping') {
    const w = i.weight || 0; const r = i.ratePerKg || 0; const p = i.packaging || 0;
    res1 = (w * r) + p; res2 = w * r; label1 = 'Total Shipping Cost'; label2 = 'Base Shipping';
  } else if (s === 'cod') {
    const val = i.orderValue || 0; const p = i.codPercent || 0;
    res1 = val * (p / 100); res2 = val - res1; label1 = 'COD Fee'; label2 = 'Amount After Fee';
  } else if (s === 'tax') {
    const amt = i.amount || 0; const r = i.taxRate || 0;
    res1 = amt * (r / 100); res2 = amt + res1; label1 = 'Tax Amount'; label2 = 'Total with Tax';
  } else if (s === 'cpc') {
    const c = i.totalCost || 0; const cl = i.clicks || 0;
    res1 = cl > 0 ? c / cl : 0; res2 = c; label1 = 'Cost Per Click'; label2 = 'Total Cost';
  } else if (s === 'cpa') {
    const c = i.totalCost || 0; const conv = i.conversions || 0;
    res1 = conv > 0 ? c / conv : 0; res2 = conv; label1 = 'Cost Per Acquisition'; label2 = 'Total Conversions';
  } else if (s === 'revenue') {
    const u = i.unitsSold || 0; const p = i.pricePerUnit || 0;
    res1 = u * p; res2 = u; label1 = 'Total Revenue'; label2 = 'Units Sold';
  } else if (s === 'monthly-profit') {
    const rev = i.monthlyRevenue || 0; const exp = i.monthlyExpenses || 0;
    res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Monthly Profit'; label2 = 'Profit Margin';
  } else if (s === 'yearly-profit') {
    const rev = i.yearlyRevenue || 0; const exp = i.yearlyExpenses || 0;
    res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Yearly Profit'; label2 = 'Profit Margin';
  } else if (s === 'currency') {
    const amt = i.amount || 0; const r = i.exchangeRate || 0;
    res1 = amt * r; res2 = r; label1 = 'Converted Amount'; label2 = 'Exchange Rate';
  } else if (s === 'commission') {
    const amt = i.saleAmount || 0; const r = i.commissionRate || 0;
    res1 = amt * (r / 100); res2 = amt - res1; label1 = 'Commission Amount'; label2 = 'Amount After Commission';
  } else if (s === 'bundle') {
    const c1 = i.product1Cost || 0; const c2 = i.product2Cost || 0; const p = i.bundlePrice || 0;
    res1 = p - (c1 + c2); res2 = p > 0 ? (res1 / p) * 100 : 0; label1 = 'Bundle Profit'; label2 = 'Profit Margin';
  } else if (s === 'markup') {
    const c = i.cost || 0; const p = i.sellingPrice || 0;
    res1 = p - c; res2 = c > 0 ? ((p - c) / c) * 100 : 0; label1 = 'Profit Amount'; label2 = 'Markup Percentage';
  } else if (s === 'returns') {
    const o = i.totalOrders || 0; const r = i.returnRate || 0; const v = i.orderValue || 0;
    const ret = o * (r / 100); res1 = ret * v; res2 = ret; label1 = 'Loss from Returns'; label2 = 'Number of Returns';
  } else if (s === 'cpm') {
    const c = i.totalCost || 0; const imp = i.impressions || 0;
    res1 = imp > 0 ? (c / imp) * 1000 : 0; res2 = imp; label1 = 'CPM (Cost per 1000)'; label2 = 'Total Impressions';
  }

  const formatResult = (val: number) => {
    if (s === 'roas' && label2 === 'ROAS') return val.toFixed(2) + 'x';
    if (s === 'break-even') return Math.ceil(val).toLocaleString();
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* CENTERED NAVBAR */}
      <nav className="glass sticky top-0 z-50 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
              EC
            </div>
            <span className="font-bold text-lg text-slate-900">E-commerce Calculator</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-3xl mb-6 shadow-sm">
            {calc.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            {calc.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {calc.description}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-500/5 border border-slate-200 overflow-hidden glow">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Enter Your Numbers</h2>
              <p className="text-indigo-100 text-sm mt-1">Results update instantly as you type</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live Calculation
            </div>
          </div>

          <div className="p-8 md:p-10 grid lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Your Inputs
              </h3>
              {calc.fields.map(field => (
                <div key={field.id} className="group">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                    {field.label} 
                    {field.percent && <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">%</span>}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium group-focus-within:text-indigo-500 transition">
                      Rs
                    </span>
                    <input 
                      type="number" 
                      value={inputs[field.id] || ''} 
                      onChange={e => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="sticky top-24">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Live Results
                </h3>
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-900/20 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex flex-col items-end pb-6 border-b border-white/10">
                      <span className="text-slate-400 text-sm font-medium mb-1 self-start">{label1}</span>
                      <span className={`text-4xl md:text-5xl font-bold tracking-tight ${res1 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {['break-even', 'cpc', 'cpa', 'revenue', 'monthly-profit', 'yearly-profit', 'currency', 'commission', 'bundle', 'markup', 'returns', 'cpm', 'discount', 'shipping', 'cod', 'tax', 'roas'].includes(s) ? '' : 'Rs. '}{formatResult(res1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm font-medium">{label2}</span>
                      <span className="text-2xl font-bold text-indigo-300">
                        {s === 'break-even' ? 'Rs. ' : ''}{formatResult(res2)}
                        {(label2.includes('Percentage') || label2.includes('ROI') || label2.includes('Margin')) && '%'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <p className="text-xs text-slate-300 text-center leading-relaxed">
                      💡 <strong className="text-white">Pro Tip:</strong> Adjust the numbers above to see how changes affect your {label1.toLowerCase()}.
                    </p>
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
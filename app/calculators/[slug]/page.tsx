'use client';

import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// --- SUPPORTED CURRENCIES ---
const CURRENCIES = [
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'JPY', name: 'Japanese Yen' },
];

// --- ALL CALCULATOR DATA WITH DETAILED INFO ---
const CALCULATORS = [
  { 
    slug: 'profit', title: 'Profit Calculator', description: 'Calculate your exact net profit after all expenses, ads, and fees.', icon: '💰', 
    fields: [{ id: 'revenue', label: 'Total Revenue', placeholder: '100000' }, { id: 'productCost', label: 'Product Cost', placeholder: '40000' }, { id: 'ads', label: 'Advertising Cost', placeholder: '15000' }, { id: 'shipping', label: 'Shipping & Packaging', placeholder: '5000' }, { id: 'fees', label: 'Platform Fees (%)', placeholder: '3' }],
    howToUse: 'Enter your total sales revenue, then subtract all costs including product cost, advertising spend, shipping fees, and platform commission percentages.',
    formula: 'Net Profit = Revenue - (Product Cost + Ads + Shipping + (Revenue × Fee %))',
    example: 'If you sell Rs. 100,000 worth of products, with Rs. 40,000 product cost, Rs. 15,000 in ads, Rs. 5,000 shipping, and 3% fees (Rs. 3,000), your net profit is Rs. 37,000.',
    whenToUse: 'Use this after every sale or monthly to track your actual profitability across all platforms.'
  },
  { 
    slug: 'roi', title: 'ROI Calculator', description: 'Measure the return on your investment to ensure your business is growing.', icon: '📈', 
    fields: [{ id: 'investment', label: 'Total Investment', placeholder: '50000' }, { id: 'return', label: 'Total Return (Revenue)', placeholder: '80000' }],
    howToUse: 'Enter the total amount you invested and the total revenue you generated from that investment.',
    formula: 'ROI = ((Return - Investment) / Investment) × 100',
    example: 'Investing Rs. 50,000 and earning Rs. 80,000 gives you Rs. 30,000 profit, which is a 60% ROI.',
    whenToUse: 'Perfect for evaluating ad campaigns, product launches, or any business investment.'
  },
  { 
    slug: 'margin', title: 'Margin Calculator', description: 'Find out your exact profit margin percentage to price your products correctly.', icon: '📊', 
    fields: [{ id: 'cost', label: 'Total Cost', placeholder: '40000' }, { id: 'revenue', label: 'Selling Price (Revenue)', placeholder: '100000' }],
    howToUse: 'Input your total cost to produce/acquire the product and your selling price.',
    formula: 'Margin = ((Revenue - Cost) / Revenue) × 100',
    example: 'Cost of Rs. 40,000 and selling price of Rs. 100,000 gives you a 60% profit margin.',
    whenToUse: 'Use before setting prices to ensure you maintain healthy margins.'
  },
  { 
    slug: 'roas', title: 'ROAS Calculator', description: 'Calculate Return on Ad Spend to optimize your ads.', icon: '🎯', 
    fields: [{ id: 'adSpend', label: 'Total Ad Spend', placeholder: '20000' }, { id: 'adRevenue', label: 'Revenue from Ads', placeholder: '100000' }],
    howToUse: 'Enter how much you spent on advertising and the revenue generated specifically from those ads.',
    formula: 'ROAS = Revenue from Ads / Ad Spend',
    example: 'Spending Rs. 20,000 on ads that generate Rs. 100,000 in sales gives you a ROAS of 5x.',
    whenToUse: 'Check this weekly for ad campaigns. A ROAS above 4x is excellent.'
  },
  { 
    slug: 'break-even', title: 'Break Even Calculator', description: 'Know exactly how many units you need to sell to cover all your costs.', icon: '⚖️', 
    fields: [{ id: 'fixedCosts', label: 'Fixed Costs (Monthly)', placeholder: '50000' }, { id: 'pricePerUnit', label: 'Selling Price per Unit', placeholder: '2000' }, { id: 'costPerUnit', label: 'Cost per Unit', placeholder: '800' }],
    howToUse: 'Enter your monthly fixed costs, selling price per unit, and cost to produce each unit.',
    formula: 'Break-Even Units = Fixed Costs / (Price per Unit - Cost per Unit)',
    example: 'With Rs. 50,000 fixed costs, selling at Rs. 2,000 with Rs. 800 cost per unit, you need to sell 42 units.',
    whenToUse: 'Essential when starting a new product line to understand your minimum sales target.'
  },
  { 
    slug: 'discount', title: 'Discount Calculator', description: 'Calculate sale prices and discount amounts for your promotions.', icon: '💸', 
    fields: [{ id: 'originalPrice', label: 'Original Price', placeholder: '2000' }, { id: 'discountPercent', label: 'Discount Percentage (%)', placeholder: '20' }],
    howToUse: 'Enter the original price and the discount percentage you want to offer.',
    formula: 'Discount Amount = Original Price × (Discount % / 100)',
    example: 'A Rs. 2,000 product with 20% discount saves customers Rs. 400, making the final price Rs. 1,600.',
    whenToUse: 'Use during sales events or clearance promotions.'
  },
  { 
    slug: 'shipping', title: 'Shipping Cost Calculator', description: 'Estimate your total shipping costs including packaging.', icon: '📦', 
    fields: [{ id: 'weight', label: 'Package Weight (kg)', placeholder: '2' }, { id: 'ratePerKg', label: 'Rate per Kg', placeholder: '150' }, { id: 'packaging', label: 'Packaging Cost', placeholder: '50' }],
    howToUse: 'Enter the weight of your package, the courier rate per kg, and your packaging material cost.',
    formula: 'Total Shipping = (Weight × Rate per Kg) + Packaging Cost',
    example: 'A 2kg package at Rs. 150/kg with Rs. 50 packaging costs Rs. 350 total to ship.',
    whenToUse: 'Calculate shipping costs before listing products.'
  },
  { 
    slug: 'cod', title: 'COD Charges Calculator', description: 'Calculate Cash on Delivery fees charged by courier companies.', icon: '💳', 
    fields: [{ id: 'orderValue', label: 'Order Value', placeholder: '5000' }, { id: 'codFee', label: 'COD Fee (Rs)', placeholder: '100' }],
    howToUse: 'Enter the order value and the COD fee in rupees charged by your courier.',
    formula: 'You Receive = Order Value - COD Fee',
    example: 'A Rs. 5,000 order with Rs. 100 COD fee means you receive Rs. 4,900.',
    whenToUse: 'Factor this into your pricing if you offer COD, as it reduces your profit margin.'
  },
  { 
    slug: 'tax', title: 'Tax Calculator', description: 'Calculate sales tax, VAT, or GST on your products.', icon: '💵', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '10000' }, { id: 'taxRate', label: 'Tax Rate (%)', placeholder: '16' }],
    howToUse: 'Enter the base amount and the applicable tax rate.',
    formula: 'Tax Amount = Amount × (Tax Rate / 100)',
    example: 'Rs. 10,000 with 16% GST adds Rs. 1,600 tax, making the total Rs. 11,600.',
    whenToUse: 'Use for invoicing, pricing, or understanding tax liabilities.'
  },
  { 
    slug: 'cpc', title: 'CPC Calculator', description: 'Calculate Cost Per Click for your advertising campaigns.', icon: '📉', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'clicks', label: 'Total Clicks', placeholder: '250' }],
    howToUse: 'Enter your total ad spend and the number of clicks received.',
    formula: 'CPC = Total Ad Cost / Total Clicks',
    example: 'Spending Rs. 5,000 for 250 clicks means you pay Rs. 20 per click.',
    whenToUse: 'Monitor CPC to compare ad platform efficiency.'
  },
  { 
    slug: 'cpa', title: 'CPA Calculator', description: 'Calculate Cost Per Acquisition to measure campaign effectiveness.', icon: '👥', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '10000' }, { id: 'conversions', label: 'Total Conversions', placeholder: '50' }],
    howToUse: 'Enter total ad spend and the number of conversions.',
    formula: 'CPA = Total Ad Cost / Total Conversions',
    example: 'Spending Rs. 10,000 to get 50 sales means each customer costs Rs. 200 to acquire.',
    whenToUse: 'Critical for understanding if your ad spend is sustainable.'
  },
  { 
    slug: 'revenue', title: 'Revenue Calculator', description: 'Project your total revenue based on units sold and average price.', icon: '💰', 
    fields: [{ id: 'unitsSold', label: 'Units Sold', placeholder: '100' }, { id: 'pricePerUnit', label: 'Price per Unit', placeholder: '2000' }],
    howToUse: 'Enter the number of units sold and the average selling price per unit.',
    formula: 'Revenue = Units Sold × Price per Unit',
    example: 'Selling 100 units at Rs. 2,000 each generates Rs. 200,000 in revenue.',
    whenToUse: 'Use for sales forecasting or monthly revenue tracking.'
  },
  { 
    slug: 'monthly-profit', title: 'Monthly Profit Calculator', description: 'Calculate your monthly profit after all recurring expenses.', icon: '📅', 
    fields: [{ id: 'monthlyRevenue', label: 'Monthly Revenue', placeholder: '300000' }, { id: 'monthlyExpenses', label: 'Monthly Expenses', placeholder: '200000' }],
    howToUse: 'Enter your total monthly revenue and all monthly expenses combined.',
    formula: 'Monthly Profit = Monthly Revenue - Monthly Expenses',
    example: 'Rs. 300,000 revenue minus Rs. 200,000 expenses equals Rs. 100,000 profit.',
    whenToUse: 'Review monthly to track business health.'
  },
  { 
    slug: 'yearly-profit', title: 'Yearly Profit Calculator', description: 'Project your annual profit and growth.', icon: '📆', 
    fields: [{ id: 'yearlyRevenue', label: 'Yearly Revenue', placeholder: '3600000' }, { id: 'yearlyExpenses', label: 'Yearly Expenses', placeholder: '2400000' }],
    howToUse: 'Enter your total annual revenue and all yearly expenses.',
    formula: 'Yearly Profit = Yearly Revenue - Yearly Expenses',
    example: 'Rs. 3.6M yearly revenue minus Rs. 2.4M expenses equals Rs. 1.2M annual profit.',
    whenToUse: 'Use for tax planning and annual reviews.'
  },
  { 
    slug: 'currency', title: 'Currency Converter', description: 'Convert between PKR, USD, EUR, and 10+ currencies with live exchange rates.', icon: '💱', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '1000' }],
    howToUse: 'Enter an amount, choose the From and To currencies, and the conversion is calculated automatically using live exchange rates. Use the swap button to reverse the conversion.',
    formula: 'Converted Amount = Amount × (Rate of To ÷ Rate of From)',
    example: 'Converting 100 USD to PKR at a live rate of 278 gives 27,800 PKR.',
    whenToUse: 'Essential for international sellers, import/export businesses, or pricing in multiple currencies.'
  },
  { 
    slug: 'commission', title: 'Commission Calculator', description: 'Calculate platform commissions (Daraz, Shopify, Amazon, etc.).', icon: '📊', 
    fields: [{ id: 'saleAmount', label: 'Sale Amount', placeholder: '5000' }, { id: 'commissionRate', label: 'Commission Rate (%)', placeholder: '5' }],
    howToUse: 'Enter the sale amount and the platform\'s commission percentage.',
    formula: 'Commission = Sale Amount × (Commission % / 100)',
    example: 'A Rs. 5,000 sale with 5% Daraz commission costs Rs. 250, you keep Rs. 4,750.',
    whenToUse: 'Compare platform fees before choosing where to sell.'
  },
  { 
    slug: 'bundle', title: 'Bundle Pricing Calculator', description: 'Calculate profitable bundle prices for product combinations.', icon: '🎁', 
    fields: [{ id: 'product1Cost', label: 'Product 1 Cost', placeholder: '500' }, { id: 'product2Cost', label: 'Product 2 Cost', placeholder: '300' }, { id: 'bundlePrice', label: 'Bundle Selling Price', placeholder: '1200' }],
    howToUse: 'Enter individual product costs and your proposed bundle selling price.',
    formula: 'Bundle Profit = Bundle Price - (Product 1 Cost + Product 2 Cost)',
    example: 'Products costing Rs. 500 + Rs. 300 = Rs. 800. Selling bundle at Rs. 1,200 gives Rs. 400 profit.',
    whenToUse: 'Create attractive bundles that increase average order value.'
  },
  { 
    slug: 'markup', title: 'Markup Calculator', description: 'Calculate the markup percentage needed to achieve your target profit.', icon: '🏷️', 
    fields: [{ id: 'cost', label: 'Product Cost', placeholder: '800' }, { id: 'sellingPrice', label: 'Selling Price', placeholder: '1200' }],
    howToUse: 'Enter your product cost and desired selling price.',
    formula: 'Markup = ((Selling Price - Cost) / Cost) × 100',
    example: 'Cost of Rs. 800 selling at Rs. 1,200 is a 50% markup.',
    whenToUse: 'Use when sourcing products to ensure you\'re marking up enough.'
  },
  { 
    slug: 'returns', title: 'Returns Calculator', description: 'Calculate the impact of product returns on your profit.', icon: '🔄', 
    fields: [{ id: 'totalOrders', label: 'Total Orders', placeholder: '100' }, { id: 'returnRate', label: 'Return Rate (%)', placeholder: '10' }, { id: 'orderValue', label: 'Average Order Value', placeholder: '2000' }],
    howToUse: 'Enter total orders, expected return rate, and average order value.',
    formula: 'Loss = (Total Orders × Return Rate %) × Average Order Value',
    example: '100 orders at Rs. 2,000 each with 10% returns means 10 returns costing Rs. 20,000.',
    whenToUse: 'Factor returns into pricing. High return categories need higher margins.'
  },
  { 
    slug: 'cpm', title: 'CPM Calculator', description: 'Calculate Cost Per Mille (thousand impressions) for brand awareness.', icon: '📢', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'impressions', label: 'Total Impressions', placeholder: '100000' }],
    howToUse: 'Enter total ad spend and total impressions delivered.',
    formula: 'CPM = (Total Cost / Impressions) × 1000',
    example: 'Rs. 5,000 for 100,000 impressions equals Rs. 50 CPM.',
    whenToUse: 'Compare brand awareness campaign efficiency across platforms.'
  },
  { 
    slug: 'percentage', title: 'Percentage Calculator', description: 'Find what percentage one amount is of a total.', icon: '📊', 
    fields: [{ id: 'amount', label: 'Amount (Part)', placeholder: '165' }, { id: 'total', label: 'Total Amount', placeholder: '5000' }],
    howToUse: 'Enter the part amount and the total amount to find the percentage.',
    formula: 'Percentage = (Amount / Total) × 100',
    example: '165 is 3.3% of 5000.',
    whenToUse: 'Use this to find profit margins, discount rates, or any percentage share.'
  }
];

export default function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const calc = CALCULATORS.find(c => c.slug === resolvedParams.slug);
  const s = calc?.slug ?? '';

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('PKR');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [rateStatus, setRateStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [manualRate, setManualRate] = useState('');

  // Fetch LIVE exchange rates automatically
  useEffect(() => {
    if (s !== 'currency') return;
    setRateStatus('loading');
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.rates) { setRates(data.rates); setRateStatus('ready'); }
        else setRateStatus('error');
      })
      .catch(() => setRateStatus('error'));
  }, [s]);

  if (!calc) notFound();

  const handleChange = (id: string, val: string) => {
    setInputs(prev => ({ ...prev, [id]: val }));
  };

  // --- CALCULATION LOGIC ---
  let res1 = 0, res2 = 0, label1 = 'Result', label2 = '';

  if (s === 'profit') { const rev = Number(inputs.revenue) || 0; const costs = (Number(inputs.productCost) || 0) + (Number(inputs.ads) || 0) + (Number(inputs.shipping) || 0); const fees = rev * ((Number(inputs.fees) || 0) / 100); res1 = rev - (costs + fees); res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Net Profit'; label2 = 'Margin'; } 
  else if (s === 'roi') { const inv = Number(inputs.investment) || 0; const ret = Number(inputs.return) || 0; res1 = ret - inv; res2 = inv > 0 ? ((ret - inv) / inv) * 100 : 0; label1 = 'Net Gain'; label2 = 'ROI'; } 
  else if (s === 'margin') { const cost = Number(inputs.cost) || 0; const rev = Number(inputs.revenue) || 0; res1 = rev - cost; res2 = rev > 0 ? ((rev - cost) / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'roas') { const spend = Number(inputs.adSpend) || 0; const rev = Number(inputs.adRevenue) || 0; res1 = rev - spend; res2 = spend > 0 ? rev / spend : 0; label1 = 'Net Profit'; label2 = 'ROAS'; } 
  else if (s === 'break-even') { const fixed = Number(inputs.fixedCosts) || 0; const price = Number(inputs.pricePerUnit) || 0; const cost = Number(inputs.costPerUnit) || 0; const contrib = price - cost; res1 = contrib > 0 ? fixed / contrib : 0; res2 = res1 * price; label1 = 'Units'; label2 = 'Revenue'; } 
  else if (s === 'discount') { const orig = Number(inputs.originalPrice) || 0; const disc = Number(inputs.discountPercent) || 0; res1 = orig * (disc / 100); res2 = orig - res1; label1 = 'Discount'; label2 = 'Final Price'; } 
  else if (s === 'shipping') { const w = Number(inputs.weight) || 0; const r = Number(inputs.ratePerKg) || 0; const p = Number(inputs.packaging) || 0; res1 = (w * r) + p; res2 = w * r; label1 = 'Total Cost'; label2 = 'Base Cost'; } 
  else if (s === 'cod') { const val = Number(inputs.orderValue) || 0; const fee = Number(inputs.codFee) || 0; res1 = fee; res2 = val - fee; label1 = 'COD Fee'; label2 = 'You Receive'; } 
  else if (s === 'tax') { const amt = Number(inputs.amount) || 0; const r = Number(inputs.taxRate) || 0; res1 = amt * (r / 100); res2 = amt + res1; label1 = 'Tax'; label2 = 'Total'; } 
  else if (s === 'cpc') { const c = Number(inputs.totalCost) || 0; const cl = Number(inputs.clicks) || 0; res1 = cl > 0 ? c / cl : 0; res2 = c; label1 = 'CPC'; label2 = 'Total Cost'; } 
  else if (s === 'cpa') { const c = Number(inputs.totalCost) || 0; const conv = Number(inputs.conversions) || 0; res1 = conv > 0 ? c / conv : 0; res2 = conv; label1 = 'CPA'; label2 = 'Conversions'; } 
  else if (s === 'revenue') { const u = Number(inputs.unitsSold) || 0; const p = Number(inputs.pricePerUnit) || 0; res1 = u * p; res2 = u; label1 = 'Revenue'; label2 = 'Units'; } 
  else if (s === 'monthly-profit') { const rev = Number(inputs.monthlyRevenue) || 0; const exp = Number(inputs.monthlyExpenses) || 0; res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'yearly-profit') { const rev = Number(inputs.yearlyRevenue) || 0; const exp = Number(inputs.yearlyExpenses) || 0; res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'currency') {
    const amt = Number(inputs.amount) || 0;
    const fromRate = rates && rates[fromCur] ? rates[fromCur] : 0;
    const toRate = rates && rates[toCur] ? rates[toCur] : 0;
    const liveRate = rateStatus === 'ready' && fromRate > 0 ? toRate / fromRate : (Number(manualRate) || 0);
    res1 = amt * liveRate;
    res2 = liveRate;
    label1 = `Converted (${toCur})`;
    label2 = `1 ${fromCur} =`;
  }
  else if (s === 'commission') { const amt = Number(inputs.saleAmount) || 0; const r = Number(inputs.commissionRate) || 0; res1 = amt * (r / 100); res2 = amt - res1; label1 = 'Fee'; label2 = 'After Fee'; } 
  else if (s === 'bundle') { const c1 = Number(inputs.product1Cost) || 0; const c2 = Number(inputs.product2Cost) || 0; const p = Number(inputs.bundlePrice) || 0; res1 = p - (c1 + c2); res2 = p > 0 ? (res1 / p) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'markup') { const c = Number(inputs.cost) || 0; const p = Number(inputs.sellingPrice) || 0; res1 = p - c; res2 = c > 0 ? ((p - c) / c) * 100 : 0; label1 = 'Profit'; label2 = 'Markup'; } 
  else if (s === 'returns') { const o = Number(inputs.totalOrders) || 0; const r = Number(inputs.returnRate) || 0; const v = Number(inputs.orderValue) || 0; const ret = o * (r / 100); res1 = ret * v; res2 = ret; label1 = 'Loss'; label2 = 'Returns'; } 
  else if (s === 'cpm') { const c = Number(inputs.totalCost) || 0; const imp = Number(inputs.impressions) || 0; res1 = imp > 0 ? (c / imp) * 1000 : 0; res2 = imp; label1 = 'CPM'; label2 = 'Impressions'; }
  else if (s === 'percentage') { 
    const amount = Number(inputs.amount) || 0; 
    const total = Number(inputs.total) || 0;
    res1 = total > 0 ? (amount / total) * 100 : 0;
    label1 = 'Percentage';
  }

  const formatResult = (val: number) => {
    if (s === 'roas' && label2 === 'ROAS') return val.toFixed(2) + 'x';
    if (s === 'break-even') return Math.ceil(val).toLocaleString();
    if (Math.abs(val) > 0 && Math.abs(val) < 0.01) return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const res1IsRupee = !['percentage', 'break-even', 'currency'].includes(s);
  const res2IsRupee = ['break-even', 'discount', 'shipping', 'cod', 'tax', 'cpc', 'commission'].includes(s);
  const res2IsPercent = (label2.includes('Margin') || label2.includes('ROI') || label2.includes('Percentage') || label2 === 'Markup');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">EC</div>
            <span className="font-bold text-lg text-slate-900">E-commerce Calculator</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-indigo-300 transition shadow-sm">
            <span>←</span> Back to Home
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
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Inputs</h3>

              {s === 'currency' ? (
                <div className="space-y-5">
                  <div className="group">
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium group-focus-within:text-indigo-500 transition">{fromCur}</span>
                      <input
                        type="number"
                        value={inputs.amount || ''}
                        onChange={e => handleChange('amount', e.target.value)}
                        placeholder="1000"
                        className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">From</label>
                      <select
                        value={fromCur}
                        onChange={e => setFromCur(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
                      >
                        {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">To</label>
                      <select
                        value={toCur}
                        onChange={e => setToCur(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
                      >
                        {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { const t = fromCur; setFromCur(toCur); setToCur(t); }}
                    className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition"
                  >
                    ⇄ Swap Currencies
                  </button>

                  {rateStatus === 'loading' && <p className="text-xs text-slate-500 text-center">⏳ Loading live exchange rates…</p>}
                  {rateStatus === 'ready' && <p className="text-xs text-green-600 text-center font-medium">🟢 Live rates loaded — conversion is automatic</p>}
                  {rateStatus === 'error' && (
                    <div>
                      <p className="text-xs text-amber-600 text-center mb-2">Live rates unavailable. Enter rate manually:</p>
                      <input
                        type="number"
                        value={manualRate}
                        onChange={e => setManualRate(e.target.value)}
                        placeholder={`1 ${fromCur} = ? ${toCur}`}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
                      />
                    </div>
                  )}
                </div>
              ) : (
                calc.fields.map(field => (
                  <div key={field.id} className="group">
                    <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium group-focus-within:text-indigo-500 transition">
                        {field.label.includes('%') ? '%' : 'Rs'}
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
                ))
              )}
            </div>

            <div className="relative">
              <div className="sticky top-24">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Live Results</h3>
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-900/20 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex flex-col items-end pb-6 border-b border-white/10">
                      <span className="text-slate-400 text-sm font-medium mb-1 self-start">{label1}</span>
                      <span className={`text-4xl md:text-5xl font-bold tracking-tight ${res1 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {s === 'percentage' ? `${formatResult(res1)}%`
                         : s === 'currency' ? `${formatResult(res1)} ${toCur}`
                         : res1IsRupee ? `Rs. ${formatResult(res1)}`
                         : formatResult(res1)}
                      </span>
                    </div>
                    {label2 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm font-medium">{label2}</span>
                        <span className="text-2xl font-bold text-indigo-300">
                          {s === 'currency' ? `${formatResult(res2)} ${toCur}`
                           : res2IsRupee ? `Rs. ${formatResult(res2)}`
                           : formatResult(res2)}
                          {res2IsPercent && '%'}
                        </span>
                      </div>
                    )}
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

        {/* Detailed Information Sections */}
        <div className="space-y-6 mt-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📖 How to Use</h3>
            <p className="text-slate-600 leading-relaxed">{calc.howToUse}</p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-indigo-900">🧮 Formula</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-indigo-800 whitespace-pre-line">{calc.formula}</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-green-900">💡 Example</h3>
            <p className="text-green-800 leading-relaxed">{calc.example}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-amber-900">🎯 When to Use</h3>
            <p className="text-amber-800 leading-relaxed">{calc.whenToUse}</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/calculators" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline text-lg">
            ← Back to All Calculators
          </Link>
        </div>
      </div>
    </main>
  );
}
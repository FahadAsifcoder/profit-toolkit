'use client';

import { useState, use } from 'react';
import Link from 'next/link';

// --- ALL CALCULATOR DATA ---
const CALCULATORS = [
  { 
    slug: 'profit', title: 'Profit Calculator', description: 'Calculate your exact net profit after all expenses.', icon: '💰', 
    fields: [{ id: 'revenue', label: 'Total Revenue', placeholder: '100000' }, { id: 'productCost', label: 'Product Cost', placeholder: '40000' }, { id: 'ads', label: 'Advertising Cost', placeholder: '15000' }, { id: 'shipping', label: 'Shipping', placeholder: '5000' }, { id: 'fees', label: 'Platform Fees (%)', placeholder: '3' }],
    howToUse: 'Enter your total sales revenue, then subtract all costs.', formula: 'Net Profit = Revenue - Total Costs', example: 'Revenue 100k - Costs 60k = 40k Profit.', whenToUse: 'Track your actual profitability.'
  },
  { 
    slug: 'roi', title: 'ROI Calculator', description: 'Measure the return on your investment.', icon: '📈', 
    fields: [{ id: 'investment', label: 'Total Investment', placeholder: '50000' }, { id: 'return', label: 'Total Return', placeholder: '80000' }],
    howToUse: 'Enter your investment and total return.', formula: 'ROI = ((Return - Investment) / Investment) × 100', example: 'Invest 50k, earn 80k = 60% ROI.', whenToUse: 'Evaluate ad campaigns or investments.'
  },
  { 
    slug: 'margin', title: 'Margin Calculator', description: 'Find out your exact profit margin percentage.', icon: '📊', 
    fields: [{ id: 'cost', label: 'Total Cost', placeholder: '40000' }, { id: 'revenue', label: 'Selling Price', placeholder: '100000' }],
    howToUse: 'Input your cost and selling price.', formula: 'Margin = ((Revenue - Cost) / Revenue) × 100', example: 'Cost 40k, Price 100k = 60% margin.', whenToUse: 'Price your products correctly.'
  },
  { 
    slug: 'roas', title: 'ROAS Calculator', description: 'Calculate Return on Ad Spend.', icon: '🎯', 
    fields: [{ id: 'adSpend', label: 'Total Ad Spend', placeholder: '20000' }, { id: 'adRevenue', label: 'Revenue from Ads', placeholder: '100000' }],
    howToUse: 'Enter ad spend and revenue generated.', formula: 'ROAS = Revenue / Ad Spend', example: 'Spend 20k, earn 100k = 5x ROAS.', whenToUse: 'Optimize your ad campaigns.'
  },
  { 
    slug: 'break-even', title: 'Break Even Calculator', description: 'Know how many units you need to sell to cover costs.', icon: '️', 
    fields: [{ id: 'fixedCosts', label: 'Fixed Costs', placeholder: '50000' }, { id: 'pricePerUnit', label: 'Price per Unit', placeholder: '2000' }, { id: 'costPerUnit', label: 'Cost per Unit', placeholder: '800' }],
    howToUse: 'Enter fixed costs, price, and cost per unit.', formula: 'Break-Even = Fixed Costs / (Price - Cost)', example: '50k fixed costs / 1200 margin = 42 units.', whenToUse: 'Understand your minimum sales target.'
  },
  { 
    slug: 'discount', title: 'Discount Calculator', description: 'Calculate sale prices and discount amounts.', icon: '💸', 
    fields: [{ id: 'originalPrice', label: 'Original Price', placeholder: '2000' }, { id: 'discountPercent', label: 'Discount (%)', placeholder: '20' }],
    howToUse: 'Enter original price and discount percentage.', formula: 'Final Price = Price - (Price × Discount%)', example: '2000 with 20% off = 1600.', whenToUse: 'Run sales and promotions.'
  },
  { 
    slug: 'shipping', title: 'Shipping Calculator', description: 'Estimate total shipping costs.', icon: '📦', 
    fields: [{ id: 'weight', label: 'Weight (kg)', placeholder: '2' }, { id: 'ratePerKg', label: 'Rate per Kg', placeholder: '150' }, { id: 'packaging', label: 'Packaging Cost', placeholder: '50' }],
    howToUse: 'Enter weight, rate, and packaging cost.', formula: 'Total = (Weight × Rate) + Packaging', example: '2kg at 150/kg + 50 = 350.', whenToUse: 'Calculate shipping before listing products.'
  },
  { 
    slug: 'cod', title: 'COD Charges Calculator', description: 'Calculate Cash on Delivery fees.', icon: '💳', 
    fields: [{ id: 'orderValue', label: 'Order Value', placeholder: '5000' }, { id: 'codPercent', label: 'COD Fee (%)', placeholder: '2' }],
    howToUse: 'Enter order value and COD fee percentage.', formula: 'COD Fee = Order Value × (Fee% / 100)', example: '5000 order at 2% = 100 fee.', whenToUse: 'Factor COD fees into your pricing.'
  },
  { 
    slug: 'tax', title: 'Tax Calculator', description: 'Calculate sales tax, VAT, or GST.', icon: '💵', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '10000' }, { id: 'taxRate', label: 'Tax Rate (%)', placeholder: '16' }],
    howToUse: 'Enter base amount and tax rate.', formula: 'Tax = Amount × (Rate / 100)', example: '10000 at 16% = 1600 tax.', whenToUse: 'Invoicing and pricing.'
  },
  { 
    slug: 'cpc', title: 'CPC Calculator', description: 'Calculate Cost Per Click.', icon: '📉', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'clicks', label: 'Total Clicks', placeholder: '250' }],
    howToUse: 'Enter ad spend and clicks.', formula: 'CPC = Cost / Clicks', example: '5000 cost / 250 clicks = 20 CPC.', whenToUse: 'Compare ad platform efficiency.'
  },
  { 
    slug: 'cpa', title: 'CPA Calculator', description: 'Calculate Cost Per Acquisition.', icon: '👥', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '10000' }, { id: 'conversions', label: 'Conversions', placeholder: '50' }],
    howToUse: 'Enter ad spend and conversions.', formula: 'CPA = Cost / Conversions', example: '10000 cost / 50 sales = 200 CPA.', whenToUse: 'Measure campaign effectiveness.'
  },
  { 
    slug: 'revenue', title: 'Revenue Calculator', description: 'Project your total revenue.', icon: '💰', 
    fields: [{ id: 'unitsSold', label: 'Units Sold', placeholder: '100' }, { id: 'pricePerUnit', label: 'Price per Unit', placeholder: '2000' }],
    howToUse: 'Enter units sold and price.', formula: 'Revenue = Units × Price', example: '100 units × 2000 = 200,000.', whenToUse: 'Sales forecasting.'
  },
  { 
    slug: 'monthly-profit', title: 'Monthly Profit', description: 'Calculate monthly profit.', icon: '', 
    fields: [{ id: 'monthlyRevenue', label: 'Monthly Revenue', placeholder: '300000' }, { id: 'monthlyExpenses', label: 'Monthly Expenses', placeholder: '200000' }],
    howToUse: 'Enter monthly revenue and expenses.', formula: 'Profit = Revenue - Expenses', example: '300k - 200k = 100k profit.', whenToUse: 'Track monthly business health.'
  },
  { 
    slug: 'yearly-profit', title: 'Yearly Profit', description: 'Project annual profit.', icon: '', 
    fields: [{ id: 'yearlyRevenue', label: 'Yearly Revenue', placeholder: '3600000' }, { id: 'yearlyExpenses', label: 'Yearly Expenses', placeholder: '2400000' }],
    howToUse: 'Enter yearly revenue and expenses.', formula: 'Profit = Revenue - Expenses', example: '3.6M - 2.4M = 1.2M profit.', whenToUse: 'Annual reviews and tax planning.'
  },
  { 
    slug: 'currency', title: 'Currency Converter', description: 'Convert between currencies.', icon: '💱', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '1000' }, { id: 'exchangeRate', label: 'Exchange Rate', placeholder: '278' }],
    howToUse: 'Enter amount and exchange rate.', formula: 'Converted = Amount × Rate', example: '1000 USD × 278 = 278,000 PKR.', whenToUse: 'International pricing.'
  },
  { 
    slug: 'commission', title: 'Commission Calculator', description: 'Calculate platform commissions.', icon: '', 
    fields: [{ id: 'saleAmount', label: 'Sale Amount', placeholder: '5000' }, { id: 'commissionRate', label: 'Commission (%)', placeholder: '5' }],
    howToUse: 'Enter sale amount and commission rate.', formula: 'Commission = Amount × (Rate / 100)', example: '5000 sale at 5% = 250 fee.', whenToUse: 'Compare platform fees.'
  },
  { 
    slug: 'bundle', title: 'Bundle Pricing', description: 'Calculate bundle prices.', icon: '🎁', 
    fields: [{ id: 'product1Cost', label: 'Product 1 Cost', placeholder: '500' }, { id: 'product2Cost', label: 'Product 2 Cost', placeholder: '300' }, { id: 'bundlePrice', label: 'Bundle Price', placeholder: '1200' }],
    howToUse: 'Enter individual costs and bundle price.', formula: 'Profit = Bundle Price - Total Cost', example: 'Cost 800, Price 1200 = 400 profit.', whenToUse: 'Create product bundles.'
  },
  { 
    slug: 'markup', title: 'Markup Calculator', description: 'Calculate markup percentage.', icon: '🏷️', 
    fields: [{ id: 'cost', label: 'Product Cost', placeholder: '800' }, { id: 'sellingPrice', label: 'Selling Price', placeholder: '1200' }],
    howToUse: 'Enter cost and selling price.', formula: 'Markup = ((Price - Cost) / Cost) × 100', example: 'Cost 800, Price 1200 = 50% markup.', whenToUse: 'Sourcing products.'
  },
  { 
    slug: 'returns', title: 'Returns Calculator', description: 'Calculate impact of returns.', icon: '🔄', 
    fields: [{ id: 'totalOrders', label: 'Total Orders', placeholder: '100' }, { id: 'returnRate', label: 'Return Rate (%)', placeholder: '10' }, { id: 'orderValue', label: 'Avg Order Value', placeholder: '2000' }],
    howToUse: 'Enter orders, return rate, and order value.', formula: 'Loss = (Orders × Return%) × Value', example: '100 orders, 10% returns, 2000 value = 20k loss.', whenToUse: 'Factor returns into pricing.'
  },
  { 
    slug: 'cpm', title: 'CPM Calculator', description: 'Calculate Cost Per Mille.', icon: '📢', 
    fields: [{ id: 'totalCost', label: 'Total Ad Cost', placeholder: '5000' }, { id: 'impressions', label: 'Impressions', placeholder: '100000' }],
    howToUse: 'Enter ad spend and impressions.', formula: 'CPM = (Cost / Impressions) × 1000', example: '5000 cost / 100k impressions = 50 CPM.', whenToUse: 'Brand awareness campaigns.'
  },
  // --- SIMPLIFIED PERCENTAGE CALCULATOR ---
  { 
    slug: 'percentage', 
    title: 'Percentage Calculator', 
    description: 'Find what percentage one amount is of a total.', 
    icon: '📊', 
    fields: [
      { id: 'amount', label: 'Amount (Part)', placeholder: '165' },
      { id: 'total', label: 'Total Amount', placeholder: '5000' }
    ],
    howToUse: 'Enter the part amount and the total amount to find the percentage.',
    formula: 'Percentage = (Amount / Total) × 100',
    example: '165 is 3.3% of 5000.',
    whenToUse: 'Use this to find profit margins, discount rates, or any percentage share.'
  }
];

export default function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const calc = CALCULATORS.find(c => c.slug === resolvedParams.slug);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  if (!calc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-slate-600">Calculator not found</p>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleChange = (id: string, val: string) => {
    setInputs(prev => ({ ...prev, [id]: val }));
  };

  let res1 = 0, res2 = 0, label1 = 'Result', label2 = '';
  const s = calc.slug;

  if (s === 'profit') { const rev = Number(inputs.revenue) || 0; const costs = (Number(inputs.productCost) || 0) + (Number(inputs.ads) || 0) + (Number(inputs.shipping) || 0); const fees = rev * ((Number(inputs.fees) || 0) / 100); res1 = rev - (costs + fees); res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Net Profit'; label2 = 'Margin'; } 
  else if (s === 'roi') { const inv = Number(inputs.investment) || 0; const ret = Number(inputs.return) || 0; res1 = ret - inv; res2 = inv > 0 ? ((ret - inv) / inv) * 100 : 0; label1 = 'Net Gain'; label2 = 'ROI'; } 
  else if (s === 'margin') { const cost = Number(inputs.cost) || 0; const rev = Number(inputs.revenue) || 0; res1 = rev - cost; res2 = rev > 0 ? ((rev - cost) / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'roas') { const spend = Number(inputs.adSpend) || 0; const rev = Number(inputs.adRevenue) || 0; res1 = rev - spend; res2 = spend > 0 ? rev / spend : 0; label1 = 'Net Profit'; label2 = 'ROAS'; } 
  else if (s === 'break-even') { const fixed = Number(inputs.fixedCosts) || 0; const price = Number(inputs.pricePerUnit) || 0; const cost = Number(inputs.costPerUnit) || 0; const contrib = price - cost; res1 = contrib > 0 ? fixed / contrib : 0; res2 = res1 * price; label1 = 'Units'; label2 = 'Revenue'; } 
  else if (s === 'discount') { const orig = Number(inputs.originalPrice) || 0; const disc = Number(inputs.discountPercent) || 0; res1 = orig * (disc / 100); res2 = orig - res1; label1 = 'Discount'; label2 = 'Final Price'; } 
  else if (s === 'shipping') { const w = Number(inputs.weight) || 0; const r = Number(inputs.ratePerKg) || 0; const p = Number(inputs.packaging) || 0; res1 = (w * r) + p; res2 = w * r; label1 = 'Total Cost'; label2 = 'Base Cost'; } 
  else if (s === 'cod') { const val = Number(inputs.orderValue) || 0; const p = Number(inputs.codPercent) || 0; res1 = val * (p / 100); res2 = val - res1; label1 = 'COD Fee'; label2 = 'After Fee'; } 
  else if (s === 'tax') { const amt = Number(inputs.amount) || 0; const r = Number(inputs.taxRate) || 0; res1 = amt * (r / 100); res2 = amt + res1; label1 = 'Tax'; label2 = 'Total'; } 
  else if (s === 'cpc') { const c = Number(inputs.totalCost) || 0; const cl = Number(inputs.clicks) || 0; res1 = cl > 0 ? c / cl : 0; res2 = c; label1 = 'CPC'; label2 = 'Total Cost'; } 
  else if (s === 'cpa') { const c = Number(inputs.totalCost) || 0; const conv = Number(inputs.conversions) || 0; res1 = conv > 0 ? c / conv : 0; res2 = conv; label1 = 'CPA'; label2 = 'Conversions'; } 
  else if (s === 'revenue') { const u = Number(inputs.unitsSold) || 0; const p = Number(inputs.pricePerUnit) || 0; res1 = u * p; res2 = u; label1 = 'Revenue'; label2 = 'Units'; } 
  else if (s === 'monthly-profit') { const rev = Number(inputs.monthlyRevenue) || 0; const exp = Number(inputs.monthlyExpenses) || 0; res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'yearly-profit') { const rev = Number(inputs.yearlyRevenue) || 0; const exp = Number(inputs.yearlyExpenses) || 0; res1 = rev - exp; res2 = rev > 0 ? (res1 / rev) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'currency') { const amt = Number(inputs.amount) || 0; const r = Number(inputs.exchangeRate) || 0; res1 = amt * r; res2 = r; label1 = 'Converted'; label2 = 'Rate'; } 
  else if (s === 'commission') { const amt = Number(inputs.saleAmount) || 0; const r = Number(inputs.commissionRate) || 0; res1 = amt * (r / 100); res2 = amt - res1; label1 = 'Fee'; label2 = 'After Fee'; } 
  else if (s === 'bundle') { const c1 = Number(inputs.product1Cost) || 0; const c2 = Number(inputs.product2Cost) || 0; const p = Number(inputs.bundlePrice) || 0; res1 = p - (c1 + c2); res2 = p > 0 ? (res1 / p) * 100 : 0; label1 = 'Profit'; label2 = 'Margin'; } 
  else if (s === 'markup') { const c = Number(inputs.cost) || 0; const p = Number(inputs.sellingPrice) || 0; res1 = p - c; res2 = c > 0 ? ((p - c) / c) * 100 : 0; label1 = 'Profit'; label2 = 'Markup'; } 
  else if (s === 'returns') { const o = Number(inputs.totalOrders) || 0; const r = Number(inputs.returnRate) || 0; const v = Number(inputs.orderValue) || 0; const ret = o * (r / 100); res1 = ret * v; res2 = ret; label1 = 'Loss'; label2 = 'Returns'; } 
  else if (s === 'cpm') { const c = Number(inputs.totalCost) || 0; const imp = Number(inputs.impressions) || 0; res1 = imp > 0 ? (c / imp) * 1000 : 0; res2 = imp; label1 = 'CPM'; label2 = 'Impressions'; }
  // --- SIMPLIFIED PERCENTAGE LOGIC ---
  else if (s === 'percentage') { 
    const amount = Number(inputs.amount) || 0; 
    const total = Number(inputs.total) || 0;
    res1 = total > 0 ? (amount / total) * 100 : 0;
    label1 = 'Percentage';
  }

  const formatResult = (val: number) => {
    if (s === 'roas' && label2 === 'ROAS') return val.toFixed(2) + 'x';
    if (s === 'break-even') return Math.ceil(val).toLocaleString();
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
            <span className="font-bold text-lg">E-commerce Calculator</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <Link href="/calculators" className="hover:text-indigo-600 transition">All Calculators</Link>
            <Link href="/#blog" className="hover:text-indigo-600 transition">Blog</Link>
            <Link href="/#about" className="hover:text-indigo-600 transition">About</Link>
          </div>
          <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">Home</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">{calc.icon}</div>
          <h1 className="text-4xl font-bold mb-3">{calc.title}</h1>
          <p className="text-slate-600 text-lg">{calc.description}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Enter Values</h3>
              {calc.fields.map(field => (
                <div key={field.id}>
                  <label className="text-sm font-medium mb-1 block">{field.label}</label>
                  <input 
                    type="number" 
                    value={inputs[field.id] || ''} 
                    onChange={e => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" 
                  />
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Results</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-slate-400">{label1}</span>
                  <span className={`text-3xl font-bold ${res1 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {s === 'percentage' ? `${formatResult(res1)}%` : 
                     ['break-even', 'cpc', 'cpa', 'revenue', 'monthly-profit', 'yearly-profit', 'currency', 'commission', 'bundle', 'markup', 'returns', 'cpm', 'discount', 'shipping', 'cod', 'tax', 'roas'].includes(s) ? '' : 'Rs. '}{formatResult(res1)}
                  </span>
                </div>
                {label2 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{label2}</span>
                    <span className="text-2xl font-bold text-indigo-300">
                      {formatResult(res2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold mb-3">How to Use</h3>
            <p className="text-slate-600 leading-relaxed">{calc.howToUse}</p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-xl font-bold mb-3 text-indigo-900">🧮 Formula</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-indigo-800">{calc.formula}</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold mb-3 text-green-900">💡 Example</h3>
            <p className="text-green-800 leading-relaxed">{calc.example}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="text-xl font-bold mb-3 text-amber-900">When to Use</h3>
            <p className="text-amber-800 leading-relaxed">{calc.whenToUse}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/calculators" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">← Back to All Calculators</Link>
        </div>
      </div>
    </main>
  );
}
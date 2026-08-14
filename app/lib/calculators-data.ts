export interface CalculatorData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  fields: { 
    id: string; 
    label: string; 
    placeholder: string; 
    deduct?: boolean; 
    percent?: boolean; 
  }[];
}

export const CALCULATORS: CalculatorData[] = [
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

export function getCalculatorBySlug(slug: string): CalculatorData | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}
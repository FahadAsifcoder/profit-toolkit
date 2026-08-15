export interface CalculatorData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  fields: { 
    id: string; 
    label: string; 
    placeholder: string; 
    percent?: boolean; 
  }[];
  howToUse?: string;
  formula?: string;
  example?: string;
  whenToUse?: string;
}

export const CALCULATORS: CalculatorData[] = [
  { 
    slug: 'profit', title: 'Profit Calculator', description: 'Calculate your exact net profit after all expenses, ads, and fees.', icon: '💰', 
    fields: [{ id: 'revenue', label: 'Total Revenue', placeholder: '100000' }, { id: 'productCost', label: 'Product Cost', placeholder: '40000' }, { id: 'ads', label: 'Advertising Cost', placeholder: '15000' }, { id: 'shipping', label: 'Shipping & Packaging', placeholder: '5000' }, { id: 'fees', label: 'Platform Fees (%)', placeholder: '3', percent: true }],
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
    fields: [{ id: 'originalPrice', label: 'Original Price', placeholder: '2000' }, { id: 'discountPercent', label: 'Discount Percentage (%)', placeholder: '20', percent: true }],
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
    fields: [{ id: 'orderValue', label: 'Order Value', placeholder: '5000' }, { id: 'codPercent', label: 'COD Fee Percentage (%)', placeholder: '2', percent: true }],
    howToUse: 'Enter the order value and the COD fee percentage charged by your courier.',
    formula: 'COD Fee = Order Value × (COD % / 100)',
    example: 'A Rs. 5,000 order with 2% COD fee costs Rs. 100 in extra charges.',
    whenToUse: 'Factor this into your pricing if you offer COD.'
  },
  { 
    slug: 'tax', title: 'Tax Calculator', description: 'Calculate sales tax, VAT, or GST on your products.', icon: '💵', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '10000' }, { id: 'taxRate', label: 'Tax Rate (%)', placeholder: '16', percent: true }],
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
    slug: 'currency', title: 'Currency Converter', description: 'Convert between PKR, USD, EUR, and other currencies.', icon: '💱', 
    fields: [{ id: 'amount', label: 'Amount', placeholder: '1000' }, { id: 'exchangeRate', label: 'Exchange Rate', placeholder: '278' }],
    howToUse: 'Enter the amount and current exchange rate.',
    formula: 'Converted Amount = Amount × Exchange Rate',
    example: 'Rs. 1,000 at 278 PKR/USD rate equals approximately $3.60 USD.',
    whenToUse: 'Essential for international sellers or import/export businesses.'
  },
  { 
    slug: 'commission', title: 'Commission Calculator', description: 'Calculate platform commissions (Daraz, Shopify, Amazon, etc.).', icon: '📊', 
    fields: [{ id: 'saleAmount', label: 'Sale Amount', placeholder: '5000' }, { id: 'commissionRate', label: 'Commission Rate (%)', placeholder: '5', percent: true }],
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
    fields: [{ id: 'totalOrders', label: 'Total Orders', placeholder: '100' }, { id: 'returnRate', label: 'Return Rate (%)', placeholder: '10', percent: true }, { id: 'orderValue', label: 'Average Order Value', placeholder: '2000' }],
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

export function getCalculatorBySlug(slug: string): CalculatorData | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}
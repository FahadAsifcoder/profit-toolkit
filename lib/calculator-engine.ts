export interface CalculatorField {
  id: string;
  label: string;
  placeholder: string;
  deduct?: boolean;
  percent?: boolean;
}

export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  fields: CalculatorField[];
}

export const PLATFORMS: PlatformConfig[] = [
  {
    id: 'shopify', name: 'Shopify', icon: '🛍️',
    fields: [
      { id: 'revenue', label: 'Total Revenue', placeholder: '100000' },
      { id: 'productCost', label: 'Product Cost', placeholder: '40000', deduct: true },
      { id: 'fbAds', label: 'Facebook Ads', placeholder: '15000', deduct: true },
      { id: 'shipping', label: 'Shipping', placeholder: '3000', deduct: true },
      { id: 'gateway', label: 'Gateway Fee (%)', placeholder: '2.9', percent: true },
    ]
  },
  {
    id: 'daraz', name: 'Daraz', icon: '🟠',
    fields: [
      { id: 'revenue', label: 'Total Revenue', placeholder: '100000' },
      { id: 'productCost', label: 'Product Cost', placeholder: '40000', deduct: true },
      { id: 'commission', label: 'Commission (%)', placeholder: '5', percent: true },
      { id: 'shipping', label: 'Shipping', placeholder: '3000', deduct: true },
      { id: 'returns', label: 'Returns', placeholder: '1500', deduct: true },
    ]
  },
  {
    id: 'whatsapp', name: 'WhatsApp', icon: '💬',
    fields: [
      { id: 'revenue', label: 'Total Revenue', placeholder: '100000' },
      { id: 'productCost', label: 'Product Cost', placeholder: '40000', deduct: true },
      { id: 'courier', label: 'Courier', placeholder: '5000', deduct: true },
      { id: 'cod', label: 'COD Charges', placeholder: '1500', deduct: true },
      { id: 'packaging', label: 'Packaging', placeholder: '2000', deduct: true },
    ]
  },
];

export function calculateProfit(platformId: string, inputs: Record<string, number>) {
  const platform = PLATFORMS.find(p => p.id === platformId);
  if (!platform) return { revenue: 0, totalExpenses: 0, netProfit: 0, profitMargin: 0, roi: 0 };

  const revenue = inputs.revenue || 0;
  let totalExpenses = 0;

  platform.fields.forEach(f => {
    if (f.deduct) totalExpenses += inputs[f.id] || 0;
    if (f.percent) totalExpenses += revenue * ((inputs[f.id] || 0) / 100);
  });

  const netProfit = revenue - totalExpenses;
  return {
    revenue,
    totalExpenses,
    netProfit,
    profitMargin: revenue > 0 ? (netProfit / revenue) * 100 : 0,
    roi: totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0,
  };
}
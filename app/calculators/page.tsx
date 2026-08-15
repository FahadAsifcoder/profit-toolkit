import Link from 'next/link';

const ALL_CALCULATORS = [
  { slug: 'profit', name: 'Profit Calculator', icon: '💰', category: 'E-Commerce', desc: 'Calculate net profit after all expenses' },
  { slug: 'margin', name: 'Margin Calculator', icon: '📊', category: 'Pricing', desc: 'Find your profit margin percentage' },
  { slug: 'roi', name: 'ROI Calculator', icon: '📈', category: 'Finance', desc: 'Measure return on investment' },
  { slug: 'roas', name: 'ROAS Calculator', icon: '🎯', category: 'Advertising', desc: 'Return on Ad Spend calculator' },
  { slug: 'break-even', name: 'Break Even Calculator', icon: '⚖️', category: 'Finance', desc: 'Know when you start profiting' },
  { slug: 'discount', name: 'Discount Calculator', icon: '💸', category: 'Pricing', desc: 'Calculate sale prices' },
  { slug: 'shipping', name: 'Shipping Calculator', icon: '📦', category: 'Logistics', desc: 'Estimate shipping costs' },
  { slug: 'cod', name: 'COD Calculator', icon: '💳', category: 'Logistics', desc: 'Cash on Delivery fees' },
  { slug: 'tax', name: 'Tax Calculator', icon: '', category: 'Finance', desc: 'Calculate sales tax & VAT' },
  { slug: 'cpc', name: 'CPC Calculator', icon: '📉', category: 'Advertising', desc: 'Cost Per Click for ads' },
  { slug: 'cpa', name: 'CPA Calculator', icon: '👥', category: 'Advertising', desc: 'Cost Per Acquisition' },
  { slug: 'cpm', name: 'CPM Calculator', icon: '📢', category: 'Advertising', desc: 'Cost Per Mille impressions' },
  { slug: 'revenue', name: 'Revenue Calculator', icon: '💰', category: 'Finance', desc: 'Project total revenue' },
  { slug: 'monthly-profit', name: 'Monthly Profit', icon: '📅', category: 'Finance', desc: 'Monthly profit tracking' },
  { slug: 'yearly-profit', name: 'Yearly Profit', icon: '📆', category: 'Finance', desc: 'Annual profit projection' },
  { slug: 'currency', name: 'Currency Converter', icon: '💱', category: 'Finance', desc: 'Convert between currencies' },
  { slug: 'commission', name: 'Commission Calculator', icon: '📊', category: 'E-Commerce', desc: 'Platform commission fees' },
  { slug: 'bundle', name: 'Bundle Pricing', icon: '🎁', category: 'Pricing', desc: 'Bundle deal calculator' },
  { slug: 'markup', name: 'Markup Calculator', icon: '🏷️', category: 'Pricing', desc: 'Calculate markup percentage' },
  { slug: 'returns', name: 'Returns Calculator', icon: '🔄', category: 'E-Commerce', desc: 'Impact of product returns' },
];

export default function AllCalculatorsPage() {
  const categories = [...new Set(ALL_CALCULATORS.map(c => c.category))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
            <span className="font-bold text-lg">E-commerce Calculator</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <Link href="/calculators" className="text-indigo-600 font-medium">All Calculators</Link>
            <Link href="/#about" className="hover:text-indigo-600 transition">About</Link>
          </div>
          <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            Home
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          All <span className="gradient-text">Free Calculators</span>
        </h1>
        <p className="text-lg text-slate-600">
          20+ powerful calculators for e-commerce sellers. 100% free, no signup required.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_CALCULATORS.filter(c => c.category === category).map(calc => (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {calc.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {calc.desc}
                      </p>
                    </div>
                    <div className="text-slate-400 group-hover:text-indigo-600 transition text-xl">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          © 2026 E-commerce Calculator. All rights reserved. 100% Free Forever.
        </div>
      </footer>
    </main>
  );
}
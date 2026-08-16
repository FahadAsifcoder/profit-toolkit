import Link from 'next/link';

const GUIDES = [
  {
    title: 'Complete Guide to E-commerce Profit Calculation',
    description: 'Learn how to accurately calculate your profits, including hidden costs and fees.',
    icon: '',
    difficulty: 'Beginner',
    time: '15 min'
  },
  {
    title: 'Mastering ROAS and CPC for Facebook Ads',
    description: 'Optimize your ad spend with proven strategies for better return on investment.',
    icon: '📊',
    difficulty: 'Intermediate',
    time: '20 min'
  },
  {
    title: 'Shipping Cost Optimization Strategies',
    description: 'Reduce your shipping costs while maintaining customer satisfaction.',
    icon: '📦',
    difficulty: 'Intermediate',
    time: '12 min'
  },
  {
    title: 'Understanding Break-Even Analysis',
    description: 'Know exactly when your business becomes profitable with break-even calculations.',
    icon: '️',
    difficulty: 'Beginner',
    time: '10 min'
  }
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
            <span className="font-bold text-lg">E-commerce Calculator</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600">← Back to Home</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Guides & Tutorials</h1>
        <p className="text-lg text-slate-600">Step-by-step guides to master e-commerce calculations and grow your business</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {GUIDES.map((guide, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{guide.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {guide.difficulty}
                    </span>
                    <span className="text-slate-500">⏱ {guide.time}</span>
                  </div>
                  <button className="mt-4 text-indigo-600 font-semibold text-sm hover:underline">
                    Read Guide →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">📚 More Guides Coming Soon!</h2>
          <p className="text-indigo-100 mb-6">We're constantly creating new guides to help you succeed. Check back regularly for updates.</p>
          <Link href="/calculators" className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
            Explore All Calculators
          </Link>
        </div>
      </section>
    </main>
  );
}
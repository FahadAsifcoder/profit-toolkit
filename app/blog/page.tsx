import Link from 'next/link';

const BLOG_POSTS = [
  {
    slug: 'maximize-ecommerce-profits',
    title: 'How to Maximize Your E-commerce Profits in 2026',
    excerpt: 'Discover proven strategies to increase your profit margins and reduce costs in your online store.',
    date: 'January 15, 2026',
    readTime: '8 min read',
    category: 'Profit Tips'
  },
  {
    slug: 'understanding-roas',
    title: 'Understanding ROAS: A Complete Guide for E-commerce',
    excerpt: 'Learn how to calculate and optimize your Return on Ad Spend for better campaign performance.',
    date: 'January 10, 2026',
    readTime: '6 min read',
    category: 'Advertising'
  },
  {
    slug: 'break-even-analysis',
    title: 'Break-Even Analysis: When Will Your Store Become Profitable?',
    excerpt: 'Master the art of break-even analysis to make informed business decisions.',
    date: 'January 5, 2026',
    readTime: '7 min read',
    category: 'Finance'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
            <span className="font-bold text-lg">E-commerce Calculator</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <Link href="/calculators" className="hover:text-indigo-600 transition">Calculators</Link>
            <Link href="/blog" className="text-indigo-600 font-medium">Blog</Link>
          </div>
          <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600">← Back to Home</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Resources</h1>
        <p className="text-lg text-slate-600">Expert tips, guides, and strategies to grow your e-commerce business</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl"></span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 hover:text-indigo-600 transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="text-indigo-600 text-sm font-semibold hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-bold mb-3">📬 Want More Tips?</h2>
          <p className="text-slate-600 mb-4">Subscribe to our newsletter for weekly e-commerce insights and calculator updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
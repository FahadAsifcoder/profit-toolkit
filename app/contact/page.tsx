import Link from 'next/link';

export default function ContactPage() {
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

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-slate-600 text-center mb-12">We'd love to hear from you! Have questions, suggestions, or need help? Get in touch.</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">📧 Email Us</h2>
            <p className="text-slate-600 mb-4">For general inquiries, support, or feedback:</p>
            <a href="mailto:contact@ecommercecalculator.com" className="text-indigo-600 font-semibold hover:underline text-lg">
              contact@ecommercecalculator.com
            </a>
            <p className="text-sm text-slate-500 mt-2">We typically respond within 24-48 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">💬 Business Inquiries</h2>
            <p className="text-slate-600 mb-4">For partnerships, collaborations, or business opportunities:</p>
            <a href="mailto:business@ecommercecalculator.com" className="text-indigo-600 font-semibold hover:underline text-lg">
              business@ecommercecalculator.com
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-bold text-lg mb-2">Is this service really free?</h3>
              <p className="text-slate-600">Yes! All our calculators are 100% free to use, forever. We believe in providing valuable tools to the e-commerce community without any cost.</p>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-bold text-lg mb-2">Is my data secure?</h3>
              <p className="text-slate-600">Absolutely. All calculations are performed locally in your browser. We do not store, collect, or transmit any of the numbers you enter into our calculators.</p>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-bold text-lg mb-2">Can I suggest a new calculator?</h3>
              <p className="text-slate-600">Yes! We welcome suggestions. Email us at contact@ecommercecalculator.com with your calculator idea and we'll consider adding it.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Do you offer custom calculator development?</h3>
              <p className="text-slate-600">Yes, we offer custom calculator development for businesses. Contact us at business@ecommercecalculator.com to discuss your requirements.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-bold mb-4">🌟 Join Our Community</h2>
          <p className="text-slate-700 mb-4">Stay updated with new calculators, e-commerce tips, and profit optimization strategies.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </main>
  );
}
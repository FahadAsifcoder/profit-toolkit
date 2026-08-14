'use client';

export default function Newsletter() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-3">Stay Ahead of the Game</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Get weekly e-commerce tips, new calculator alerts, and profit-boosting strategies delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
            Subscribe
          </button>
        </form>
        <p className="text-xs text-indigo-200 mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
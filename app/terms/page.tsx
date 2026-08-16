import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="prose max-w-none text-slate-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using E-commerce Calculator, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Use License</h2>
              <p>Permission is granted to temporarily use E-commerce Calculator for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Disclaimer</h2>
              <p>The materials on E-commerce Calculator are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Limitations</h2>
              <p>In no event shall E-commerce Calculator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Accuracy of Materials</h2>
              <p>The materials appearing on E-commerce Calculator could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at: <a href="mailto:legal@ecommercecalculator.com" className="text-indigo-600 hover:underline">legal@ecommercecalculator.com</a></p>
            </section>

            <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
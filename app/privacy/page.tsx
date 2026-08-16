import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="prose max-w-none text-slate-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
              <p>E-commerce Calculator ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our calculator tools.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
              <p><strong>Important:</strong> Our calculators run entirely in your browser. We do NOT collect, store, or transmit any of the data you enter into our calculators. All calculations are performed locally on your device.</p>
              <p className="mt-2">We may collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Anonymous usage analytics (page views, time on site) via Google Analytics</li>
                <li>Browser type and device information for website optimization</li>
                <li>IP addresses for security and fraud prevention</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
              <p>We use the limited information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Improve our website and calculator functionality</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Protect against malicious activity and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve site performance and functionality</li>
              </ul>
              <p className="mt-2">You can control cookies through your browser settings. However, disabling cookies may affect site functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Third-Party Services</h2>
              <p>We may use third-party services such as:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Google Analytics</strong> - For anonymous usage analytics</li>
                <li><strong>Vercel</strong> - For website hosting and deployment</li>
              </ul>
              <p className="mt-2">These third parties have their own privacy policies and we do not assume responsibility for their practices.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Data Security</h2>
              <p>We implement appropriate security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of analytics tracking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Children's Privacy</h2>
              <p>Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@ecommercecalculator.com" className="text-indigo-600 hover:underline">privacy@ecommercecalculator.com</a></p>
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
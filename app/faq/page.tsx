import Link from 'next/link';

const FAQS = [
  {
    question: 'Are these calculators really free to use?',
    answer: 'Yes! All our calculators are 100% free to use, forever. We believe in providing valuable tools to the e-commerce community without any cost or hidden fees.'
  },
  {
    question: 'Is my data secure when using the calculators?',
    answer: 'Absolutely. All calculations are performed locally in your browser. We do not store, collect, or transmit any of the numbers you enter. Your data never leaves your device.'
  },
  {
    question: 'Do I need to create an account to use the calculators?',
    answer: 'No account required! You can use all our calculators immediately without signing up or providing any personal information.'
  },
  {
    question: 'Can I use these calculators on my mobile phone?',
    answer: 'Yes! Our website is fully responsive and works perfectly on mobile phones, tablets, and desktop computers.'
  },
  {
    question: 'How accurate are the calculations?',
    answer: 'Our calculators use industry-standard formulas and are regularly updated. However, always verify critical business decisions with a professional accountant.'
  },
  {
    question: 'Can I suggest a new calculator?',
    answer: 'Yes! We welcome suggestions. Email us at contact@ecommercecalculator.com with your calculator idea and we will consider adding it to our toolkit.'
  },
  {
    question: 'Do you offer custom calculator development?',
    answer: 'Yes, we offer custom calculator development for businesses. Contact us at business@ecommercecalculator.com to discuss your specific requirements.'
  },
  {
    question: 'What if I find an error in a calculation?',
    answer: 'Please report any errors immediately to contact@ecommercecalculator.com. We take accuracy seriously and will investigate and fix any issues promptly.'
  }
];

export default function FAQPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600">Find answers to common questions about our calculators and services</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-3 text-slate-900">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 text-center">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-slate-600 mb-6">Can't find the answer you're looking for? We're here to help!</p>
          <Link href="/contact" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
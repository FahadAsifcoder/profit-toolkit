'use client';

import { motion } from 'framer-motion';

const features = [
  { icon: '💸', title: '100% Free Forever', desc: 'No premium plans. No hidden fees. No usage limits.' },
  { icon: '⚡', title: 'Real-Time Calculations', desc: 'Results update instantly as you type. No page reloads.' },
  { icon: '📱', title: 'Mobile First', desc: 'Beautiful experience on every device, every screen size.' },
  { icon: '🔒', title: 'No Signup Required', desc: 'Start calculating in seconds. Zero friction.' },
  { icon: '📄', title: 'PDF & CSV Export', desc: 'Download reports for your accountant or team.' },
  { icon: '🇵🇰', title: 'Pakistan Focused', desc: 'Built for PKR, local couriers, COD, and Daraz rules.' },
  { icon: '🎨', title: 'Premium UI', desc: 'Modern, clean design inspired by top SaaS products.' },
  { icon: '📊', title: 'Beautiful Analytics', desc: 'Visual charts and insights for better decisions.' },
  { icon: '🚀', title: 'Fast Performance', desc: 'Optimized for speed. Loads in milliseconds.' },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Why Sellers Love Us</h2>
        <p className="text-slate-600">Everything you need. Nothing you don't.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-slate-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
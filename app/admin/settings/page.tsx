'use client';

export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Website Settings</h1>
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Settings Panel</h2>
        <p className="text-slate-600">In a full production app, this is where you would change your site title, logo, SEO meta tags, and connect your database.</p>
      </div>
    </div>
  );
}
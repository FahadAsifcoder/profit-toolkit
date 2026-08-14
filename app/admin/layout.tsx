'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Check if already logged in this session
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Change this password!
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-200">
          <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 text-center mb-6 text-sm">Enter password to manage your website</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Password (admin123)"
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'All Posts', href: '/admin/posts', icon: '📝' },
    { name: 'Add New Post', href: '/admin/posts/new', icon: '➕' },
    { name: 'Website Settings', href: '/admin/settings', icon: '⚙️' },
    { name: 'View Website', href: '/', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm">EC</span>
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === item.href ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-slate-800 rounded-lg text-sm font-medium transition">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, drafts: 0, published: 0 });

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setStats({
      posts: posts.length,
      drafts: posts.filter((p: any) => !p.published).length,
      published: posts.filter((p: any) => p.published).length,
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Posts</div>
          <div className="text-3xl font-bold text-slate-900">{stats.posts}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Published</div>
          <div className="text-3xl font-bold text-green-600">{stats.published}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Drafts</div>
          <div className="text-3xl font-bold text-amber-600">{stats.drafts}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/posts/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium text-sm">
            ➕ Write New Post
          </a>
          <a href="/" target="_blank" className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 font-medium text-sm">
            🌐 View Live Website
          </a>
        </div>
      </div>
    </div>
  );
}
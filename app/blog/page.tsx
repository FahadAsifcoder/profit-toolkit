'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PublicBlog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const published = allPosts.filter((p: any) => p.published).reverse();
    setPosts(published);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
            <span className="font-bold text-lg">E-commerce Calculator</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600 transition font-medium">← Back to Home</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Latest <span className="gradient-text">Articles & Guides</span>
        </h1>
        <p className="text-lg text-slate-600">
          Tips, tricks, and strategies to maximize your e-commerce profits.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No published posts yet</h3>
            <p className="text-slate-600 mb-6">Go to the admin panel to write and publish your first article!</p>
            <Link href="/admin" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 font-medium inline-block">
              Go to Admin Panel
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1 whitespace-pre-line">
                    {post.content}
                  </p>
                  <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition mt-auto text-left">
                    Read Full Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
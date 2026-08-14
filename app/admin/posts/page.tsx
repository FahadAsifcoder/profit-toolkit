'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AllPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setPosts(savedPosts.reverse()); // Show newest first
  }, []);

  const deletePost = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      localStorage.setItem('blogPosts', JSON.stringify(updated));
    }
  };

  const togglePublish = (id: number) => {
    const updated = posts.map(p => {
      if (p.id === id) return { ...p, published: !p.published };
      return p;
    });
    setPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Posts</h1>
        <Link href="/admin/posts/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium text-sm">
          Add New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No posts found. <Link href="/admin/posts/new" className="text-indigo-600 hover:underline">Create your first post</Link>.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Title</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => togglePublish(post.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
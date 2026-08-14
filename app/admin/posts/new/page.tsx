'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    const newPost = {
      id: Date.now(),
      title,
      content,
      category,
      published: publish,
      createdAt: new Date().toISOString(),
    };
    
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    localStorage.setItem('blogPosts', JSON.stringify([...existingPosts, newPost]));
    
    router.push('/admin/posts');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Post</h1>
      
      <form className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-medium"
              placeholder="Enter an engaging title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option>General</option>
              <option>Profit Tips</option>
              <option>Platform Guides</option>
              <option>Marketing Strategies</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
              placeholder="Write your blog post content here..."
              required
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}
'use client';
import { useState } from 'react';

// This is a hidden admin page - only accessible via direct URL
// It won't appear in navigation or sitemap

export default function BlogPostCreator() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    const blogPost = {
      id: Date.now(),
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      published: false // Hidden until you publish
    };
    
    // Save to local storage for demo purposes
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    localStorage.setItem('blogPosts', JSON.stringify([...existingPosts, blogPost]));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setTitle('');
    setContent('');
    setCategory('General');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // In production, use proper auth
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Blog Admin</h1>
          <p className="text-gray-600 text-center mb-6">Enter admin password to access</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Blog Post Creator</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Create New Blog Post</h2>
          
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
              Blog post saved successfully! (In a real app, this would save to your database)
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>General</option>
                <option>Profit Tips</option>
                <option>Platform Guides</option>
                <option>Marketing Strategies</option>
                <option>E-commerce Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your blog post content here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Save Blog Post (Draft)
            </button>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">How This Works</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>This page is <strong>completely hidden</strong> from your public website</li>
            <li>Only accessible via direct URL: <code className="bg-gray-100 px-2 py-1 rounded">/admin/blog/new</code></li>
            <li>Posts are saved as <strong>drafts</strong> (not published yet)</li>
            <li>In a real app, you'd add publishing functionality</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
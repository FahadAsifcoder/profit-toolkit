      {/* BLOG SECTION - NOW CONNECTED TO ADMIN PANEL */}
      <section id="blog" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">From the Blog</h2>
          
          {blogPosts.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 mb-4">No published posts yet.</p>
              <Link href="/admin" className="text-indigo-600 font-medium hover:underline">Go to Admin Panel to publish your first article →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition bg-white flex flex-col">
                  <div className="h-36 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl">📰</div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-indigo-600 uppercase mb-2">{post.category}</div>
                    <h3 className="font-bold mb-2 text-lg line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4">{post.content}</p>
                    <Link href="/blog" className="text-sm text-indigo-600 font-medium mt-auto hover:underline">Read Full Article →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
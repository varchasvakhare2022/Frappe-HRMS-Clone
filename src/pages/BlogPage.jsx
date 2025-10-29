import { useState } from 'react'
import { MessageCircle, Rss } from 'lucide-react'

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Talrn')

  const posts = [
    {
      id: 1,
      title: 'Talrn updates from January 2024',
      excerpt: 'January saw some important salary setup enhancements, a mobile-friendly Job Portal, and more. Keep reading for more details!',
      author: 'Akash Tom',
      category: 'Talrn',
      comments: 1,
      thumbnail: '/blog-jan-2024.png',
    },
    {
      id: 2,
      title: 'Talrn updates from December 2023',
      excerpt: 'We begin this year with some exciting new updates including Job Portal enhancements, Interview cleanup, and Salary Component enhancements. Keep reading to find out more!',
      author: 'Akash Tom',
      category: 'Talrn',
      comments: 0,
      thumbnail: '/blog-dec-2023.png',
    },
    {
      id: 3,
      title: 'October 2023 - Introducing Talrn Version 15',
      excerpt: 'Talrn Version 15 is here! This major update targets speeding up your operations at scale.',
      author: 'Rucha Mahabal',
      category: 'Talrn',
      comments: 2,
      thumbnail: '/blog-v15.png',
    },
    {
      id: 4,
      title: 'Introducing Talrn Mobile App',
      excerpt: 'Introducing Talrn Mobile App ✨ Employee Checkins, Leaves, Claims, Advances, Salary Slips - right at your fingertips',
      author: 'Rucha Mahabal',
      category: 'Talrn',
      comments: 8,
      thumbnail: '/blog-mobile.png',
    },
    {
      id: 5,
      title: 'Talrn updates from August & September 2023',
      excerpt: 'We spent the last 2 months adding some cool new features to v15 which is set to release in Nov. Here are some small updates that went into v14 in Aug & Sept.',
      author: 'Rucha Mahabal',
      category: 'Talrn',
      comments: 0,
      thumbnail: '/blog-aug-sep-2023.png',
    },
    {
      id: 6,
      title: 'Configure, Customize and Automate your people operations with Talrn',
      excerpt: 'With a wide range of customization options available, you can set up a simple yet robust solution to manage your complex HR needs.',
      author: 'Anupama',
      category: 'Talrn',
      comments: 2,
      thumbnail: '/blog-customize.png',
    },
    {
      id: 7,
      title: 'Talrn updates from July 2023',
      excerpt: 'July marked the addition of some important UX enhancements in holidays, leaves, attendance & payroll to make your lives easier!',
      author: 'Rucha Mahabal',
      category: 'Talrn',
      comments: 0,
      thumbnail: '/blog-july-2023.png',
    },
    {
      id: 8,
      title: 'Talrn updates from May & June 2023',
      excerpt: 'May & June saw some significant performance improvements in HR and some complex edge-case handling in Shift Management',
      author: 'Rucha Mahabal',
      category: 'Talrn',
      comments: 0,
      thumbnail: '/blog-may-june-2023.png',
    },
    {
      id: 9,
      title: 'Take the hassle out of Leave Management with Talrn',
      excerpt: "Talrn's rich set of rules allows you to configure leave policies that suit your work culture. Read this blog to understand more about the dynamics of leave automation.",
      author: 'Anupama',
      category: 'Talrn',
      comments: 0,
      thumbnail: '/blog-leave.png',
    },
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="py-12 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-gray-900">BLOG</h1>
            <Rss className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-lg text-gray-600 mb-8">Stories behind the magic</p>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Title or Blogger"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Talrn">Talrn</option>
            </select>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex gap-6 pb-8 border-b border-gray-200 last:border-b-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="w-48 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Blog Preview
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {post.author} <span className="text-gray-400">in</span> {post.category}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-900">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-900">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPage


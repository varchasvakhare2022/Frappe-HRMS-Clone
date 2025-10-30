import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, MessageSquare, Plus, Filter, Trash2 } from 'lucide-react'

function FeedbackPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [feedbacks, setFeedbacks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [form, setForm] = useState({
    category: 'General',
    message: '',
    anonymous: true
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/')
    } else {
      setUser(JSON.parse(loggedInUser))
      loadFeedbacks()
    }
  }, [navigate])

  const loadFeedbacks = () => {
    const items = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    // latest first
    setFeedbacks(items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  const submitFeedback = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.message.trim()) newErrors.message = 'Please write your feedback'
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }

    const entry = {
      id: `FB-${Date.now()}`,
      category: form.category,
      message: form.message.trim(),
      createdAt: new Date().toISOString()
      // Intentionally not storing author to keep it anonymous
    }

    const items = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    localStorage.setItem('feedbacks', JSON.stringify([entry, ...items]))
    setForm({ category: 'General', message: '', anonymous: true })
    setErrors({})
    setSuccess('Feedback submitted anonymously. Thank you!')
    setTimeout(() => setSuccess(''), 2500)
    setShowForm(false)
    loadFeedbacks()
  }

  const clearAllFeedback = () => {
    if (!user || !(user.role?.toLowerCase().includes('admin') || user.role?.toLowerCase().includes('manager'))) return
    if (!confirm('Delete all feedback entries?')) return
    localStorage.setItem('feedbacks', JSON.stringify([]))
    loadFeedbacks()
  }

  if (!user) return null

  const isAdminOrManager = user.role?.toLowerCase().includes('admin') || user.role?.toLowerCase().includes('manager')
  const categories = ['All', 'General', 'HR & Policies', 'Work Environment', 'Compensation', 'Management', 'Product/Process', 'Other']
  const filtered = categoryFilter === 'All' ? feedbacks : feedbacks.filter(f => f.category === categoryFilter)

  const formatDateTime = (iso) => new Date(iso).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button 
                onClick={() => navigate('/dashboard')}
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium">Anonymous Feedback</span>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Anonymous Feedback</h1>
              <p className="text-gray-600">Share your feedback freely. Your identity is not collected.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdminOrManager && feedbacks.length > 0 && (
              <button
                onClick={clearAllFeedback}
                className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-100 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Feedback
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Filter by category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="ml-auto text-sm text-gray-500">{filtered.length} feedback</span>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No feedback yet. Be the first to share.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Feedback
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(item => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDateTime(item.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Submit Anonymous Feedback</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <form onSubmit={submitFeedback} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  rows={6}
                  placeholder="Write your feedback... (No personal info required)"
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                {success && <span className="text-sm text-green-700">{success}</span>}
                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackPage



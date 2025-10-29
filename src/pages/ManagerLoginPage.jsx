import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import managerUsers from '../data/managerUsers.json'

function ManagerLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Manager users from JSON file
  const allowedUsers = managerUsers

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setError('Email is required')
      return
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Validate password
    if (!password) {
      setError('Password is required')
      return
    }

    // Check if user is registered
    const user = allowedUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (!user) {
      setError('Access denied. Manager credentials required.')
      return
    }

    // Check password
    if (user.password !== password) {
      setError('Incorrect password. Please try again.')
      return
    }

    // User found and password correct - log them in
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Manager Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="/talrn-logo.jpeg" 
              alt="Talrn" 
              className="w-14 h-14 object-contain bg-white rounded-xl p-2"
            />
            <span className="text-white text-2xl font-bold">Talrn</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Manager Portal
          </h2>
          
          <p className="text-blue-50 text-lg leading-relaxed mb-8">
            Manage your team effectively with comprehensive oversight tools. 
            Review requests, track team performance, and access detailed reports.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white text-sm mb-2 font-medium">Manager Features</p>
            <ul className="text-blue-50 text-sm space-y-1">
              <li>• Approve leave & expense requests</li>
              <li>• Team attendance tracking</li>
              <li>• Performance reviews & appraisals</li>
              <li>• Team analytics & reports</li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="relative z-10 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to portal selection</span>
        </button>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img 
              src="/talrn-logo.jpeg" 
              alt="Talrn" 
              className="w-16 h-16 object-contain mb-3"
            />
            <h2 className="text-xl font-bold text-blue-600">Manager Portal</h2>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manager Login
            </h1>
            <p className="text-gray-500">
              Sign in to manage your team
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="manager@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-6"
            >
              Sign In as Manager
            </button>
          </form>

          {/* Mobile Back Button */}
          <button
            onClick={() => navigate('/')}
            className="lg:hidden mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to portal selection</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManagerLoginPage


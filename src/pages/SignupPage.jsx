import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Allowed users for login - Admin and Employee roles only
  const allowedUsers = [
    {
      email: 'vk.varchasva@gmail.com',
      name: 'Varchasva Khare',
      role: 'Admin',
      password: 'admin123',
    },
    {
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'Admin',
      password: 'admin123',
    },
    {
      email: 'employee@test.com',
      name: 'John Doe',
      role: 'Employee',
      password: 'employee123',
    },
    {
      email: 'test@example.com',
      name: 'Test Employee',
      role: 'Employee',
      password: 'test123',
    },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login clicked:', email)
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
      setError('User not found. Please check your email address.')
      return
    }

    // Check password
    if (user.password !== password) {
      setError('Incorrect password. Please try again.')
      return
    }

    // User found and password correct - log them in
    localStorage.setItem('user', JSON.stringify(user))
    console.log('Login successful:', user)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12" style={{ maxWidth: '520px' }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/talrn-logo.jpeg" 
            alt="Talrn Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ lineHeight: '1.3' }}>
          Welcome Back
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Login"
              className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Password"
              className="w-full px-4 py-3.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full px-6 py-3.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-200 text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage


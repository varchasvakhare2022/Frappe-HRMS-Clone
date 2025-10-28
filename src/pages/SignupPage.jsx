import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="w-full" style={{ maxWidth: '400px' }}>
        {/* Logo */}
        <div className="mb-5">
          <svg fill="none" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
            <path d="M36.9286 0.5H15.0714C7.02385 0.5 0.5 7.02385 0.5 15.0714V36.9286C0.5 44.9762 7.02385 51.5 15.0714 51.5H36.9286C44.9762 51.5 51.5 44.9762 51.5 36.9286V15.0714C51.5 7.02385 44.9762 0.5 36.9286 0.5Z" fill="#06B58B"></path>
            <path d="M15.9638 40.5715L13.5049 37.8758C16.9474 34.7612 21.3734 33.0308 25.9816 33.0308C30.5898 33.0308 35.0342 34.743 38.4585 37.8758L35.9995 40.5715C33.2309 38.0579 29.6791 36.6736 25.9816 36.6736C22.2841 36.6736 18.7142 38.0579 15.9456 40.5715H15.9638Z" fill="white"></path>
            <path d="M27.6756 11.4287H17.002V15.0716H27.6756C29.6792 15.0716 31.3185 16.7109 31.3185 18.7144V22.1023C31.3185 24.1058 29.6792 25.7451 27.6756 25.7451H24.2877C22.2841 25.7451 20.6448 24.1058 20.6448 22.1023V19.8072H17.002V22.1023C17.002 26.1276 20.2623 29.388 24.2877 29.388H27.6756C31.701 29.388 34.9613 26.1276 34.9613 22.1023V18.7144C34.9613 14.6891 31.701 11.4287 27.6756 11.4287Z" fill="white"></path>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 mb-1.5" style={{ lineHeight: '1.4' }}>
          Log in to your account
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-5" style={{ lineHeight: '1.5' }}>
          Enter your email and password to access Frappe HR
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="johndoe@mail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-3 text-xs text-red-500">{error}</p>
          )}

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all duration-200 text-sm mb-4"
          >
            Log in
          </button>
        </form>

        {/* Info about test accounts */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs font-semibold text-blue-900 mb-2">Test Accounts:</p>
          <div className="space-y-1">
            <div>
              <p className="text-xs text-blue-800">Admin: admin@test.com</p>
              <p className="text-xs text-blue-600">Password: admin123</p>
            </div>
            <div>
              <p className="text-xs text-blue-800">Employee: employee@test.com</p>
              <p className="text-xs text-blue-600">Password: employee123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage


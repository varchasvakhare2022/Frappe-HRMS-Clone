import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Key } from 'lucide-react'

function SignupPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signup') // 'signup' or 'login'
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // Allowed users for login
  const allowedUsers = [
    {
      email: 'vk.varchasva@gmail.com',
      name: 'Varchasva Khare',
    },
  ]

  const handleGoogleAction = () => {
    console.log(`Google ${mode} clicked`)
    // Handle Google OAuth
  }

  const handlePasswordLogin = () => {
    console.log('Continue with password clicked')
    // Handle password login
  }

  const handleEmailSignup = (e) => {
    e.preventDefault()
    console.log('Email signup clicked:', email)
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

    // Handle email signup
    console.log('Valid email:', email)
  }

  const handleSendVerification = (e) => {
    e.preventDefault()
    console.log('Send verification code clicked:', email)
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

    // Check if user is registered
    const user = allowedUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (user) {
      // User found - log them in
      localStorage.setItem('user', JSON.stringify(user))
      console.log('Login successful:', user)
      navigate('/dashboard')
    } else {
      // User not found
      setError('User is not registered. Please sign up first.')
    }
  }

  const toggleMode = () => {
    setMode(mode === 'signup' ? 'login' : 'signup')
    setEmail('')
    setError('')
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

        {mode === 'signup' ? (
          <>
            {/* SIGNUP MODE */}
            {/* Heading */}
            <h1 className="text-xl font-bold text-gray-900 mb-1.5" style={{ lineHeight: '1.4' }}>
              Sign up to create your Frappe HR site
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-5" style={{ lineHeight: '1.5' }}>
              Get started and explore the easiest way to use Frappe HR
            </p>

            {/* Continue with Google Button */}
            <button 
              onClick={handleGoogleAction}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 mb-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium text-sm">Continue with Google</span>
            </button>

            {/* Email Form */}
            <form onSubmit={handleEmailSignup}>
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
                  className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm`}
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
              </div>

              {/* Sign up Button */}
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all duration-200 text-sm mb-3"
              >
                Sign up with email
              </button>
            </form>

            {/* Terms & Policies */}
            <p className="text-xs text-gray-600 mb-2.5" style={{ lineHeight: '1.5' }}>
              By signing up, you agree to our{' '}
              <a href="#" className="text-gray-900 underline hover:text-gray-700">
                Terms & Policies
              </a>
            </p>

            {/* Login Link */}
            <p className="text-xs text-gray-600" style={{ lineHeight: '1.5' }}>
              Already have an account?{' '}
              <button 
                onClick={toggleMode}
                className="text-gray-900 underline hover:text-gray-700 font-medium"
              >
                Log in.
              </button>
            </p>
          </>
        ) : (
          <>
            {/* LOGIN MODE */}
            {/* Heading */}
            <h1 className="text-xl font-bold text-gray-900 mb-1.5" style={{ lineHeight: '1.4' }}>
              Log in to your account to start using Frappe HR
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-5" style={{ lineHeight: '1.5' }}>
              Get started and explore the easiest way to use Frappe HR
            </p>

            {/* Continue with Password Button */}
            <button 
              onClick={handlePasswordLogin}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 mb-3"
            >
              <Key className="w-4 h-4 text-gray-700" />
              <span className="text-gray-700 font-medium text-sm">Continue with password</span>
            </button>

            {/* Continue with Google Button */}
            <button 
              onClick={handleGoogleAction}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 mb-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium text-sm">Continue with Google</span>
            </button>

            {/* Email Form */}
            <form onSubmit={handleSendVerification}>
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
                  className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm`}
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
              </div>

              {/* Send Verification Button */}
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all duration-200 text-sm mb-3"
              >
                Send verification code
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-xs text-gray-600" style={{ lineHeight: '1.5' }}>
              New member?{' '}
              <button 
                onClick={toggleMode}
                className="text-gray-900 underline hover:text-gray-700 font-medium"
              >
                Create a new account.
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default SignupPage


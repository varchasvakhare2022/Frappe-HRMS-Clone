import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, UserPlus, Home, Trash2, Eye, EyeOff } from 'lucide-react'
import managerUsersData from '../data/managerUsers.json'
import employeeUsersData from '../data/employeeUsers.json'

function UserManagementPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('managers')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Manager'
  })
  
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  // Users state
  const [managers, setManagers] = useState([])
  const [employees, setEmployees] = useState([])

  // Load users from JSON and localStorage
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    // Load from JSON
    const jsonManagers = managerUsersData || []
    const jsonEmployees = employeeUsersData || []
    
    // Load from localStorage
    const localManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
    const localEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
    
    // Merge and mark which are custom
    setManagers([
      ...jsonManagers.map(u => ({ ...u, isCustom: false })),
      ...localManagers.map(u => ({ ...u, isCustom: true }))
    ])
    
    setEmployees([
      ...jsonEmployees.map(u => ({ ...u, isCustom: false })),
      ...localEmployees.map(u => ({ ...u, isCustom: true }))
    ])
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    } else {
      // Check if email already exists
      const allUsers = [...managers, ...employees]
      if (allUsers.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
        newErrors.email = 'Email already exists'
      }
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role
    }
    
    // Save to localStorage based on role
    if (formData.role === 'Manager') {
      const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
      customManagers.push(newUser)
      localStorage.setItem('customManagers', JSON.stringify(customManagers))
    } else {
      const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
      customEmployees.push(newUser)
      localStorage.setItem('customEmployees', JSON.stringify(customEmployees))
    }
    
    // Show success message
    setSuccessMessage(`${formData.role} account created successfully!`)
    setTimeout(() => setSuccessMessage(''), 3000)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      role: formData.role
    })
    setErrors({})
    setShowAddForm(false)
    
    // Reload users
    loadUsers()
  }

  const handleDelete = (user) => {
    if (!user.isCustom) {
      alert('Cannot delete default users. Only custom users can be deleted.')
      return
    }
    
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) {
      return
    }
    
    if (user.role === 'Manager') {
      const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
      const filtered = customManagers.filter(u => u.email !== user.email)
      localStorage.setItem('customManagers', JSON.stringify(filtered))
    } else {
      const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
      const filtered = customEmployees.filter(u => u.email !== user.email)
      localStorage.setItem('customEmployees', JSON.stringify(filtered))
    }
    
    loadUsers()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const currentUsers = activeTab === 'managers' ? managers : employees

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
              <span className="text-gray-900 font-medium">User Management</span>
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Add and manage manager and employee accounts</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {successMessage}
          </div>
        )}

        {/* Add User Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="w-5 h-5" />
            {showAddForm ? 'Cancel' : 'Add New User'}
          </button>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New User Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Role *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="Manager"
                      checked={formData.role === 'Manager'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-700">Manager</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="Employee"
                      checked={formData.role === 'Employee'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-700">Employee</span>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 6 characters)"
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setFormData({ name: '', email: '', password: '', role: 'Manager' })
                    setErrors({})
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('managers')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'managers'
                    ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Managers ({managers.length})
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'employees'
                    ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Employees ({employees.length})
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="p-6">
            {currentUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No {activeTab} found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'Manager' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-teal-100 text-teal-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            user.isCustom 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.isCustom ? 'Custom' : 'Default'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {user.isCustom ? (
                            <button
                              onClick={() => handleDelete(user)}
                              className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage


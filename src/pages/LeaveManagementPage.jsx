import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Calendar, Plus, Check, X, Clock, AlertCircle, CheckCircle, XCircle
} from 'lucide-react'

function LeaveManagementPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [activeTab, setActiveTab] = useState('my-leaves')
  
  // Form state
  const [formData, setFormData] = useState({
    leaveType: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  })
  
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  // Leave requests state
  const [myLeaves, setMyLeaves] = useState([])
  const [teamLeaves, setTeamLeaves] = useState([])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [navigate])

  useEffect(() => {
    if (user) {
      loadLeaves()
    }
  }, [user])

  const loadLeaves = () => {
    const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]')
    
    // Filter my leave requests
    const userLeaves = allLeaves.filter(leave => leave.employeeEmail === user.email)
    setMyLeaves(userLeaves)
    
    // Filter team leaves (for managers and admins)
    if (isAdmin || isManager) {
      let teamLeavesFiltered = []
      
      if (isAdmin) {
        // Admins see all leave requests
        teamLeavesFiltered = allLeaves.filter(leave => leave.employeeEmail !== user.email)
      } else if (isManager) {
        // Managers see only employee leave requests (not other managers' requests)
        teamLeavesFiltered = allLeaves.filter(leave => 
          leave.employeeEmail !== user.email && 
          leave.employeeRole === 'Employee'
        )
      }
      
      setTeamLeaves(teamLeavesFiltered)
    }
  }

  if (!user) {
    return null
  }

  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')

  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Casual Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Compensatory Leave',
    'Unpaid Leave'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date cannot be before start date'
      }
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required'
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Please provide a detailed reason (min 10 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const newLeave = {
      id: Date.now().toString(),
      employeeName: user.name,
      employeeEmail: user.email,
      employeeRole: user.role,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: calculateDays(formData.startDate, formData.endDate),
      reason: formData.reason,
      status: 'Pending',
      appliedOn: new Date().toISOString(),
      approvedBy: null,
      approvedOn: null
    }
    
    // Save to localStorage
    const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]')
    allLeaves.push(newLeave)
    localStorage.setItem('leaveRequests', JSON.stringify(allLeaves))
    
    // Show success message
    setSuccessMessage('Leave application submitted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    
    // Reset form
    setFormData({
      leaveType: 'Annual Leave',
      startDate: '',
      endDate: '',
      reason: ''
    })
    setErrors({})
    setShowApplyForm(false)
    
    // Reload leaves
    loadLeaves()
  }

  const handleApprove = (leaveId) => {
    const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]')
    const updatedLeaves = allLeaves.map(leave => {
      if (leave.id === leaveId) {
        return {
          ...leave,
          status: 'Approved',
          approvedBy: user.name,
          approvedOn: new Date().toISOString()
        }
      }
      return leave
    })
    
    localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves))
    loadLeaves()
  }

  const handleReject = (leaveId) => {
    const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]')
    const updatedLeaves = allLeaves.map(leave => {
      if (leave.id === leaveId) {
        return {
          ...leave,
          status: 'Rejected',
          approvedBy: user.name,
          approvedOn: new Date().toISOString()
        }
      }
      return leave
    })
    
    localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves))
    loadLeaves()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700'
    }
    
    const icons = {
      Pending: <Clock className="w-3 h-3" />,
      Approved: <CheckCircle className="w-3 h-3" />,
      Rejected: <XCircle className="w-3 h-3" />
    }
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    )
  }

  const canApprove = (leave) => {
    // Admins can approve all leaves
    if (isAdmin) return true
    
    // Managers can only approve employee leaves (not other managers')
    if (isManager && leave.employeeRole === 'Employee') return true
    
    return false
  }

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
              <span className="text-gray-900 font-medium">Leave Management</span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
                <p className="text-gray-600">Apply for leave and track your requests</p>
              </div>
            </div>

            <button
              onClick={() => setShowApplyForm(!showApplyForm)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              {showApplyForm ? 'Cancel' : 'Apply for Leave'}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Apply Leave Form */}
        {showApplyForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type *
                </label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {leaveTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
                </div>
              </div>

              {/* Show calculated days */}
              {formData.startDate && formData.endDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Duration:</strong> {calculateDays(formData.startDate, formData.endDate)} day(s)
                  </p>
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Please provide a detailed reason for your leave"
                  rows={4}
                  className={`w-full px-4 py-2 border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Submit Leave Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowApplyForm(false)
                    setFormData({ leaveType: 'Annual Leave', startDate: '', endDate: '', reason: '' })
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
                onClick={() => setActiveTab('my-leaves')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'my-leaves'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Leave Requests ({myLeaves.length})
              </button>
              {(isAdmin || isManager) && (
                <button
                  onClick={() => setActiveTab('team-leaves')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'team-leaves'
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Team Leave Requests ({teamLeaves.length})
                </button>
              )}
            </div>
          </div>

          {/* Leave Requests Table */}
          <div className="p-6">
            {activeTab === 'my-leaves' ? (
              // My Leaves
              myLeaves.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No leave requests found</p>
                  <p className="text-sm text-gray-500 mt-1">Click "Apply for Leave" to submit a request</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Leave Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Start Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">End Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Days</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approved By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myLeaves.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)).map((leave) => (
                        <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{leave.leaveType}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{formatDate(leave.startDate)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{formatDate(leave.endDate)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{leave.days}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{leave.reason}</td>
                          <td className="py-3 px-4">{getStatusBadge(leave.status)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{leave.approvedBy || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              // Team Leaves
              teamLeaves.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No team leave requests found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Leave Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Start Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">End Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Days</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamLeaves.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)).map((leave) => (
                        <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{leave.employeeName}</p>
                              <p className="text-xs text-gray-500">{leave.employeeRole}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">{leave.leaveType}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{formatDate(leave.startDate)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{formatDate(leave.endDate)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{leave.days}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">
                            <div className="truncate" title={leave.reason}>{leave.reason}</div>
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(leave.status)}</td>
                          <td className="py-3 px-4">
                            {leave.status === 'Pending' && canApprove(leave) ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleApprove(leave.id)}
                                  className="text-green-600 hover:text-green-700 p-1.5 hover:bg-green-50 rounded transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(leave.id)}
                                  className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">
                                {leave.status !== 'Pending' ? 'Processed' : 'No permission'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveManagementPage

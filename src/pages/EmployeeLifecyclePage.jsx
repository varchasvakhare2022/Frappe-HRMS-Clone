import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, UserPlus, GitBranch, FileCheck, AlertTriangle, 
  UserCheck, X, CheckCircle, XCircle, Edit, Eye, ArrowRight,
  Plus, Star, Mail, MapPin, User
} from 'lucide-react'
import employeeUsersData from '../data/employeeUsers.json'
import managerUsersData from '../data/managerUsers.json'

function EmployeeLifecyclePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [selectedSection, setSelectedSection] = useState('directory')
  
  // Data states
  const [employees, setEmployees] = useState([])
  const [onboardingList, setOnboardingList] = useState([])
  const [promotionsTransfers, setPromotionsTransfers] = useState([])
  const [grievances, setGrievances] = useState([])
  const [exitInterviews, setExitInterviews] = useState([])
  const [settlements, setSettlements] = useState([])
  
  // Modal states
  const [showOnboardingForm, setShowOnboardingForm] = useState(false)
  const [showPromotionForm, setShowPromotionForm] = useState(false)
  const [showGrievanceForm, setShowGrievanceForm] = useState(false)
  const [showExitForm, setShowExitForm] = useState(false)
  
  // Form states
  const [onboardingForm, setOnboardingForm] = useState({
    employeeName: '',
    designation: '',
    department: '',
    joinDate: '',
    totalTasks: 10
  })
  
  const [promotionForm, setPromotionForm] = useState({
    employeeName: '',
    type: 'Promotion',
    from: '',
    to: '',
    department: '',
    effectiveDate: '',
    salaryChange: ''
  })
  
  const [grievanceForm, setGrievanceForm] = useState({
    category: 'Workplace Issue',
    priority: 'Medium',
    description: '',
    anonymous: false
  })
  
  const [exitForm, setExitForm] = useState({
    employeeName: '',
    designation: '',
    lastDay: '',
    reason: '',
    interviewDate: ''
  })
  
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

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
      loadData()
    }
  }, [user])

  const loadData = () => {
    // Load all employees from JSON and localStorage
    const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
    const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
    
    const allEmployees = [
      ...employeeUsersData.map(emp => ({ ...emp, source: 'default', status: 'Active' })),
      ...managerUsersData.map(mgr => ({ ...mgr, source: 'default', status: 'Active' })),
      ...customEmployees.map(emp => ({ ...emp, source: 'custom', status: 'Active' })),
      ...customManagers.map(mgr => ({ ...mgr, source: 'custom', status: 'Active' }))
    ]
    
    setEmployees(allEmployees)
    
    // Load lifecycle data from localStorage
    setOnboardingList(JSON.parse(localStorage.getItem('onboardingList') || '[]'))
    setPromotionsTransfers(JSON.parse(localStorage.getItem('promotionsTransfers') || '[]'))
    setGrievances(JSON.parse(localStorage.getItem('grievances') || '[]'))
    setExitInterviews(JSON.parse(localStorage.getItem('exitInterviews') || '[]'))
    setSettlements(JSON.parse(localStorage.getItem('settlements') || '[]'))
  }

  const handleOnboardingSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!onboardingForm.employeeName.trim()) newErrors.employeeName = 'Employee name is required'
    if (!onboardingForm.designation.trim()) newErrors.designation = 'Designation is required'
    if (!onboardingForm.department.trim()) newErrors.department = 'Department is required'
    if (!onboardingForm.joinDate) newErrors.joinDate = 'Join date is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const newOnboarding = {
      id: `ONB-${Date.now()}`,
      employeeName: onboardingForm.employeeName,
      designation: onboardingForm.designation,
      department: onboardingForm.department,
      joinDate: onboardingForm.joinDate,
      status: 'Pending',
      progress: 0,
      completedTasks: 0,
      totalTasks: parseInt(onboardingForm.totalTasks),
      createdAt: new Date().toISOString()
    }
    
    const updatedList = [...onboardingList, newOnboarding]
    localStorage.setItem('onboardingList', JSON.stringify(updatedList))
    setOnboardingList(updatedList)
    
    setSuccessMessage('Onboarding process created successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    resetOnboardingForm()
  }

  const handlePromotionSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!promotionForm.employeeName.trim()) newErrors.employeeName = 'Employee name is required'
    if (!promotionForm.from.trim()) newErrors.from = 'Current position is required'
    if (!promotionForm.to.trim()) newErrors.to = 'New position is required'
    if (!promotionForm.effectiveDate) newErrors.effectiveDate = 'Effective date is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const newPromotion = {
      id: `PT-${Date.now()}`,
      ...promotionForm,
      status: 'Pending',
      createdBy: user.name,
      createdAt: new Date().toISOString()
    }
    
    const updatedList = [...promotionsTransfers, newPromotion]
    localStorage.setItem('promotionsTransfers', JSON.stringify(updatedList))
    setPromotionsTransfers(updatedList)
    
    setSuccessMessage(`${promotionForm.type} request created successfully!`)
    setTimeout(() => setSuccessMessage(''), 3000)
    resetPromotionForm()
  }

  const handleGrievanceSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!grievanceForm.description.trim()) newErrors.description = 'Description is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const newGrievance = {
      id: `GRV-${Date.now()}`,
      employeeName: grievanceForm.anonymous ? 'Anonymous' : user.name,
      category: grievanceForm.category,
      priority: grievanceForm.priority,
      description: grievanceForm.description,
      status: 'Acknowledged',
      submittedDate: new Date().toISOString().split('T')[0],
      assignedTo: 'HR Department'
    }
    
    const updatedList = [...grievances, newGrievance]
    localStorage.setItem('grievances', JSON.stringify(updatedList))
    setGrievances(updatedList)
    
    setSuccessMessage('Grievance submitted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    resetGrievanceForm()
  }

  const handleExitSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!exitForm.employeeName.trim()) newErrors.employeeName = 'Employee name is required'
    if (!exitForm.designation.trim()) newErrors.designation = 'Designation is required'
    if (!exitForm.lastDay) newErrors.lastDay = 'Last working day is required'
    if (!exitForm.interviewDate) newErrors.interviewDate = 'Interview date is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const newExit = {
      id: `EXIT-${Date.now()}`,
      ...exitForm,
      status: 'Scheduled',
      rating: null,
      scheduledBy: user.name,
      createdAt: new Date().toISOString()
    }
    
    const updatedList = [...exitInterviews, newExit]
    localStorage.setItem('exitInterviews', JSON.stringify(updatedList))
    setExitInterviews(updatedList)
    
    setSuccessMessage('Exit interview scheduled successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    resetExitForm()
  }

  const updateOnboardingProgress = (id, completedTasks) => {
    const updatedList = onboardingList.map(item => {
      if (item.id === id) {
        const progress = Math.round((completedTasks / item.totalTasks) * 100)
        const status = progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Pending'
        return { ...item, completedTasks, progress, status }
      }
      return item
    })
    localStorage.setItem('onboardingList', JSON.stringify(updatedList))
    setOnboardingList(updatedList)
  }

  const updatePromotionStatus = (id, newStatus) => {
    const updatedList = promotionsTransfers.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    localStorage.setItem('promotionsTransfers', JSON.stringify(updatedList))
    setPromotionsTransfers(updatedList)
  }

  const updateGrievanceStatus = (id, newStatus) => {
    const updatedList = grievances.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    localStorage.setItem('grievances', JSON.stringify(updatedList))
    setGrievances(updatedList)
  }

  const updateExitStatus = (id, newStatus, rating = null) => {
    const updatedList = exitInterviews.map(item =>
      item.id === id ? { ...item, status: newStatus, rating } : item
    )
    localStorage.setItem('exitInterviews', JSON.stringify(updatedList))
    setExitInterviews(updatedList)
  }

  const resetOnboardingForm = () => {
    setOnboardingForm({
      employeeName: '',
      designation: '',
      department: '',
      joinDate: '',
      totalTasks: 10
    })
    setShowOnboardingForm(false)
    setErrors({})
  }

  const resetPromotionForm = () => {
    setPromotionForm({
      employeeName: '',
      type: 'Promotion',
      from: '',
      to: '',
      department: '',
      effectiveDate: '',
      salaryChange: ''
    })
    setShowPromotionForm(false)
    setErrors({})
  }

  const resetGrievanceForm = () => {
    setGrievanceForm({
      category: 'Workplace Issue',
      priority: 'Medium',
      description: '',
      anonymous: false
    })
    setShowGrievanceForm(false)
    setErrors({})
  }

  const resetExitForm = () => {
    setExitForm({
      employeeName: '',
      designation: '',
      lastDay: '',
      reason: '',
      interviewDate: ''
    })
    setShowExitForm(false)
    setErrors({})
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-700',
      Probation: 'bg-yellow-100 text-yellow-700',
      Inactive: 'bg-gray-100 text-gray-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
      Acknowledged: 'bg-blue-100 text-blue-700',
      'Under Investigation': 'bg-orange-100 text-orange-700',
      Resolved: 'bg-green-100 text-green-700',
      Scheduled: 'bg-blue-100 text-blue-700',
      Paid: 'bg-green-100 text-green-700'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const styles = {
      High: 'bg-red-100 text-red-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      Low: 'bg-green-100 text-green-700'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[priority] || 'bg-gray-100 text-gray-700'}`}>
        {priority} Priority
      </span>
    )
  }

  const renderRating = (rating) => {
    if (!rating) return <span className="text-sm text-gray-500">Not rated</span>
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    )
  }

  if (!user) return null

  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')
  const canManage = isAdmin || isManager

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
              <span className="text-gray-900 font-medium">Employee Lifecycle</span>
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Lifecycle</h1>
              <p className="text-gray-600">From onboarding to exits - manage the complete employee journey</p>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setSelectedSection('directory')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                selectedSection === 'directory' ? 'border-orange-600' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <UserPlus className="w-8 h-8 text-orange-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Employee Directory</div>
                <div className="text-sm text-gray-500">{employees.length} employees</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedSection('onboarding')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                selectedSection === 'onboarding' ? 'border-orange-600' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <FileCheck className="w-8 h-8 text-orange-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Onboarding</div>
                <div className="text-sm text-gray-500">{onboardingList.filter(o => o.status !== 'Completed').length} active</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedSection('promotions')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                selectedSection === 'promotions' ? 'border-orange-600' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <GitBranch className="w-8 h-8 text-orange-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Promotions</div>
                <div className="text-sm text-gray-500">{promotionsTransfers.filter(p => p.status === 'Pending').length} pending</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedSection('grievances')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                selectedSection === 'grievances' ? 'border-orange-600' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Grievances</div>
                <div className="text-sm text-gray-500">{grievances.filter(g => g.status !== 'Resolved').length} active</div>
              </div>
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

        {/* Dynamic Content */}
        {selectedSection === 'directory' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3>
              <p className="text-sm text-gray-600 mt-1">Comprehensive employee repository</p>
            </div>

            <div className="p-6">
              {employees.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No employees found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {employees.map((employee, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                          {getInitials(employee.name)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            {getStatusBadge(employee.status || 'Active')}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                            <div>
                              <p className="text-gray-500 text-xs">Email</p>
                              <p className="font-medium text-gray-900">{employee.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Role</p>
                              <p className="font-medium text-gray-900">{employee.role || 'Employee'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Source</p>
                              <p className="font-medium text-gray-900">{employee.source === 'default' ? 'System' : 'Custom'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedSection === 'onboarding' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Onboarding Progress</h3>
                <p className="text-sm text-gray-600 mt-1">Track new employee onboarding</p>
              </div>
              {canManage && (
                <button
                  onClick={() => setShowOnboardingForm(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Onboarding
                </button>
              )}
            </div>

            <div className="p-6">
              {onboardingList.length === 0 ? (
                <div className="text-center py-12">
                  <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No onboarding processes yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {onboardingList.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                            {getInitials(item.employeeName)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.employeeName}</h3>
                            <p className="text-sm text-gray-600">{item.designation} • {item.department}</p>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Join Date</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(item.joinDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tasks</p>
                          <p className="text-sm font-medium text-gray-900">{item.completedTasks}/{item.totalTasks} completed</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Progress</p>
                          <p className="text-sm font-medium text-gray-900">{item.progress}%</p>
                        </div>
                      </div>
                      
                      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div 
                          className="absolute top-0 left-0 h-full bg-green-600 transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      
                      {canManage && item.status !== 'Completed' && (
                        <div className="flex items-center gap-2 mt-4">
                          <label className="text-sm text-gray-700">Update completed tasks:</label>
                          <input
                            type="number"
                            min="0"
                            max={item.totalTasks}
                            value={item.completedTasks}
                            onChange={(e) => updateOnboardingProgress(item.id, parseInt(e.target.value))}
                            className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedSection === 'promotions' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Promotions & Transfers</h3>
                <p className="text-sm text-gray-600 mt-1">Manage employee career progression</p>
              </div>
              {canManage && (
                <button
                  onClick={() => setShowPromotionForm(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              )}
            </div>

            <div className="p-6">
              {promotionsTransfers.length === 0 ? (
                <div className="text-center py-12">
                  <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No promotions or transfers yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">From → To</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Salary Change</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Effective Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        {canManage && (
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {promotionsTransfers.map(item => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.employeeName}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              item.type === 'Promotion' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">{item.from} → {item.to}</td>
                          <td className="py-3 px-4 text-sm font-medium text-green-600">{item.salaryChange || 'N/A'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{formatDate(item.effectiveDate)}</td>
                          <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                          {canManage && (
                            <td className="py-3 px-4">
                              {item.status === 'Pending' && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updatePromotionStatus(item.id, 'Approved')}
                                    className="text-green-600 hover:text-green-700"
                                    title="Approve"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => updatePromotionStatus(item.id, 'Rejected')}
                                    className="text-red-600 hover:text-red-700"
                                    title="Reject"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedSection === 'grievances' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Employee Grievances</h3>
                <p className="text-sm text-gray-600 mt-1">Track and resolve employee concerns</p>
              </div>
              <button
                onClick={() => setShowGrievanceForm(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Submit Grievance
              </button>
            </div>

            <div className="p-6">
              {grievances.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No grievances submitted</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {grievances.map(grievance => (
                    <div key={grievance.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">{grievance.id}</span>
                            {getPriorityBadge(grievance.priority)}
                            {getStatusBadge(grievance.status)}
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-2">{grievance.category}</p>
                          <p className="text-sm text-gray-600 mb-3">{grievance.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">Submitted By</p>
                              <p className="font-medium text-gray-900">{grievance.employeeName}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Assigned To</p>
                              <p className="font-medium text-gray-900">{grievance.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Submitted Date</p>
                              <p className="font-medium text-gray-900">{formatDate(grievance.submittedDate)}</p>
                            </div>
                          </div>
                        </div>
                        {canManage && grievance.status !== 'Resolved' && (
                          <div className="flex gap-2 ml-4">
                            {grievance.status === 'Acknowledged' && (
                              <button
                                onClick={() => updateGrievanceStatus(grievance.id, 'Under Investigation')}
                                className="text-orange-600 hover:text-orange-700 text-sm"
                              >
                                Investigate
                              </button>
                            )}
                            {grievance.status === 'Under Investigation' && (
                              <button
                                onClick={() => updateGrievanceStatus(grievance.id, 'Resolved')}
                                className="text-green-600 hover:text-green-700 text-sm"
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedSection === 'exits' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Exit Interviews</h3>
                <p className="text-sm text-gray-600 mt-1">Document employee feedback before departure</p>
              </div>
              {canManage && (
                <button
                  onClick={() => setShowExitForm(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Schedule Exit Interview
                </button>
              )}
            </div>

            <div className="p-6">
              {exitInterviews.length === 0 ? (
                <div className="text-center py-12">
                  <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No exit interviews scheduled</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {exitInterviews.map(exit => (
                    <div key={exit.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                              {getInitials(exit.employeeName)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{exit.employeeName}</h3>
                              <p className="text-sm text-gray-600">{exit.designation}</p>
                            </div>
                            {getStatusBadge(exit.status)}
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500 text-xs">Last Working Day</p>
                              <p className="font-medium text-gray-900">{formatDate(exit.lastDay)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Interview Date</p>
                              <p className="font-medium text-gray-900">{formatDate(exit.interviewDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Reason</p>
                              <p className="font-medium text-gray-900">{exit.reason || 'Not specified'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Rating</p>
                              {renderRating(exit.rating)}
                            </div>
                          </div>
                          {canManage && exit.status === 'Scheduled' && (
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => {
                                  const rating = parseFloat(prompt('Enter rating (0-5):', '4.0'))
                                  if (rating >= 0 && rating <= 5) {
                                    updateExitStatus(exit.id, 'Completed', rating)
                                  }
                                }}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                              >
                                Mark as Completed
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Onboarding Form Modal */}
      {showOnboardingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Create Onboarding Process</h2>
              <button onClick={resetOnboardingForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleOnboardingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                <input
                  type="text"
                  value={onboardingForm.employeeName}
                  onChange={(e) => setOnboardingForm({...onboardingForm, employeeName: e.target.value})}
                  className={`w-full px-4 py-2 border ${errors.employeeName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  placeholder="John Doe"
                />
                {errors.employeeName && <p className="mt-1 text-sm text-red-500">{errors.employeeName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                  <input
                    type="text"
                    value={onboardingForm.designation}
                    onChange={(e) => setOnboardingForm({...onboardingForm, designation: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.designation ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="Software Engineer"
                  />
                  {errors.designation && <p className="mt-1 text-sm text-red-500">{errors.designation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <input
                    type="text"
                    value={onboardingForm.department}
                    onChange={(e) => setOnboardingForm({...onboardingForm, department: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="Engineering"
                  />
                  {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date *</label>
                  <input
                    type="date"
                    value={onboardingForm.joinDate}
                    onChange={(e) => setOnboardingForm({...onboardingForm, joinDate: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.joinDate ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                  {errors.joinDate && <p className="mt-1 text-sm text-red-500">{errors.joinDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Tasks</label>
                  <input
                    type="number"
                    min="1"
                    value={onboardingForm.totalTasks}
                    onChange={(e) => setOnboardingForm({...onboardingForm, totalTasks: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Create Onboarding
                </button>
                <button
                  type="button"
                  onClick={resetOnboardingForm}
                  className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promotion/Transfer Form Modal */}
      {showPromotionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">New Promotion/Transfer Request</h2>
              <button onClick={resetPromotionForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handlePromotionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                <input
                  type="text"
                  value={promotionForm.employeeName}
                  onChange={(e) => setPromotionForm({...promotionForm, employeeName: e.target.value})}
                  className={`w-full px-4 py-2 border ${errors.employeeName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  placeholder="John Doe"
                />
                {errors.employeeName && <p className="mt-1 text-sm text-red-500">{errors.employeeName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={promotionForm.type}
                  onChange={(e) => setPromotionForm({...promotionForm, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>Promotion</option>
                  <option>Transfer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From (Current Position) *</label>
                  <input
                    type="text"
                    value={promotionForm.from}
                    onChange={(e) => setPromotionForm({...promotionForm, from: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.from ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="Software Engineer"
                  />
                  {errors.from && <p className="mt-1 text-sm text-red-500">{errors.from}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To (New Position) *</label>
                  <input
                    type="text"
                    value={promotionForm.to}
                    onChange={(e) => setPromotionForm({...promotionForm, to: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.to ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="Senior Software Engineer"
                  />
                  {errors.to && <p className="mt-1 text-sm text-red-500">{errors.to}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={promotionForm.department}
                    onChange={(e) => setPromotionForm({...promotionForm, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date *</label>
                  <input
                    type="date"
                    value={promotionForm.effectiveDate}
                    onChange={(e) => setPromotionForm({...promotionForm, effectiveDate: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.effectiveDate ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                  {errors.effectiveDate && <p className="mt-1 text-sm text-red-500">{errors.effectiveDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Change</label>
                  <input
                    type="text"
                    value={promotionForm.salaryChange}
                    onChange={(e) => setPromotionForm({...promotionForm, salaryChange: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="+15% or $10,000"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={resetPromotionForm}
                  className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grievance Form Modal */}
      {showGrievanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Submit Grievance</h2>
              <button onClick={resetGrievanceForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleGrievanceSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={grievanceForm.category}
                    onChange={(e) => setGrievanceForm({...grievanceForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Workplace Issue</option>
                    <option>Harassment</option>
                    <option>Salary Dispute</option>
                    <option>Work Environment</option>
                    <option>Management Conflict</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={grievanceForm.priority}
                    onChange={(e) => setGrievanceForm({...grievanceForm, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm({...grievanceForm, description: e.target.value})}
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  rows={5}
                  placeholder="Describe your concern in detail..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={grievanceForm.anonymous}
                  onChange={(e) => setGrievanceForm({...grievanceForm, anonymous: e.target.checked})}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Submit Grievance
                </button>
                <button
                  type="button"
                  onClick={resetGrievanceForm}
                  className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exit Interview Form Modal */}
      {showExitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Schedule Exit Interview</h2>
              <button onClick={resetExitForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleExitSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                  <input
                    type="text"
                    value={exitForm.employeeName}
                    onChange={(e) => setExitForm({...exitForm, employeeName: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.employeeName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="John Doe"
                  />
                  {errors.employeeName && <p className="mt-1 text-sm text-red-500">{errors.employeeName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                  <input
                    type="text"
                    value={exitForm.designation}
                    onChange={(e) => setExitForm({...exitForm, designation: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.designation ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    placeholder="Software Engineer"
                  />
                  {errors.designation && <p className="mt-1 text-sm text-red-500">{errors.designation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Working Day *</label>
                  <input
                    type="date"
                    value={exitForm.lastDay}
                    onChange={(e) => setExitForm({...exitForm, lastDay: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.lastDay ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                  {errors.lastDay && <p className="mt-1 text-sm text-red-500">{errors.lastDay}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date *</label>
                  <input
                    type="date"
                    value={exitForm.interviewDate}
                    onChange={(e) => setExitForm({...exitForm, interviewDate: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.interviewDate ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                  {errors.interviewDate && <p className="mt-1 text-sm text-red-500">{errors.interviewDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leaving</label>
                <input
                  type="text"
                  value={exitForm.reason}
                  onChange={(e) => setExitForm({...exitForm, reason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Better Opportunity, Relocation, etc."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Schedule Interview
                </button>
                <button
                  type="button"
                  onClick={resetExitForm}
                  className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeLifecyclePage

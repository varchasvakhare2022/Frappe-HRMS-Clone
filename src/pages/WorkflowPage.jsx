import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  CheckCircle, XCircle, Clock, AlertCircle, User, 
  FileText, DollarSign, Calendar, TrendingUp, Bell,
  ChevronRight, Filter, Search, Plus, Eye, Edit,
  Trash2, Download, Send, MoreVertical, ArrowRight,
  Home, LogOut, Settings, HelpCircle
} from 'lucide-react'

function WorkflowPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/signup')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [navigate])

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    if (tab && ['pending', 'approved', 'rejected', 'templates'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [location.search])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown')) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return null
  }

  // Check if user can approve (Admin role only)
  const canApprove = user.role?.toLowerCase().includes('admin')

  // Dummy Data for Workflows
  const workflowData = {
    pendingApprovals: [
      {
        id: 'WF-001',
        type: 'Leave Request',
        employee: 'Sarah Johnson',
        avatar: null,
        requestDate: '2024-10-25',
        details: 'Casual Leave - Dec 15-17, 2024 (3 days)',
        status: 'Pending Manager Approval',
        priority: 'medium',
        currentStep: 1,
        totalSteps: 3,
        icon: Calendar,
        color: 'blue'
      },
      {
        id: 'WF-002',
        type: 'Expense Claim',
        employee: 'Raj Kumar',
        avatar: null,
        requestDate: '2024-10-24',
        details: 'Travel Expense - Client Meeting (INR 4,500)',
        status: 'Pending Finance Approval',
        priority: 'high',
        currentStep: 2,
        totalSteps: 3,
        icon: DollarSign,
        color: 'green'
      },
      {
        id: 'WF-003',
        type: 'Leave Request',
        employee: 'Emma Thompson',
        avatar: null,
        requestDate: '2024-10-26',
        details: 'Sick Leave - Oct 28-29, 2024 (2 days)',
        status: 'Pending Manager Approval',
        priority: 'high',
        currentStep: 1,
        totalSteps: 2,
        icon: Calendar,
        color: 'blue'
      },
      {
        id: 'WF-004',
        type: 'Shift Swap',
        employee: 'Mohammed Al-Rashid',
        avatar: null,
        requestDate: '2024-10-23',
        details: 'Swap Oct 30 Morning → Evening Shift',
        status: 'Pending Supervisor Approval',
        priority: 'low',
        currentStep: 1,
        totalSteps: 2,
        icon: Clock,
        color: 'orange'
      },
      {
        id: 'WF-005',
        type: 'Expense Claim',
        employee: 'Priya Sharma',
        avatar: null,
        requestDate: '2024-10-22',
        details: 'Office Supplies - Stationery (INR 1,200)',
        status: 'Pending Manager Approval',
        priority: 'low',
        currentStep: 1,
        totalSteps: 3,
        icon: DollarSign,
        color: 'green'
      }
    ],
    approvedWorkflows: [
      {
        id: 'WF-101',
        type: 'Leave Request',
        employee: 'Li Wei',
        requestDate: '2024-10-20',
        approvedDate: '2024-10-21',
        details: 'Annual Leave - Nov 10-14, 2024 (5 days)',
        approver: 'John Manager',
        icon: Calendar,
        color: 'blue'
      },
      {
        id: 'WF-102',
        type: 'Expense Claim',
        employee: 'José García',
        requestDate: '2024-10-18',
        approvedDate: '2024-10-19',
        details: 'Client Dinner - Project Discussion (INR 3,800)',
        approver: 'Finance Team',
        icon: DollarSign,
        color: 'green'
      },
      {
        id: 'WF-103',
        type: 'Shift Request',
        employee: 'A B',
        requestDate: '2024-10-17',
        approvedDate: '2024-10-18',
        details: 'Permanent Shift Change - Evening to Morning',
        approver: 'HR Department',
        icon: Clock,
        color: 'orange'
      }
    ],
    rejectedWorkflows: [
      {
        id: 'WF-201',
        type: 'Leave Request',
        employee: 'Test User',
        requestDate: '2024-10-15',
        rejectedDate: '2024-10-16',
        details: 'Casual Leave - Oct 28-30, 2024 (3 days)',
        rejector: 'Jane Manager',
        reason: 'Insufficient leave balance',
        icon: Calendar,
        color: 'blue'
      },
      {
        id: 'WF-202',
        type: 'Expense Claim',
        employee: 'John Doe',
        requestDate: '2024-10-10',
        rejectedDate: '2024-10-11',
        details: 'Personal Expense (INR 2,000)',
        rejector: 'Finance Team',
        reason: 'Not a valid business expense',
        icon: DollarSign,
        color: 'green'
      }
    ],
    workflowTemplates: [
      {
        id: 'T-001',
        name: 'Leave Approval',
        description: 'Standard leave request approval process',
        steps: ['Employee → Manager → HR → Approved/Rejected'],
        usageCount: 245,
        icon: Calendar,
        color: 'bg-blue-500'
      },
      {
        id: 'T-002',
        name: 'Expense Claim',
        description: 'Expense reimbursement workflow',
        steps: ['Employee → Manager → Finance → Approved/Rejected'],
        usageCount: 189,
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        id: 'T-003',
        name: 'Shift Request',
        description: 'Shift change/swap approval',
        steps: ['Employee → Supervisor → Approved/Rejected'],
        usageCount: 67,
        icon: Clock,
        color: 'bg-orange-500'
      },
      {
        id: 'T-004',
        name: 'Performance Review',
        description: 'Employee appraisal workflow',
        steps: ['Self Assessment → Manager Review → HR Approval'],
        usageCount: 134,
        icon: TrendingUp,
        color: 'bg-purple-500'
      }
    ]
  }

  // Get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    if (status.includes('Pending')) return Clock
    if (status.includes('Approved')) return CheckCircle
    if (status.includes('Rejected')) return XCircle
    return AlertCircle
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">Workflow Automation</span>
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="relative user-dropdown">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                    {getInitials(user.name)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-blue-600 mt-1">{user.role}</p>
                    </div>
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Help
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Automation</h1>
              <p className="text-gray-600">Hub for Workforce-Centric Automated Processes</p>
            </div>
            {canApprove && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                <Plus className="w-4 h-4" />
                <span className="font-medium">New Workflow</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Pending Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{workflowData.pendingApprovals.length}</h3>
            <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-orange-600 font-medium">Requires Action</p>
            </div>
          </div>

          {/* Approved Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{workflowData.approvedWorkflows.length}</h3>
            <p className="text-sm font-medium text-gray-600">Approved</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-green-600 font-medium">Completed</p>
            </div>
          </div>

          {/* Rejected Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{workflowData.rejectedWorkflows.length}</h3>
            <p className="text-sm font-medium text-gray-600">Rejected</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-red-600 font-medium">Declined</p>
            </div>
          </div>

          {/* Templates Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{workflowData.workflowTemplates.length}</h3>
            <p className="text-sm font-medium text-gray-600">Templates</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-blue-600 font-medium">Available</p>
            </div>
          </div>
        </div>

        {/* Visual Workflow Diagram */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Leave Request Workflow</h2>
          
          {/* Workflow Visualization */}
          <div className="relative flex items-center justify-between px-8">
            {/* Step 1: Submit Request */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-blue-500 flex items-center justify-center mb-3 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900 text-center">Submit<br/>Request</p>
              <p className="text-xs text-gray-500 mt-1">Employee</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Step 2: Manager Review */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-purple-500 flex items-center justify-center mb-3 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900 text-center">Manager<br/>Review</p>
              <p className="text-xs text-gray-500 mt-1">Decision Point</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Step 3: Decision */}
            <div className="flex flex-col items-center relative">
              {/* Approved Path (Top) */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-green-500 flex items-center justify-center mb-2 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-semibold text-green-700">Approved</p>
                <Bell className="w-4 h-4 text-yellow-500 mt-1" />
              </div>

              {/* Diamond Decision Box */}
              <div className="w-20 h-20 bg-yellow-400 transform rotate-45 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <p className="text-sm font-semibold text-gray-900 mt-3">Decision</p>

              {/* Rejected Path (Bottom) */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <p className="text-sm font-semibold text-red-700">Rejected</p>
                <Bell className="w-4 h-4 text-red-500 mt-1" />
                <div className="w-16 h-16 rounded-lg bg-red-500 flex items-center justify-center mt-2 shadow-lg">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Step 4: Complete */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-3 shadow-lg border-4 border-white">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900 text-center">Complete</p>
              <p className="text-xs text-gray-500 mt-1">Resolved</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm border border-gray-100 border-b-0">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending Approvals ({workflowData.pendingApprovals.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'approved'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Approved ({workflowData.approvedWorkflows.length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'rejected'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rejected ({workflowData.rejectedWorkflows.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Templates ({workflowData.workflowTemplates.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-100">
          {/* Search and Filters */}
          {activeTab !== 'templates' && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          )}

          {/* Pending Approvals */}
          {activeTab === 'pending' && (
            <div className="p-6">
              {!canApprove && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You have view-only access. Only Admins can approve or reject workflows.
                  </p>
                </div>
              )}
              <div className="space-y-4">
                {workflowData.pendingApprovals.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer bg-white"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {getInitials(workflow.employee)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{workflow.employee}</h3>
                            <p className="text-sm text-gray-600">{workflow.type} • {workflow.id}</p>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(workflow.priority)} capitalize font-medium`}>
                            {workflow.priority}
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">{workflow.details}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">Requested: {workflow.requestDate}</span>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span className="text-xs text-orange-600 font-medium">{workflow.status}</span>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-gray-500">
                              Step {workflow.currentStep}/{workflow.totalSteps}
                            </div>
                            <div className="flex gap-1">
                              {[...Array(workflow.totalSteps)].map((_, index) => (
                                <div
                                  key={index}
                                  className={`w-2 h-2 rounded-full ${
                                    index < workflow.currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {canApprove ? (
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors">
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors">
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved Workflows */}
          {activeTab === 'approved' && (
            <div className="p-6">
              <div className="space-y-4">
                {workflowData.approvedWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="border border-green-200 bg-green-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {getInitials(workflow.employee)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{workflow.employee}</h3>
                            <p className="text-sm text-gray-600">{workflow.type} • {workflow.id}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>

                        <p className="text-sm text-gray-700 mb-3">{workflow.details}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Requested: {workflow.requestDate}</span>
                          <span>Approved: {workflow.approvedDate}</span>
                          <span>By: {workflow.approver}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rejected Workflows */}
          {activeTab === 'rejected' && (
            <div className="p-6">
              <div className="space-y-4">
                {workflowData.rejectedWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="border border-red-200 bg-red-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {getInitials(workflow.employee)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{workflow.employee}</h3>
                            <p className="text-sm text-gray-600">{workflow.type} • {workflow.id}</p>
                          </div>
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>

                        <p className="text-sm text-gray-700 mb-2">{workflow.details}</p>
                        <p className="text-sm text-red-700 font-medium mb-3">
                          <span className="font-semibold">Reason:</span> {workflow.reason}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Requested: {workflow.requestDate}</span>
                          <span>Rejected: {workflow.rejectedDate}</span>
                          <span>By: {workflow.rejector}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Templates */}
          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {workflowData.workflowTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${template.color} p-3 rounded-xl flex-shrink-0`}>
                        <template.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-gray-500 mb-1 font-medium">Workflow Steps:</p>
                          <p className="text-sm text-gray-700">{template.steps[0]}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Used {template.usageCount} times</span>
                          <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            {canApprove && (
                              <>
                                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                  <Edit className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                  <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkflowPage

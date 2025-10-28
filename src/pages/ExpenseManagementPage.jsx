import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  User, 
  LogOut,
  DollarSign,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Filter,
  Download,
  Search,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  Receipt,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Building2
} from 'lucide-react'

const ExpenseManagementPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('claims')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role?.toLowerCase().includes('admin')

  // Shortcuts based on role
  const employeeShortcuts = [
    { label: 'New Expense Claim', icon: FileText, link: null },
    { label: 'My Claims', icon: Receipt, link: null },
    { label: 'Request Advance', icon: Wallet, link: null },
    { label: 'My Advances', icon: CreditCard, link: null }
  ]

  const adminShortcuts = [
    { label: 'All Expense Claims', icon: FileText, link: null },
    { label: 'Pending Approvals', icon: Clock, link: null },
    { label: 'Manage Advances', icon: Wallet, link: null },
    { label: 'Expense Analytics', icon: TrendingUp, link: null },
    { label: 'Configure Workflows', icon: Settings, link: null },
    { label: 'Accounting Sync', icon: Building2, link: null }
  ]

  const shortcuts = isAdmin ? adminShortcuts : employeeShortcuts

  // Reports & Masters
  const reportsAndMasters = {
    reports: [
      { name: 'Expense Claims Report', icon: FileText },
      { name: 'Advances Report', icon: CreditCard },
      { name: 'Settlement Report', icon: CheckCircle },
      { name: 'Department-wise Analysis', icon: Users },
      { name: 'Employee Expense Trends', icon: TrendingUp },
      { name: 'Accounting Ledger', icon: Building2 }
    ],
    masters: [
      { name: 'Expense Types', icon: Receipt },
      { name: 'Approval Workflows', icon: Settings },
      { name: 'Cost Centers', icon: Building2 },
      { name: 'Expense Policies', icon: FileText }
    ]
  }

  // Dummy data for expense claims
  const expenseClaims = [
    {
      id: 'EXP-2024-001',
      employee: 'John Doe',
      type: 'Travel',
      amount: 1250.00,
      date: '2024-10-25',
      status: 'Pending',
      approver: 'Sarah Wilson',
      description: 'Client meeting in Boston'
    },
    {
      id: 'EXP-2024-002',
      employee: 'Sarah Wilson',
      type: 'Meals',
      amount: 185.50,
      date: '2024-10-24',
      status: 'Approved',
      approver: 'Admin User',
      description: 'Team lunch - project celebration'
    },
    {
      id: 'EXP-2024-003',
      employee: 'Mike Johnson',
      type: 'Equipment',
      amount: 899.99,
      date: '2024-10-23',
      status: 'Approved',
      approver: 'Sarah Wilson',
      description: 'Laptop accessories for remote work'
    },
    {
      id: 'EXP-2024-004',
      employee: 'Emily Chen',
      type: 'Travel',
      amount: 2150.00,
      date: '2024-10-22',
      status: 'Rejected',
      approver: 'Admin User',
      description: 'Conference attendance - NYC',
      rejectionReason: 'Budget exceeded for the quarter'
    },
    {
      id: 'EXP-2024-005',
      employee: 'David Lee',
      type: 'Internet & Phone',
      amount: 125.00,
      date: '2024-10-20',
      status: 'Approved',
      approver: 'Sarah Wilson',
      description: 'Monthly internet reimbursement'
    },
    {
      id: 'EXP-2024-006',
      employee: 'Lisa Anderson',
      type: 'Training',
      amount: 599.00,
      date: '2024-10-19',
      status: 'Pending',
      approver: 'Admin User',
      description: 'React Advanced Workshop'
    }
  ]

  // Dummy data for employee advances
  const employeeAdvances = [
    {
      id: 'ADV-2024-001',
      employee: 'John Doe',
      amount: 5000.00,
      purpose: 'Business trip to San Francisco',
      requestDate: '2024-10-15',
      approvedDate: '2024-10-16',
      status: 'Approved',
      settledAmount: 3200.00,
      balanceAmount: 1800.00
    },
    {
      id: 'ADV-2024-002',
      employee: 'Emily Chen',
      amount: 3000.00,
      purpose: 'Conference expenses',
      requestDate: '2024-10-18',
      approvedDate: '2024-10-19',
      status: 'Approved',
      settledAmount: 3000.00,
      balanceAmount: 0.00
    },
    {
      id: 'ADV-2024-003',
      employee: 'David Lee',
      amount: 2000.00,
      purpose: 'Training and certification',
      requestDate: '2024-10-20',
      approvedDate: null,
      status: 'Pending',
      settledAmount: 0.00,
      balanceAmount: 2000.00
    },
    {
      id: 'ADV-2024-004',
      employee: 'Sarah Wilson',
      amount: 4500.00,
      purpose: 'Client visit and project setup',
      requestDate: '2024-10-10',
      approvedDate: '2024-10-11',
      status: 'Approved',
      settledAmount: 4500.00,
      balanceAmount: 0.00
    }
  ]

  // Analytics data
  const analyticsData = {
    thisMonth: {
      totalClaims: 24,
      totalAmount: 18750.50,
      approved: 18,
      pending: 4,
      rejected: 2,
      avgClaimAmount: 781.27
    },
    topCategories: [
      { name: 'Travel', amount: 8500.00, percentage: 45.3, color: 'bg-blue-500' },
      { name: 'Meals', amount: 3200.00, percentage: 17.1, color: 'bg-green-500' },
      { name: 'Equipment', amount: 2800.00, percentage: 14.9, color: 'bg-purple-500' },
      { name: 'Training', amount: 2150.00, percentage: 11.5, color: 'bg-orange-500' },
      { name: 'Others', amount: 2100.50, percentage: 11.2, color: 'bg-gray-500' }
    ],
    comparisonData: {
      currentMonth: 18750.50,
      lastMonth: 16200.00,
      change: 15.7,
      trend: 'up'
    }
  }

  // Approval workflows
  const approvalWorkflows = [
    {
      id: 'WF-001',
      name: 'Standard Expense Approval',
      levels: [
        { level: 1, role: 'Department Manager', amount: 'Up to $500' },
        { level: 2, role: 'Finance Manager', amount: '$501 - $2000' },
        { level: 3, role: 'CFO', amount: 'Above $2000' }
      ],
      isActive: true
    },
    {
      id: 'WF-002',
      name: 'Travel Expense Workflow',
      levels: [
        { level: 1, role: 'Department Manager', amount: 'Up to $1000' },
        { level: 2, role: 'Travel Coordinator', amount: '$1001 - $5000' },
        { level: 3, role: 'CFO', amount: 'Above $5000' }
      ],
      isActive: true
    },
    {
      id: 'WF-003',
      name: 'Emergency Expense Workflow',
      levels: [
        { level: 1, role: 'Any Manager', amount: 'All amounts' }
      ],
      isActive: false
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/signup')
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Back button and Breadcrumbs */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <Home className="w-4 h-4 text-gray-400" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Expense Management</span>
              </div>
            </div>

            {/* Right side - User menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0) || 'U'}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Management</h1>
          <p className="text-gray-600">
            Managing expenses can be a daunting task for organizations, often bogged down by endless paperwork, 
            manual data entry, and tedious approval processes. Streamline travel and expense management. 
            Payout advances, track claims, and draw meaningful insights with the seamless accounting integration.
          </p>
        </div>

        {/* Shortcuts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {shortcuts.map((shortcut, index) => (
              <button
                key={index}
                onClick={() => shortcut.link && navigate(shortcut.link)}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <shortcut.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{shortcut.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reports & Masters Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports & Masters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reports */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Reports
              </h3>
              <div className="space-y-2">
                {reportsAndMasters.reports.map((report, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center space-x-2"
                  >
                    <report.icon className="w-4 h-4 text-gray-400" />
                    <span>{report.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Masters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Masters
              </h3>
              <div className="space-y-2">
                {reportsAndMasters.masters.map((master, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center space-x-2"
                  >
                    <master.icon className="w-4 h-4 text-gray-400" />
                    <span>{master.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('claims')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'claims'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Expense Claims
              </button>
              <button
                onClick={() => setActiveTab('advances')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'advances'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Employee Advances
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('workflows')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'workflows'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Approval Workflows
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'analytics'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('accounting')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'accounting'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Accounting Sync
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Expense Claims Tab */}
            {activeTab === 'claims' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Expense Claims</h3>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    {!isAdmin && (
                      <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>New Claim</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Claims Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Claim ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {expenseClaims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {claim.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {claim.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {claim.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${claim.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {claim.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                              {getStatusIcon(claim.status)}
                              <span>{claim.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            {isAdmin && claim.status === 'Pending' && (
                              <>
                                <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                                <button className="text-red-600 hover:text-red-900">Reject</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Employee Advances Tab */}
            {activeTab === 'advances' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Employee Advances</h3>
                  <div className="flex space-x-3">
                    {!isAdmin && (
                      <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Request Advance</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Advances Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Advance ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purpose
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Settled
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employeeAdvances.map((advance) => (
                        <tr key={advance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {advance.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {advance.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${advance.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                            {advance.purpose}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${advance.settledAmount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`font-medium ${advance.balanceAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                              ${advance.balanceAmount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(advance.status)}`}>
                              {getStatusIcon(advance.status)}
                              <span>{advance.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            {isAdmin && advance.status === 'Pending' && (
                              <>
                                <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                                <button className="text-red-600 hover:text-red-900">Reject</button>
                              </>
                            )}
                            {advance.balanceAmount > 0 && advance.status === 'Approved' && (
                              <button className="text-purple-600 hover:text-purple-900">Settle</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Approval Workflows Tab (Admin only) */}
            {activeTab === 'workflows' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Approval Workflows</h3>
                  <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Workflow</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {approvalWorkflows.map((workflow) => (
                    <div key={workflow.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{workflow.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">ID: {workflow.id}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            workflow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {workflow.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {workflow.levels.map((level) => (
                          <div key={level.level} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                              {level.level}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{level.role}</p>
                              <p className="text-xs text-gray-500">Approval Authority: {level.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab (Admin only) */}
            {activeTab === 'analytics' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Analytics</h3>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-8 h-8 opacity-80" />
                      <span className="text-2xl font-bold">{analyticsData.thisMonth.totalClaims}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Claims</p>
                    <p className="text-xs opacity-75 mt-1">This Month</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-8 h-8 opacity-80" />
                      <span className="text-2xl font-bold">${(analyticsData.thisMonth.totalAmount / 1000).toFixed(1)}k</span>
                    </div>
                    <p className="text-sm opacity-90">Total Amount</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <p className="text-xs opacity-75">+{analyticsData.comparisonData.change}% vs last month</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 opacity-80" />
                      <span className="text-2xl font-bold">{analyticsData.thisMonth.approved}</span>
                    </div>
                    <p className="text-sm opacity-90">Approved</p>
                    <p className="text-xs opacity-75 mt-1">{analyticsData.thisMonth.pending} Pending, {analyticsData.thisMonth.rejected} Rejected</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 opacity-80" />
                      <span className="text-2xl font-bold">${analyticsData.thisMonth.avgClaimAmount.toFixed(0)}</span>
                    </div>
                    <p className="text-sm opacity-90">Avg Claim Amount</p>
                    <p className="text-xs opacity-75 mt-1">Per Employee</p>
                  </div>
                </div>

                {/* Top Categories */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="text-md font-semibold text-gray-900 mb-6">Expense by Category</h4>
                  <div className="space-y-4">
                    {analyticsData.topCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">${category.amount.toFixed(2)}</span>
                            <span className="text-xs text-gray-500 ml-2">({category.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${category.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Accounting Sync Tab (Admin only) */}
            {activeTab === 'accounting' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Accounting Integration</h3>

                {/* Integration Status */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">QuickBooks Online</h4>
                        <p className="text-sm text-gray-600">Connected & Syncing</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Active</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-2xl font-bold text-gray-900">156</p>
                      <p className="text-sm text-gray-600 mt-1">Synced Transactions</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-600">4</p>
                      <p className="text-sm text-gray-600 mt-1">Pending Sync</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-2xl font-bold text-gray-900">Oct 28, 2024</p>
                      <p className="text-sm text-gray-600 mt-1">Last Sync</p>
                    </div>
                  </div>
                </div>

                {/* Sync History */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Sync History</h4>
                  <div className="space-y-4">
                    {[
                      { date: 'Oct 28, 2024 10:30 AM', transactions: 12, status: 'Success' },
                      { date: 'Oct 27, 2024 02:15 PM', transactions: 8, status: 'Success' },
                      { date: 'Oct 26, 2024 09:45 AM', transactions: 15, status: 'Success' },
                      { date: 'Oct 25, 2024 04:20 PM', transactions: 6, status: 'Success' },
                      { date: 'Oct 24, 2024 11:00 AM', transactions: 10, status: 'Success' }
                    ].map((sync, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sync.date}</p>
                          <p className="text-xs text-gray-500 mt-1">{sync.transactions} transactions synced</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {sync.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                    Sync Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseManagementPage


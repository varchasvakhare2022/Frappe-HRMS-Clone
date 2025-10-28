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
  Plus,
  Filter,
  Download,
  Search,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Play,
  AlertCircle,
  CreditCard,
  Building2,
  Wallet,
  Receipt,
  XCircle,
  Globe,
  PieChart
} from 'lucide-react'

const PayrollPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('structures')

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role?.toLowerCase().includes('admin')

  // Shortcuts based on role
  const employeeShortcuts = [
    { label: 'View Payslip', icon: FileText, link: null },
    { label: 'Download Payslips', icon: Download, link: null },
    { label: 'Tax Declaration', icon: Receipt, link: null },
    { label: 'My Loans', icon: CreditCard, link: null }
  ]

  const adminShortcuts = [
    { label: 'Create Salary Structure', icon: Settings, link: null },
    { label: 'Bulk Assignment', icon: Users, link: null },
    { label: 'Preview Payslips', icon: Eye, link: null },
    { label: 'Run Payroll', icon: Play, link: null },
    { label: 'Off-Cycle Payment', icon: DollarSign, link: null },
    { label: 'Manage Loans', icon: CreditCard, link: null }
  ]

  const shortcuts = isAdmin ? adminShortcuts : employeeShortcuts

  // Reports & Masters
  const reportsAndMasters = {
    reports: [
      { name: 'Salary Register', icon: BarChart3 },
      { name: 'Bank Remittance', icon: Building2 },
      { name: 'Payroll Summary', icon: FileText },
      { name: 'Cost Center Allocation', icon: PieChart },
      { name: 'Tax Report', icon: Receipt },
      { name: 'Loan Report', icon: CreditCard }
    ],
    masters: [
      { name: 'Salary Components', icon: Settings },
      { name: 'Cost Centers', icon: Building2 },
      { name: 'Payment Accounts', icon: Wallet },
      { name: 'Loan Types', icon: CreditCard }
    ]
  }

  // Dummy data for salary structures
  const salaryStructures = [
    {
      id: 'SS-001',
      name: 'Software Engineer - Standard',
      company: 'Frappe Technologies',
      currency: 'USD',
      payroll_frequency: 'Monthly',
      employees: 15,
      earnings: ['Basic Salary', 'HRA', 'Travel Allowance', 'Performance Bonus'],
      deductions: ['Income Tax', 'Professional Tax', 'Provident Fund'],
      isActive: true,
      created_by: 'Admin User'
    },
    {
      id: 'SS-002',
      name: 'Sales Team - Commission Based',
      company: 'Frappe Technologies',
      currency: 'USD',
      payroll_frequency: 'Monthly',
      employees: 8,
      earnings: ['Basic Salary', 'Sales Commission', 'Travel Allowance', 'Incentive'],
      deductions: ['Income Tax', 'Professional Tax'],
      isActive: true,
      created_by: 'Admin User'
    },
    {
      id: 'SS-003',
      name: 'Consultant - Hourly',
      company: 'Frappe Technologies',
      currency: 'USD',
      payroll_frequency: 'Monthly',
      employees: 5,
      earnings: ['Hourly Rate', 'Overtime'],
      deductions: ['Income Tax'],
      isActive: true,
      created_by: 'Sarah Wilson'
    },
    {
      id: 'SS-004',
      name: 'Management - Executive',
      company: 'Frappe Technologies',
      currency: 'USD',
      payroll_frequency: 'Monthly',
      employees: 4,
      earnings: ['Basic Salary', 'HRA', 'Executive Allowance', 'Stock Options', 'Performance Bonus'],
      deductions: ['Income Tax', 'Professional Tax', 'Provident Fund', 'ESI'],
      isActive: true,
      created_by: 'Admin User'
    }
  ]

  // Dummy data for bulk assignments
  const bulkAssignments = [
    {
      id: 'BA-001',
      date: '2024-10-01',
      structure: 'Software Engineer - Standard',
      employees: 12,
      status: 'Completed',
      assigned_by: 'Admin User'
    },
    {
      id: 'BA-002',
      date: '2024-10-15',
      structure: 'Sales Team - Commission Based',
      employees: 5,
      status: 'Completed',
      assigned_by: 'Admin User'
    },
    {
      id: 'BA-003',
      date: '2024-10-20',
      structure: 'Management - Executive',
      employees: 3,
      status: 'In Progress',
      assigned_by: 'Sarah Wilson'
    }
  ]

  // Dummy data for payslips
  const payslips = [
    {
      id: 'PAY-2024-10-001',
      employee: 'John Doe',
      month: 'October 2024',
      gross_pay: 8500.00,
      deductions: 1275.00,
      net_pay: 7225.00,
      status: 'Submitted',
      payment_date: '2024-11-01'
    },
    {
      id: 'PAY-2024-10-002',
      employee: 'Sarah Wilson',
      month: 'October 2024',
      gross_pay: 12000.00,
      deductions: 2100.00,
      net_pay: 9900.00,
      status: 'Submitted',
      payment_date: '2024-11-01'
    },
    {
      id: 'PAY-2024-10-003',
      employee: 'Mike Johnson',
      month: 'October 2024',
      gross_pay: 9500.00,
      deductions: 1520.00,
      net_pay: 7980.00,
      status: 'Draft',
      payment_date: null
    },
    {
      id: 'PAY-2024-10-004',
      employee: 'Emily Chen',
      month: 'October 2024',
      gross_pay: 7800.00,
      deductions: 1170.00,
      net_pay: 6630.00,
      status: 'Submitted',
      payment_date: '2024-11-01'
    },
    {
      id: 'PAY-2024-10-005',
      employee: 'David Lee',
      month: 'October 2024',
      gross_pay: 8200.00,
      deductions: 1230.00,
      net_pay: 6970.00,
      status: 'Submitted',
      payment_date: '2024-11-01'
    }
  ]

  // Dummy data for payroll runs
  const payrollRuns = [
    {
      id: 'PR-2024-10',
      month: 'October 2024',
      start_date: '2024-10-01',
      end_date: '2024-10-31',
      employees: 45,
      total_gross: 382500.00,
      total_deductions: 61200.00,
      total_net: 321300.00,
      status: 'Completed',
      processed_date: '2024-10-28',
      processed_by: 'Admin User'
    },
    {
      id: 'PR-2024-09',
      month: 'September 2024',
      start_date: '2024-09-01',
      end_date: '2024-09-30',
      employees: 45,
      total_gross: 378200.00,
      total_deductions: 60512.00,
      total_net: 317688.00,
      status: 'Completed',
      processed_date: '2024-09-28',
      processed_by: 'Admin User'
    },
    {
      id: 'PR-2024-08',
      month: 'August 2024',
      start_date: '2024-08-01',
      end_date: '2024-08-31',
      employees: 42,
      total_gross: 356400.00,
      total_deductions: 57024.00,
      total_net: 299376.00,
      status: 'Completed',
      processed_date: '2024-08-28',
      processed_by: 'Sarah Wilson'
    }
  ]

  // Dummy data for additional salaries
  const additionalSalaries = [
    {
      id: 'AS-001',
      employee: 'John Doe',
      type: 'Bonus',
      amount: 5000.00,
      payroll_date: '2024-10-31',
      reason: 'Q3 Performance Bonus',
      status: 'Approved'
    },
    {
      id: 'AS-002',
      employee: 'Emily Chen',
      type: 'Incentive',
      amount: 2500.00,
      payroll_date: '2024-10-31',
      reason: 'Project completion incentive',
      status: 'Approved'
    },
    {
      id: 'AS-003',
      employee: 'Mike Johnson',
      type: 'Overtime',
      amount: 1200.00,
      payroll_date: '2024-10-31',
      reason: 'Weekend project work',
      status: 'Pending'
    }
  ]

  // Dummy data for cost centers
  const costCenters = [
    {
      name: 'Engineering',
      allocated_amount: 185000.00,
      percentage: 48.4,
      employees: 22,
      color: 'bg-blue-500'
    },
    {
      name: 'Sales & Marketing',
      allocated_amount: 95000.00,
      percentage: 24.8,
      employees: 12,
      color: 'bg-green-500'
    },
    {
      name: 'HR & Admin',
      allocated_amount: 62000.00,
      percentage: 16.2,
      employees: 7,
      color: 'bg-purple-500'
    },
    {
      name: 'Finance',
      allocated_amount: 40500.00,
      percentage: 10.6,
      employees: 4,
      color: 'bg-orange-500'
    }
  ]

  // Dummy data for multi-currency
  const currencyPayrolls = [
    {
      currency: 'USD',
      employees: 35,
      total_amount: 295000.00,
      exchange_rate: 1.0
    },
    {
      currency: 'EUR',
      employees: 6,
      total_amount: 48000.00,
      exchange_rate: 0.92
    },
    {
      currency: 'GBP',
      employees: 4,
      total_amount: 32000.00,
      exchange_rate: 0.79
    }
  ]

  // Dummy data for loans
  const employeeLoans = [
    {
      id: 'LOAN-001',
      employee: 'John Doe',
      loan_type: 'Personal Loan',
      loan_amount: 50000.00,
      interest_rate: 8.5,
      disbursement_date: '2024-06-01',
      repayment_start: '2024-07-01',
      monthly_repayment: 2500.00,
      total_paid: 10000.00,
      balance: 40000.00,
      status: 'Active'
    },
    {
      id: 'LOAN-002',
      employee: 'Sarah Wilson',
      loan_type: 'Home Loan',
      loan_amount: 100000.00,
      interest_rate: 7.0,
      disbursement_date: '2024-03-01',
      repayment_start: '2024-04-01',
      monthly_repayment: 5000.00,
      total_paid: 35000.00,
      balance: 65000.00,
      status: 'Active'
    },
    {
      id: 'LOAN-003',
      employee: 'David Lee',
      loan_type: 'Emergency Loan',
      loan_amount: 15000.00,
      interest_rate: 5.0,
      disbursement_date: '2024-08-01',
      repayment_start: '2024-09-01',
      monthly_repayment: 1500.00,
      total_paid: 3000.00,
      balance: 12000.00,
      status: 'Active'
    },
    {
      id: 'LOAN-004',
      employee: 'Emily Chen',
      loan_type: 'Education Loan',
      loan_amount: 25000.00,
      interest_rate: 6.5,
      disbursement_date: '2024-01-01',
      repayment_start: '2024-02-01',
      monthly_repayment: 2000.00,
      total_paid: 18000.00,
      balance: 7000.00,
      status: 'Active'
    }
  ]

  // Dummy data for timesheet-based payroll
  const timesheetPayrolls = [
    {
      id: 'TS-001',
      employee: 'Michael Brown',
      role: 'Consultant',
      hours_logged: 160,
      hourly_rate: 75.00,
      total_billable: 12000.00,
      month: 'October 2024',
      status: 'Approved'
    },
    {
      id: 'TS-002',
      employee: 'Lisa Martinez',
      role: 'Senior Consultant',
      hours_logged: 152,
      hourly_rate: 95.00,
      total_billable: 14440.00,
      month: 'October 2024',
      status: 'Approved'
    },
    {
      id: 'TS-003',
      employee: 'Robert Taylor',
      role: 'Technical Consultant',
      hours_logged: 168,
      hourly_rate: 85.00,
      total_billable: 14280.00,
      month: 'October 2024',
      status: 'Pending'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/signup')
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'approved':
      case 'submitted':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'in progress':
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
                <span className="text-gray-600">Payroll</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll</h1>
          <p className="text-gray-600">
            Seeing a 'salary credited' message often brings a smile to your face, but there's a lot of work that goes into that. 
            Diverse pay structures, complex regional tax regulations, and accurate generation of payslips for a large team can feel overwhelming. 
            We're making all of this easier with a feature-packed payroll module. Cut ties with disparate payroll and accounting systems 
            to save hours of reconciliation work every month on payroll and expense data. Frappe HR promises integrated accounting with your payroll.
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
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <shortcut.icon className="w-5 h-5 text-green-600" />
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
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
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
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
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
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-8 px-6 min-w-max">
              <button
                onClick={() => setActiveTab('structures')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'structures'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Salary Structures
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('bulk-assign')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'bulk-assign'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Bulk Assignment
                </button>
              )}
              <button
                onClick={() => setActiveTab('payslips')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'payslips'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payslips
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('payroll-runs')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'payroll-runs'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Payroll Runs
                  </button>
                  <button
                    onClick={() => setActiveTab('additional')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'additional'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Additional Salary
                  </button>
                  <button
                    onClick={() => setActiveTab('cost-centers')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'cost-centers'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Cost Centers
                  </button>
                  <button
                    onClick={() => setActiveTab('multi-currency')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'multi-currency'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Multi-Currency
                  </button>
                </>
              )}
              <button
                onClick={() => setActiveTab('loans')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'loans'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Employee Loans
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('timesheet')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'timesheet'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Timesheet Payroll
                </button>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Salary Structures Tab */}
            {activeTab === 'structures' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Salary Structures</h3>
                  {isAdmin && (
                    <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Create Structure</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {salaryStructures.map((structure) => (
                    <div key={structure.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{structure.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{structure.company} • {structure.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          structure.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {structure.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Currency</p>
                          <p className="text-lg font-semibold text-gray-900">{structure.currency}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Frequency</p>
                          <p className="text-sm font-semibold text-gray-900">{structure.payroll_frequency}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Employees</p>
                          <p className="text-lg font-semibold text-gray-900">{structure.employees}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Earnings ({structure.earnings.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {structure.earnings.slice(0, 3).map((earning, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {earning}
                            </span>
                          ))}
                          {structure.earnings.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{structure.earnings.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Deductions ({structure.deductions.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {structure.deductions.map((deduction, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                              {deduction}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        {isAdmin && (
                          <>
                            <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                              <Users className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bulk Assignment Tab (Admin only) */}
            {activeTab === 'bulk-assign' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Bulk Salary Structure Assignment</h3>
                  <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Assignment</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignment ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary Structure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employees
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bulkAssignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {assignment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {assignment.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {assignment.structure}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {assignment.employees}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {assignment.assigned_by}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payslips Tab */}
            {activeTab === 'payslips' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Salary Slips</h3>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    {isAdmin && (
                      <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview All</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payslip ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gross Pay
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deductions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Pay
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
                      {payslips.map((payslip) => (
                        <tr key={payslip.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {payslip.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payslip.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {payslip.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${payslip.gross_pay.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            -${payslip.deductions.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ${payslip.net_pay.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payslip.status)}`}>
                              {payslip.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payroll Runs Tab (Admin only) */}
            {activeTab === 'payroll-runs' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Payroll Runs</h3>
                  <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Run Payroll</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {payrollRuns.map((run) => (
                    <div key={run.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{run.month}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {run.start_date} to {run.end_date} | {run.id}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                          {run.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <p className="text-xs text-gray-500">Employees</p>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{run.employees}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <p className="text-xs text-gray-500">Total Gross</p>
                          </div>
                          <p className="text-xl font-bold text-green-600">${(run.total_gross / 1000).toFixed(1)}k</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-xs text-gray-500">Deductions</p>
                          </div>
                          <p className="text-xl font-bold text-red-600">${(run.total_deductions / 1000).toFixed(1)}k</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                            <p className="text-xs text-gray-500">Net Pay</p>
                          </div>
                          <p className="text-xl font-bold text-purple-600">${(run.total_net / 1000).toFixed(1)}k</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>Processed by {run.processed_by}</span>
                        <span>{run.processed_date}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download Report</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Salary Tab (Admin only) */}
            {activeTab === 'additional' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Salary & Off-Cycle Payments</h3>
                  <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Payment</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment ID
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
                          Payroll Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason
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
                      {additionalSalaries.map((salary) => (
                        <tr key={salary.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {salary.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {salary.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {salary.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ${salary.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {salary.payroll_date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                            {salary.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(salary.status)}`}>
                              {salary.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            {salary.status === 'Pending' && (
                              <button className="text-green-600 hover:text-green-900">Approve</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cost Centers Tab (Admin only) */}
            {activeTab === 'cost-centers' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payroll Cost Center Allocation</h3>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">
                        ${costCenters.reduce((sum, cc) => sum + cc.allocated_amount, 0).toLocaleString()}
                      </h4>
                      <p className="text-sm text-gray-600">Total Payroll Allocation</p>
                    </div>
                    <Building2 className="w-12 h-12 text-green-600 opacity-50" />
                  </div>
                </div>

                <div className="space-y-6">
                  {costCenters.map((center, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{center.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{center.employees} employees</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ${center.allocated_amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">{center.percentage}% of total</p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`${center.color} h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                          style={{ width: `${center.percentage}%` }}
                        >
                          <span className="text-xs font-medium text-white">{center.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Currency Tab (Admin only) */}
            {activeTab === 'multi-currency' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Multi-Currency Payroll</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currencyPayrolls.map((currency, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Globe className="w-10 h-10 text-green-600" />
                        <span className="text-3xl font-bold text-gray-900">{currency.currency}</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {currency.currency === 'USD' ? '$' : currency.currency === 'EUR' ? '€' : '£'}
                            {currency.total_amount.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Employees</p>
                            <p className="text-lg font-semibold text-gray-900">{currency.employees}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Rate</p>
                            <p className="text-lg font-semibold text-gray-900">{currency.exchange_rate}</p>
                          </div>
                        </div>

                        {currency.currency !== 'USD' && (
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">USD Equivalent</p>
                            <p className="text-lg font-semibold text-green-600">
                              ${(currency.total_amount * currency.exchange_rate).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Employee Loans Tab */}
            {activeTab === 'loans' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Employee Loans</h3>
                  {!isAdmin && (
                    <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Request Loan</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {employeeLoans.map((loan) => (
                    <div key={loan.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{loan.employee}</h4>
                          <p className="text-sm text-gray-600 mt-1">{loan.loan_type} • {loan.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Loan Amount</p>
                          <p className="text-lg font-bold text-gray-900">${loan.loan_amount.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Interest Rate</p>
                          <p className="text-lg font-bold text-blue-600">{loan.interest_rate}%</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Monthly EMI</p>
                          <p className="text-lg font-bold text-purple-600">${loan.monthly_repayment.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Total Paid</p>
                          <p className="text-lg font-bold text-green-600">${loan.total_paid.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Balance</p>
                          <p className="text-lg font-bold text-orange-600">${loan.balance.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Repayment Progress</span>
                          <span>{Math.round((loan.total_paid / loan.loan_amount) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${(loan.total_paid / loan.loan_amount) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Disbursed: {loan.disbursement_date}</span>
                        <span>Repayment Start: {loan.repayment_start}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timesheet-based Payroll Tab (Admin only) */}
            {activeTab === 'timesheet' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Timesheet-Based Payroll</h3>
                  <button className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Process Timesheets</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timesheet ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hours Logged
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hourly Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Billable
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
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
                      {timesheetPayrolls.map((timesheet) => (
                        <tr key={timesheet.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {timesheet.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timesheet.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {timesheet.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {timesheet.hours_logged} hrs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${timesheet.hourly_rate}/hr
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ${timesheet.total_billable.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {timesheet.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(timesheet.status)}`}>
                              {timesheet.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            {timesheet.status === 'Pending' && (
                              <button className="text-green-600 hover:text-green-900">Approve</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollPage


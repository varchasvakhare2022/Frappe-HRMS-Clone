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
  AlertCircle,
  Receipt,
  Building2,
  PieChart,
  Upload,
  XCircle,
  Info,
  Percent,
  Calculator
} from 'lucide-react'

const PayrollTaxReportsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tax-slabs')

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role?.toLowerCase().includes('admin')

  // Shortcuts based on role
  const employeeShortcuts = [
    { label: 'Tax Declaration', icon: FileText, link: null },
    { label: 'Submit Proofs', icon: Upload, link: null },
    { label: 'View Tax Breakup', icon: Calculator, link: null },
    { label: 'Download Payslip', icon: Download, link: null }
  ]

  const adminShortcuts = [
    { label: 'Configure Tax Slabs', icon: Settings, link: null },
    { label: 'Tax Computation Report', icon: Calculator, link: null },
    { label: 'Salary Register', icon: BarChart3, link: null },
    { label: 'Compliance Reports', icon: FileText, link: null },
    { label: 'Accounting Reports', icon: Building2, link: null },
    { label: 'Export All', icon: Download, link: null }
  ]

  const shortcuts = isAdmin ? adminShortcuts : employeeShortcuts

  // Reports & Masters
  const reportsAndMasters = {
    reports: [
      { name: 'Income Tax Computation', icon: Calculator },
      { name: 'Salary Register', icon: BarChart3 },
      { name: 'Tax Deduction Report', icon: Percent },
      { name: 'Form 16 Generation', icon: FileText },
      { name: 'Compliance Summary', icon: CheckCircle },
      { name: 'Accounting Ledger', icon: Building2 }
    ],
    masters: [
      { name: 'Tax Slabs', icon: Settings },
      { name: 'Tax Exemptions', icon: Receipt },
      { name: 'Tax Regimes', icon: FileText },
      { name: 'Proof Categories', icon: Upload }
    ]
  }

  // Dummy data for tax slabs
  const taxSlabs = [
    {
      id: 'TS-2024-001',
      name: 'Income Tax Slab 2024 - New Regime',
      regime: 'New Regime',
      fiscal_year: '2024-2025',
      slabs: [
        { from: 0, to: 300000, rate: 0, description: 'Up to ₹3,00,000' },
        { from: 300000, to: 600000, rate: 5, description: '₹3,00,001 to ₹6,00,000' },
        { from: 600000, to: 900000, rate: 10, description: '₹6,00,001 to ₹9,00,000' },
        { from: 900000, to: 1200000, rate: 15, description: '₹9,00,001 to ₹12,00,000' },
        { from: 1200000, to: 1500000, rate: 20, description: '₹12,00,001 to ₹15,00,000' },
        { from: 1500000, to: null, rate: 30, description: 'Above ₹15,00,000' }
      ],
      isActive: true
    },
    {
      id: 'TS-2024-002',
      name: 'Income Tax Slab 2024 - Old Regime',
      regime: 'Old Regime',
      fiscal_year: '2024-2025',
      slabs: [
        { from: 0, to: 250000, rate: 0, description: 'Up to ₹2,50,000' },
        { from: 250000, to: 500000, rate: 5, description: '₹2,50,001 to ₹5,00,000' },
        { from: 500000, to: 1000000, rate: 20, description: '₹5,00,001 to ₹10,00,000' },
        { from: 1000000, to: null, rate: 30, description: 'Above ₹10,00,000' }
      ],
      isActive: true
    }
  ]

  // Dummy data for tax declarations
  const taxDeclarations = [
    {
      id: 'TD-2024-001',
      employee: user.name || 'John Doe',
      fiscal_year: '2024-2025',
      regime: 'Old Regime',
      declaration_date: '2024-04-15',
      total_declared: 150000,
      proofs_submitted: 125000,
      proofs_pending: 25000,
      status: 'Partially Submitted',
      categories: [
        { name: 'House Rent Allowance (HRA)', declared: 50000, submitted: 50000, status: 'Verified' },
        { name: 'Section 80C (PPF, LIC)', declared: 50000, submitted: 50000, status: 'Verified' },
        { name: 'Section 80D (Medical Insurance)', declared: 25000, submitted: 25000, status: 'Verified' },
        { name: 'Home Loan Interest (24b)', declared: 25000, submitted: 0, status: 'Pending' }
      ]
    }
  ]

  // Dummy data for tax breakup on payslips
  const taxBreakups = [
    {
      month: 'October 2024',
      employee: user.name || 'John Doe',
      gross_salary: 100000,
      standard_deduction: 50000,
      declared_exemptions: 150000,
      taxable_income: 900000,
      tax_components: [
        { slab: 'Up to ₹3,00,000', tax: 0 },
        { slab: '₹3,00,001 to ₹6,00,000', tax: 15000 },
        { slab: '₹6,00,001 to ₹9,00,000', tax: 30000 },
        { slab: 'Above ₹9,00,000', tax: 0 }
      ],
      total_tax: 45000,
      cess: 1800,
      monthly_tds: 3900,
      tax_paid_ytd: 35100,
      tax_remaining: 11700
    }
  ]

  // Dummy data for income tax computation
  const taxComputationData = [
    {
      employee: 'John Doe',
      employee_id: 'EMP-001',
      pan: 'ABCDE1234F',
      gross_annual: 1200000,
      exemptions: 150000,
      deductions_80c: 150000,
      deductions_80d: 25000,
      other_deductions: 25000,
      taxable_income: 850000,
      tax_payable: 75000,
      cess: 3000,
      total_tax: 78000,
      tds_deducted: 78000,
      tax_refund: 0,
      regime: 'Old Regime'
    },
    {
      employee: 'Sarah Wilson',
      employee_id: 'EMP-002',
      pan: 'FGHIJ5678K',
      gross_annual: 1800000,
      exemptions: 0,
      deductions_80c: 0,
      deductions_80d: 0,
      other_deductions: 0,
      taxable_income: 1800000,
      tax_payable: 195000,
      cess: 7800,
      total_tax: 202800,
      tds_deducted: 202800,
      tax_refund: 0,
      regime: 'New Regime'
    },
    {
      employee: 'Mike Johnson',
      employee_id: 'EMP-003',
      pan: 'LMNOP9012Q',
      gross_annual: 950000,
      exemptions: 100000,
      deductions_80c: 100000,
      deductions_80d: 25000,
      other_deductions: 0,
      taxable_income: 725000,
      tax_payable: 56250,
      cess: 2250,
      total_tax: 58500,
      tds_deducted: 58500,
      tax_refund: 0,
      regime: 'Old Regime'
    }
  ]

  // Dummy data for salary register
  const salaryRegister = [
    {
      month: 'October 2024',
      total_employees: 45,
      total_gross: 4500000,
      total_deductions: 720000,
      total_tds: 351000,
      total_pf: 180000,
      total_esi: 67500,
      other_deductions: 121500,
      total_net: 3780000,
      processed_date: '2024-10-28'
    },
    {
      month: 'September 2024',
      total_employees: 45,
      total_gross: 4500000,
      total_deductions: 720000,
      total_tds: 351000,
      total_pf: 180000,
      total_esi: 67500,
      other_deductions: 121500,
      total_net: 3780000,
      processed_date: '2024-09-28'
    },
    {
      month: 'August 2024',
      total_employees: 42,
      total_gross: 4200000,
      total_deductions: 672000,
      total_tds: 327600,
      total_pf: 168000,
      total_esi: 63000,
      other_deductions: 113400,
      total_net: 3528000,
      processed_date: '2024-08-28'
    }
  ]

  // Dummy data for compliance reports
  const complianceReports = [
    {
      type: 'PF Compliance',
      period: 'October 2024',
      employees_covered: 45,
      employer_contribution: 90000,
      employee_contribution: 90000,
      total_amount: 180000,
      filing_due_date: '2024-11-15',
      status: 'Pending'
    },
    {
      type: 'ESI Compliance',
      period: 'October 2024',
      employees_covered: 30,
      employer_contribution: 45000,
      employee_contribution: 22500,
      total_amount: 67500,
      filing_due_date: '2024-11-21',
      status: 'Pending'
    },
    {
      type: 'TDS Filing (Form 24Q)',
      period: 'Q2 2024-25',
      employees_covered: 45,
      total_tds: 1053000,
      filing_due_date: '2024-10-31',
      status: 'Filed'
    },
    {
      type: 'Professional Tax',
      period: 'October 2024',
      employees_covered: 45,
      total_amount: 45000,
      filing_due_date: '2024-11-10',
      status: 'Pending'
    }
  ]

  // Dummy data for accounting reports
  const accountingReports = [
    {
      account: 'Salary Expense',
      account_type: 'Expense',
      debit: 4500000,
      credit: 0,
      balance: 4500000
    },
    {
      account: 'TDS Payable',
      account_type: 'Liability',
      debit: 0,
      credit: 351000,
      balance: 351000
    },
    {
      account: 'PF Payable',
      account_type: 'Liability',
      debit: 0,
      credit: 180000,
      balance: 180000
    },
    {
      account: 'ESI Payable',
      account_type: 'Liability',
      debit: 0,
      credit: 67500,
      balance: 67500
    },
    {
      account: 'Professional Tax Payable',
      account_type: 'Liability',
      debit: 0,
      credit: 45000,
      balance: 45000
    },
    {
      account: 'Salary Payable',
      account_type: 'Liability',
      debit: 0,
      credit: 3780000,
      balance: 3780000
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/signup')
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
      case 'filed':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'partially submitted':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
      case 'overdue':
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
                <span className="text-gray-600">Payroll Tax & Reports</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Tax & Reports</h1>
          <p className="text-gray-600">
            Frappe HR's flexibility enables you to map tax configurations for any region. Define income tax slabs, 
            manage tax exemptions, and proof submissions. Stay informed throughout your payroll period with tax breakups 
            on salary slips and the income tax computation report.
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
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <shortcut.icon className="w-5 h-5 text-indigo-600" />
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
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
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
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('tax-slabs')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'tax-slabs'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Tax Slabs
                </button>
              )}
              <button
                onClick={() => setActiveTab('declarations')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'declarations'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tax Declarations
              </button>
              <button
                onClick={() => setActiveTab('tax-breakup')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'tax-breakup'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tax Breakup
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('computation')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'computation'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Tax Computation
                  </button>
                  <button
                    onClick={() => setActiveTab('salary-register')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'salary-register'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Salary Register
                  </button>
                  <button
                    onClick={() => setActiveTab('compliance')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'compliance'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Compliance Reports
                  </button>
                  <button
                    onClick={() => setActiveTab('accounting')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'accounting'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Accounting Reports
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Tax Slabs Tab (Admin only) */}
            {activeTab === 'tax-slabs' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Income Tax Slabs Configuration</h3>
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Tax Slab</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {taxSlabs.map((taxSlab) => (
                    <div key={taxSlab.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{taxSlab.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {taxSlab.regime} • FY {taxSlab.fiscal_year}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          taxSlab.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {taxSlab.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-white">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Income Range
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Tax Rate
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {taxSlab.slabs.map((slab, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                  {slab.description}
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold text-indigo-600">
                                  {slab.rate}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                          {taxSlab.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tax Declarations Tab */}
            {activeTab === 'declarations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Tax Declarations & Exemption Proofs</h3>
                  {!isAdmin && (
                    <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Declaration</span>
                    </button>
                  )}
                </div>

                {taxDeclarations.map((declaration) => (
                  <div key={declaration.id} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{declaration.employee}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          FY {declaration.fiscal_year} • {declaration.regime}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(declaration.status)}`}>
                        {declaration.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Total Declared</p>
                        <p className="text-2xl font-bold text-gray-900">₹{declaration.total_declared.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Proofs Submitted</p>
                        <p className="text-2xl font-bold text-green-600">₹{declaration.proofs_submitted.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">₹{declaration.proofs_pending.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-gray-900 mb-3">Declaration Categories</h5>
                      {declaration.categories.map((category, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{category.name}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Declared: ₹{category.declared.toLocaleString()} | 
                                Submitted: ₹{category.submitted.toLocaleString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                              {category.status}
                            </span>
                          </div>
                          {category.status === 'Pending' && !isAdmin && (
                            <button className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 flex items-center space-x-1">
                              <Upload className="w-3 h-3" />
                              <span>Upload Proof</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tax Breakup Tab */}
            {activeTab === 'tax-breakup' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Income Tax Breakup on Salary Slip</h3>

                {taxBreakups.map((breakup, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-900">{breakup.employee}</h4>
                      <p className="text-sm text-gray-600">{breakup.month}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-gray-900 mb-3">Income Calculation</h5>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Gross Annual Salary</span>
                          <span className="text-sm font-medium">₹{breakup.gross_salary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Less: Standard Deduction</span>
                          <span className="text-sm font-medium text-red-600">-₹{breakup.standard_deduction.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Less: Declared Exemptions</span>
                          <span className="text-sm font-medium text-red-600">-₹{breakup.declared_exemptions.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span className="text-sm font-semibold text-gray-900">Taxable Income</span>
                          <span className="text-sm font-bold text-gray-900">₹{breakup.taxable_income.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-gray-900 mb-3">Tax Computation</h5>
                        {breakup.tax_components.map((component, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-sm text-gray-600">{component.slab}</span>
                            <span className="text-sm font-medium">₹{component.tax.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-900">Tax on Income</span>
                            <span className="text-sm font-medium">₹{breakup.total_tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Add: Health & Education Cess (4%)</span>
                            <span className="text-sm font-medium">₹{breakup.cess.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-indigo-100 rounded-lg p-4">
                        <p className="text-xs text-indigo-600 mb-1">Monthly TDS</p>
                        <p className="text-xl font-bold text-indigo-700">₹{breakup.monthly_tds.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4">
                        <p className="text-xs text-green-600 mb-1">Tax Paid (YTD)</p>
                        <p className="text-xl font-bold text-green-700">₹{breakup.tax_paid_ytd.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-100 rounded-lg p-4">
                        <p className="text-xs text-orange-600 mb-1">Tax Remaining</p>
                        <p className="text-xl font-bold text-orange-700">₹{breakup.tax_remaining.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-4">
                        <p className="text-xs text-blue-600 mb-1">Annual Tax</p>
                        <p className="text-xl font-bold text-blue-700">₹{(breakup.total_tax + breakup.cess).toLocaleString()}</p>
                      </div>
                    </div>

                    <button className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Detailed Payslip</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tax Computation Tab (Admin only) */}
            {activeTab === 'computation' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Income Tax Computation Report</h3>
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PAN</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Annual</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exemptions</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">80C</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">80D</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxable Income</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Tax</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TDS</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Refund</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regime</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {taxComputationData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{data.employee}</div>
                            <div className="text-xs text-gray-500">{data.employee_id}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.pan}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">₹{data.gross_annual.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">-₹{data.exemptions.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">-₹{data.deductions_80c.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">-₹{data.deductions_80d.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{data.taxable_income.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">₹{data.total_tax.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">₹{data.tds_deducted.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            {data.tax_refund > 0 ? (
                              <span className="text-green-600">₹{data.tax_refund.toLocaleString()}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {data.regime}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Salary Register Tab (Admin only) */}
            {activeTab === 'salary-register' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Salary Register Report</h3>
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Register</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {salaryRegister.map((register, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{register.month}</h4>
                        <span className="text-sm text-gray-500">Processed on {register.processed_date}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <p className="text-xs text-gray-500">Employees</p>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{register.total_employees}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <p className="text-xs text-gray-500">Total Gross</p>
                          </div>
                          <p className="text-xl font-bold text-green-600">₹{(register.total_gross / 100000).toFixed(1)}L</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-xs text-gray-500">Total Deductions</p>
                          </div>
                          <p className="text-xl font-bold text-red-600">₹{(register.total_deductions / 100000).toFixed(1)}L</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                            <p className="text-xs text-gray-500">Net Payable</p>
                          </div>
                          <p className="text-xl font-bold text-purple-600">₹{(register.total_net / 100000).toFixed(1)}L</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Deduction Breakup</h5>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">TDS Deducted</p>
                            <p className="text-lg font-semibold text-gray-900">₹{register.total_tds.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">PF Contribution</p>
                            <p className="text-lg font-semibold text-gray-900">₹{register.total_pf.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ESI Contribution</p>
                            <p className="text-lg font-semibold text-gray-900">₹{register.total_esi.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Other Deductions</p>
                            <p className="text-lg font-semibold text-gray-900">₹{register.other_deductions.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Reports Tab (Admin only) */}
            {activeTab === 'compliance' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance & Statutory Reports</h3>

                <div className="space-y-4">
                  {complianceReports.map((report, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{report.type}</h4>
                          <p className="text-sm text-gray-600 mt-1">{report.period}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Employees Covered</p>
                          <p className="text-lg font-semibold text-gray-900">{report.employees_covered}</p>
                        </div>
                        {report.employer_contribution !== undefined && (
                          <>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-500">Employer Share</p>
                              <p className="text-lg font-semibold text-blue-600">₹{report.employer_contribution.toLocaleString()}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-500">Employee Share</p>
                              <p className="text-lg font-semibold text-green-600">₹{report.employee_contribution.toLocaleString()}</p>
                            </div>
                          </>
                        )}
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-lg font-semibold text-purple-600">
                            ₹{(report.total_amount || report.total_tds).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Due Date: {report.filing_due_date}</span>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download Report</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accounting Reports Tab (Admin only) */}
            {activeTab === 'accounting' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Payroll Accounting Reports</h3>
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export to Accounting</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Payroll Ledger - October 2024</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Debit (₹)</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Credit (₹)</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {accountingReports.map((account, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{account.account}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                account.account_type === 'Expense' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {account.account_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                              {account.debit > 0 ? account.debit.toLocaleString() : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                              {account.credit > 0 ? account.credit.toLocaleString() : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-right font-semibold text-indigo-600">
                              {account.balance.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold">
                          <td className="px-6 py-4 text-sm text-gray-900" colSpan="2">Total</td>
                          <td className="px-6 py-4 text-sm text-right text-gray-900">
                            {accountingReports.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-900">
                            {accountingReports.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-900">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Accounting Integration Active</p>
                      <p className="mt-1">All payroll entries are automatically synced with your accounting system. 
                      Last sync: October 28, 2024 at 11:45 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollTaxReportsPage


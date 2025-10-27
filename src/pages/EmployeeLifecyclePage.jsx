import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, ChevronRight, Calendar, Clock, FileText, TrendingUp,
  User, Users, Settings, Bell, HelpCircle, LogOut, Search,
  Plus, Filter, Download, Eye, Edit, Trash2, Check, X,
  ArrowRight, MapPin, MoreVertical, AlertCircle, UserCheck,
  Briefcase, Target, Send, MessageSquare, Star, Award,
  BarChart3, DollarSign, Building, Mail, UserPlus, GitBranch,
  FileCheck, AlertTriangle, CheckCircle
} from 'lucide-react'

function EmployeeLifecyclePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('directory')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/signup')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [navigate])

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

  const isAdmin = user.role?.toLowerCase().includes('admin')

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  // Dummy Data
  const employees = [
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      department: 'Engineering',
      designation: 'Senior Developer',
      manager: 'John Manager',
      joinDate: '2022-01-15',
      status: 'Active',
      location: 'New York'
    },
    {
      id: 'EMP-002',
      name: 'Raj Kumar',
      email: 'raj.k@company.com',
      department: 'Sales',
      designation: 'Sales Executive',
      manager: 'Emma Lead',
      joinDate: '2023-03-20',
      status: 'Active',
      location: 'Remote'
    },
    {
      id: 'EMP-003',
      name: 'Emma Thompson',
      email: 'emma.t@company.com',
      department: 'Marketing',
      designation: 'Marketing Manager',
      manager: 'CEO',
      joinDate: '2021-06-10',
      status: 'Active',
      location: 'San Francisco'
    },
    {
      id: 'EMP-004',
      name: 'Li Wei',
      email: 'li.w@company.com',
      department: 'Engineering',
      designation: 'Junior Developer',
      manager: 'Sarah Johnson',
      joinDate: '2024-01-08',
      status: 'Probation',
      location: 'Remote'
    },
    {
      id: 'EMP-005',
      name: 'José García',
      email: 'jose.g@company.com',
      department: 'Human Resources',
      designation: 'HR Specialist',
      manager: 'Jane HR',
      joinDate: '2023-09-12',
      status: 'Active',
      location: 'Chicago'
    }
  ]

  const onboarding = [
    {
      id: 'ONB-001',
      employee: 'Alex Chen',
      designation: 'Software Engineer',
      department: 'Engineering',
      joinDate: '2024-11-15',
      status: 'In Progress',
      progress: 60,
      tasks: { completed: 6, total: 10 }
    },
    {
      id: 'ONB-002',
      employee: 'Maria Rodriguez',
      designation: 'Product Manager',
      department: 'Product',
      joinDate: '2024-11-20',
      status: 'Pending',
      progress: 0,
      tasks: { completed: 0, total: 12 }
    },
    {
      id: 'ONB-003',
      employee: 'David Kim',
      designation: 'Data Analyst',
      department: 'Analytics',
      joinDate: '2024-10-28',
      status: 'Completed',
      progress: 100,
      tasks: { completed: 8, total: 8 }
    }
  ]

  const promotionsTransfers = [
    {
      id: 'PT-001',
      employee: 'Sarah Johnson',
      type: 'Promotion',
      from: 'Developer',
      to: 'Senior Developer',
      department: 'Engineering',
      effectiveDate: '2024-11-01',
      status: 'Approved',
      salary: '+15%'
    },
    {
      id: 'PT-002',
      employee: 'Raj Kumar',
      type: 'Transfer',
      from: 'Marketing',
      to: 'Sales',
      department: 'Sales',
      effectiveDate: '2024-12-01',
      status: 'Pending',
      salary: 'No change'
    },
    {
      id: 'PT-003',
      employee: 'Emma Thompson',
      type: 'Promotion',
      from: 'Marketing Executive',
      to: 'Marketing Manager',
      department: 'Marketing',
      effectiveDate: '2024-10-15',
      status: 'Completed',
      salary: '+20%'
    }
  ]

  const grievances = [
    {
      id: 'GRV-001',
      employee: 'Anonymous',
      category: 'Workplace Harassment',
      priority: 'High',
      submittedDate: '2024-10-25',
      status: 'Under Investigation',
      assignedTo: 'HR Department'
    },
    {
      id: 'GRV-002',
      employee: 'John Doe',
      category: 'Salary Dispute',
      priority: 'Medium',
      submittedDate: '2024-10-22',
      status: 'Resolved',
      assignedTo: 'Jane HR'
    },
    {
      id: 'GRV-003',
      employee: 'Sarah Johnson',
      category: 'Work Environment',
      priority: 'Low',
      submittedDate: '2024-10-20',
      status: 'Acknowledged',
      assignedTo: 'John Manager'
    }
  ]

  const exitInterviews = [
    {
      id: 'EXIT-001',
      employee: 'Michael Brown',
      designation: 'Senior Developer',
      lastDay: '2024-11-30',
      reason: 'Better Opportunity',
      interviewDate: '2024-11-15',
      status: 'Scheduled',
      rating: null
    },
    {
      id: 'EXIT-002',
      employee: 'Lisa Anderson',
      designation: 'Marketing Manager',
      lastDay: '2024-10-31',
      reason: 'Relocation',
      interviewDate: '2024-10-25',
      status: 'Completed',
      rating: 4.5
    },
    {
      id: 'EXIT-003',
      employee: 'Tom Wilson',
      designation: 'Sales Executive',
      lastDay: '2024-12-15',
      reason: 'Career Change',
      interviewDate: '2024-12-01',
      status: 'Pending',
      rating: null
    }
  ]

  const fullFinalSettlement = [
    {
      id: 'FFS-001',
      employee: 'Michael Brown',
      lastDay: '2024-11-30',
      salary: '$8,500',
      leaveEncashment: '$2,100',
      bonus: '$3,000',
      deductions: '$500',
      netPayable: '$13,100',
      status: 'Pending'
    },
    {
      id: 'FFS-002',
      employee: 'Lisa Anderson',
      lastDay: '2024-10-31',
      salary: '$7,200',
      leaveEncashment: '$1,800',
      bonus: '$2,500',
      deductions: '$300',
      netPayable: '$11,200',
      status: 'Paid'
    }
  ]

  const shortcuts = [
    { icon: UserPlus, label: 'Add Employee', count: null },
    { icon: GitBranch, label: 'Org Chart', count: null },
    { icon: FileCheck, label: 'Onboarding', count: onboarding.filter(o => o.status !== 'Completed').length },
    { icon: AlertTriangle, label: 'Grievances', count: grievances.filter(g => g.status !== 'Resolved').length }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'probation': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'approved': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'under investigation': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200'
      case 'acknowledged': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'paid': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
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

  const renderContent = () => {
    switch (selectedSection) {
      case 'directory':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Employee Directory</h2>
                <p className="text-sm text-gray-600 mt-1">Comprehensive employee repository</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                {isAdmin && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Employee
                  </button>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {employees.map((employee) => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {getInitials(employee.name)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}>
                              {employee.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">Employee ID</p>
                              <p className="font-medium text-gray-900">{employee.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Designation</p>
                              <p className="font-medium text-gray-900">{employee.designation}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Department</p>
                              <p className="font-medium text-gray-900">{employee.department}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Join Date</p>
                              <p className="font-medium text-gray-900">{employee.joinDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {employee.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {employee.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Reports to: {employee.manager}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {isAdmin && (
                          <>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'onboarding':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Onboarding</h2>
                <p className="text-sm text-gray-600 mt-1">Track new employee onboarding progress</p>
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  New Onboarding
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {onboarding.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                          {getInitials(item.employee)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.employee}</h3>
                          <p className="text-sm text-gray-600">{item.designation} • {item.department}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Join Date</p>
                        <p className="text-sm font-medium text-gray-900">{item.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tasks</p>
                        <p className="text-sm font-medium text-gray-900">{item.tasks.completed}/{item.tasks.total} completed</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <p className="text-sm font-medium text-gray-900">{item.progress}%</p>
                      </div>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-green-600 transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'promotions':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Promotions & Transfers</h2>
                <p className="text-sm text-gray-600 mt-1">Manage employee career progression</p>
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {promotionsTransfers.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.employee}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.type === 'Promotion' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.from}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{item.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.effectiveDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          {isAdmin && item.status === 'Pending' && (
                            <>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'grievances':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Employee Grievances</h2>
                <p className="text-sm text-gray-600 mt-1">Track and resolve employee concerns</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                <Plus className="w-4 h-4" />
                Submit Grievance
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {grievances.map((grievance) => (
                  <div key={grievance.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-900">{grievance.id}</span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(grievance.priority)}`}>
                            {grievance.priority} Priority
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(grievance.status)}`}>
                            {grievance.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3"><strong>Category:</strong> {grievance.category}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Submitted By</p>
                            <p className="font-medium text-gray-900">{grievance.employee}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Assigned To</p>
                            <p className="font-medium text-gray-900">{grievance.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Submitted Date</p>
                            <p className="font-medium text-gray-900">{grievance.submittedDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {isAdmin && (
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'exits':
        return (
          <div className="space-y-6">
            {/* Exit Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Exit Interviews</h2>
                  <p className="text-sm text-gray-600 mt-1">Document employee feedback before departure</p>
                </div>
                {isAdmin && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" />
                    Schedule Interview
                  </button>
                )}
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {exitInterviews.map((exit) => (
                    <div key={exit.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                              {getInitials(exit.employee)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{exit.employee}</h3>
                              <p className="text-sm text-gray-600">{exit.designation}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(exit.status)}`}>
                              {exit.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">Last Working Day</p>
                              <p className="font-medium text-gray-900">{exit.lastDay}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Interview Date</p>
                              <p className="font-medium text-gray-900">{exit.interviewDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Reason</p>
                              <p className="font-medium text-gray-900">{exit.reason}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Rating</p>
                              {renderRating(exit.rating)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          {isAdmin && (
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full & Final Settlement */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Full & Final Settlement</h2>
                <p className="text-sm text-gray-600 mt-1">Settle employee dues and clearances</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Encashment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Payable</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fullFinalSettlement.map((settlement) => (
                      <tr key={settlement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{settlement.employee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{settlement.lastDay}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.salary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{settlement.leaveEncashment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{settlement.bonus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-{settlement.deductions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{settlement.netPayable}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(settlement.status)}`}>
                            {settlement.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">Employee Lifecycle</span>
            </div>

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Lifecycle</h1>
          <p className="text-gray-600">From onboarding to exits - manage the complete employee journey</p>
        </div>

        {/* Shortcuts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shortcuts.map((shortcut, index) => (
              <button
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all hover:scale-105 flex flex-col items-center gap-3 group"
              >
                <div className="p-3 bg-orange-50 rounded-lg text-orange-600 group-hover:bg-orange-100 transition-colors">
                  <shortcut.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{shortcut.label}</p>
                  {shortcut.count !== null && (
                    <p className="text-xs text-gray-500 mt-1">{shortcut.count} items</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reports & Masters Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports & Masters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Column 1: Employee Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Employee Management</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('directory')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Employee Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('onboarding')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Org Chart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Career & Growth */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Career & Growth</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('promotions')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Promotions & Transfers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('grievances')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Grievances</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Employee Reminders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 3: Exit Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Exit Management</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('exits')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Exit Interviews</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('exits')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Full & Final Settlement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Employee Clearance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          {selectedSection && (
            <div className="mt-6">
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeLifecyclePage


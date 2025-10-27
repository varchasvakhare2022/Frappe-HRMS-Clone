import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, ChevronRight, Calendar, Clock, FileText, TrendingUp,
  User, Users, Settings, Bell, HelpCircle, LogOut, Search,
  Plus, Filter, Download, Eye, Edit, Trash2, Check, X,
  ArrowRight, MapPin, MoreVertical, AlertCircle
} from 'lucide-react'

function LeaveManagementPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('applications')

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

  const isAdmin = user.role?.toLowerCase().includes('admin') || 
                  user.role?.toLowerCase().includes('manager') ||
                  user.role?.toLowerCase().includes('hr')

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  // Dummy Data
  const leaveApplications = [
    {
      id: 'LA-2024-001',
      employee: 'Sarah Johnson',
      leaveType: 'Casual Leave',
      fromDate: '2024-12-15',
      toDate: '2024-12-17',
      days: 3,
      status: 'Pending',
      reason: 'Family vacation',
      appliedOn: '2024-10-25'
    },
    {
      id: 'LA-2024-002',
      employee: 'Raj Kumar',
      leaveType: 'Sick Leave',
      fromDate: '2024-11-05',
      toDate: '2024-11-06',
      days: 2,
      status: 'Approved',
      reason: 'Medical checkup',
      appliedOn: '2024-10-20',
      approvedBy: 'John Manager'
    },
    {
      id: 'LA-2024-003',
      employee: 'Emma Thompson',
      leaveType: 'Annual Leave',
      fromDate: '2024-11-10',
      toDate: '2024-11-14',
      days: 5,
      status: 'Approved',
      reason: 'Vacation',
      appliedOn: '2024-10-18',
      approvedBy: 'Jane HR'
    },
    {
      id: 'LA-2024-004',
      employee: 'Li Wei',
      leaveType: 'Casual Leave',
      fromDate: '2024-10-28',
      toDate: '2024-10-29',
      days: 2,
      status: 'Rejected',
      reason: 'Personal work',
      appliedOn: '2024-10-15',
      rejectedBy: 'John Manager',
      rejectionReason: 'Insufficient leave balance'
    },
    {
      id: 'LA-2024-005',
      employee: 'José García',
      leaveType: 'Sick Leave',
      fromDate: '2024-11-01',
      toDate: '2024-11-01',
      days: 1,
      status: 'Pending',
      reason: 'Flu',
      appliedOn: '2024-10-26'
    }
  ]

  const leaveTypes = [
    { name: 'Annual Leave', maxDays: 24, encashment: true, carryForward: true },
    { name: 'Casual Leave', maxDays: 12, encashment: false, carryForward: false },
    { name: 'Sick Leave', maxDays: 10, encashment: false, carryForward: true },
    { name: 'Maternity Leave', maxDays: 180, encashment: false, carryForward: false },
    { name: 'Paternity Leave', maxDays: 15, encashment: false, carryForward: false }
  ]

  const holidayList = [
    { name: 'New Year', date: '2024-01-01', description: 'New Year\'s Day' },
    { name: 'Republic Day', date: '2024-01-26', description: 'Republic Day' },
    { name: 'Holi', date: '2024-03-25', description: 'Festival of Colors' },
    { name: 'Independence Day', date: '2024-08-15', description: 'Independence Day' },
    { name: 'Diwali', date: '2024-11-01', description: 'Festival of Lights' },
    { name: 'Christmas', date: '2024-12-25', description: 'Christmas Day' }
  ]

  const leaveBalance = {
    'Annual Leave': { allocated: 24, taken: 8, pending: 2, available: 14 },
    'Casual Leave': { allocated: 12, taken: 5, pending: 1, available: 6 },
    'Sick Leave': { allocated: 10, taken: 2, pending: 0, available: 8 }
  }

  const shortcuts = isAdmin ? [
    { icon: FileText, label: 'Leave Applications', count: 5 },
    { icon: Calendar, label: 'Leave Calendar', count: null },
    { icon: Users, label: 'Team Leave Report', count: null },
    { icon: Settings, label: 'Leave Settings', count: null }
  ] : [
    { icon: Plus, label: 'Apply for Leave', count: null },
    { icon: Calendar, label: 'Leave Calendar', count: null },
    { icon: TrendingUp, label: 'My Leave Balance', count: null },
    { icon: Clock, label: 'Leave History', count: null }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const renderContent = () => {
    switch (selectedSection) {
      case 'applications':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Leave Applications</h2>
                <p className="text-sm text-gray-600 mt-1">Manage employee leave requests</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                {!isAdmin && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" />
                    New Leave
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From - To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveApplications.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{leave.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.employee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {leave.fromDate} to {leave.toDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{leave.days}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {isAdmin && leave.status === 'Pending' && (
                            <>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'types':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Leave Types</h2>
                <p className="text-sm text-gray-600 mt-1">Configure leave types and policies</p>
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  New Leave Type
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveTypes.map((type, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-3">{type.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Days:</span>
                        <span className="font-medium text-gray-900">{type.maxDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Encashment:</span>
                        <span className={`font-medium ${type.encashment ? 'text-green-600' : 'text-gray-400'}`}>
                          {type.encashment ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carry Forward:</span>
                        <span className={`font-medium ${type.carryForward ? 'text-green-600' : 'text-gray-400'}`}>
                          {type.carryForward ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'holidays':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Holiday List</h2>
                <p className="text-sm text-gray-600 mt-1">Company holidays for 2024</p>
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  Add Holiday
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {holidayList.map((holiday, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-blue-600 font-medium">{new Date(holiday.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                        <span className="text-xl font-bold text-blue-600">{new Date(holiday.date).getDate()}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{holiday.name}</h3>
                        <p className="text-sm text-gray-600">{holiday.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{holiday.date}</span>
                      {isAdmin && (
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'balance':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Leave Balance</h2>
              <p className="text-sm text-gray-600 mt-1">Current leave allocation and usage</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                  <div key={type} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{type}</h3>
                      <span className="text-2xl font-bold text-blue-600">{balance.available}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Allocated</p>
                        <p className="text-lg font-semibold text-gray-900">{balance.allocated}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Taken</p>
                        <p className="text-lg font-semibold text-red-600">{balance.taken}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-lg font-semibold text-yellow-600">{balance.pending}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Available</p>
                        <p className="text-lg font-semibold text-green-600">{balance.available}</p>
                      </div>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-red-500"
                        style={{ width: `${(balance.taken / balance.allocated) * 100}%` }}
                      />
                      <div 
                        className="absolute top-0 h-full bg-yellow-500"
                        style={{ 
                          left: `${(balance.taken / balance.allocated) * 100}%`,
                          width: `${(balance.pending / balance.allocated) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
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
              <span className="text-sm font-semibold text-gray-900">Leave Management</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
          <p className="text-gray-600">Manage employee leaves, holidays, and time-off requests</p>
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
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
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
            {/* Column 1: Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Applications</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('applications')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Leave Applications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('balance')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Leave Balance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Leave Allocation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Configuration */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Configuration</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('types')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Leave Types</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('holidays')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Holiday List</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Leave Policy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 3: Reports */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Reports</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Leave Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Team Leave Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Leave Analytics</span>
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

export default LeaveManagementPage


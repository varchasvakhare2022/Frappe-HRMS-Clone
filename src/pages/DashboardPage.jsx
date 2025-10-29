import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, HelpCircle, Menu, X,
  Briefcase, Folder, Users, Monitor, DollarSign, Wrench, 
  Settings, Link as LinkIcon, Hammer, Info, Zap, Calendar,
  Clock, FileText, TrendingUp, UserCheck, Coffee, Gift,
  AlertCircle, CheckCircle, XCircle, Plus, ArrowRight,
  BarChart3, PieChart, Activity, Target, Award, MessageSquare, Receipt, Smartphone
} from 'lucide-react'

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/signup')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [navigate])

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

  // Check user role
  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')

  // Get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Role-based Quick Actions
  const employeeActions = [
    { icon: MessageSquare, label: 'Daily Updates (SOD/EOD)', color: 'bg-teal-500', link: '/daily-updates' },
    { icon: Folder, label: 'My Projects', color: 'bg-indigo-500', link: '/project-management' },
    { icon: Calendar, label: 'Leave Management', color: 'bg-blue-500', link: '/leave-management' },
    { icon: Clock, label: 'Attendance', color: 'bg-green-500', link: '/attendance' },
    { icon: DollarSign, label: 'Expense Management', color: 'bg-purple-500', link: '/expense-management' },
    { icon: Award, label: 'My Performance', color: 'bg-pink-500', link: '/performance-management' },
    { icon: FileText, label: 'Payroll & Payslips', color: 'bg-teal-500', link: '/payroll' },
    { icon: Smartphone, label: 'Mobile App', color: 'bg-cyan-500', link: '/mobile-app' }
  ]

  const managerActions = [
    { icon: Users, label: 'Employee Management', color: 'bg-blue-600', link: '/employee-management' },
    { icon: Folder, label: 'Project Management', color: 'bg-indigo-600', link: '/project-management' },
    { icon: MessageSquare, label: 'Team Daily Updates', color: 'bg-teal-500', link: '/daily-updates' },
    { icon: FileText, label: 'Approve Leave Requests', color: 'bg-blue-500', link: '/leave-management' },
    { icon: Clock, label: 'Team Attendance', color: 'bg-green-600', link: '/attendance' },
    { icon: Receipt, label: 'Expense Approvals', color: 'bg-indigo-500', link: '/expense-management' },
    { icon: Award, label: 'Performance Reviews', color: 'bg-pink-500', link: '/performance-management' },
    { icon: BarChart3, label: 'Team Reports', color: 'bg-purple-500', link: '/payroll-tax-reports' },
    { icon: Smartphone, label: 'Mobile App', color: 'bg-cyan-500', link: '/mobile-app' }
  ]

  const adminActions = [
    { icon: Users, label: 'User Management', color: 'bg-purple-600', link: '/user-management' },
    { icon: Folder, label: 'Project Management', color: 'bg-indigo-600', link: '/project-management' },
    { icon: MessageSquare, label: 'Team Daily Updates', color: 'bg-teal-500', link: '/daily-updates' },
    { icon: FileText, label: 'Leave Management', color: 'bg-blue-500', link: '/leave-management' },
    { icon: Clock, label: 'Team Attendance', color: 'bg-green-600', link: '/attendance' },
    { icon: Briefcase, label: 'Recruitment', color: 'bg-purple-500', link: '/recruitment' },
    { icon: UserCheck, label: 'Employee Lifecycle', color: 'bg-orange-500', link: '/employee-lifecycle' },
    { icon: Receipt, label: 'Expense Management', color: 'bg-indigo-500', link: '/expense-management' },
    { icon: DollarSign, label: 'Payroll Management', color: 'bg-teal-500', link: '/payroll' },
    { icon: Award, label: 'Performance Management', color: 'bg-pink-500', link: '/performance-management' },
    { icon: BarChart3, label: 'Tax & Reports', color: 'bg-indigo-600', link: '/payroll-tax-reports' },
    { icon: Smartphone, label: 'Mobile App', color: 'bg-cyan-500', link: '/mobile-app' }
  ]

  // Dummy Data for Dashboard
  const dashboardData = {
    stats: {
      attendance: { value: '96.5%', change: '+2.5%', trend: 'up' },
      leaveBalance: { value: '12 days', available: 12, total: 24 },
      pendingApprovals: { value: 5, items: ['3 Leave Requests', '2 Expense Claims'] },
      teamMembers: { value: 24, active: 22, onLeave: 2 }
    },
    quickActions: isAdmin ? adminActions : (isManager ? managerActions : employeeActions),
    recentActivities: [
      { type: 'approved', icon: CheckCircle, text: 'Leave request approved for Dec 15-17', time: '2 hours ago', color: 'text-green-600' },
      { type: 'info', icon: Info, text: 'New payslip generated for November 2024', time: '1 day ago', color: 'text-blue-600' },
      { type: 'pending', icon: Clock, text: 'Expense claim under review - INR 2,450', time: '2 days ago', color: 'text-orange-600' },
      { type: 'alert', icon: AlertCircle, text: 'Performance review cycle starts next week', time: '3 days ago', color: 'text-red-600' },
      { type: 'approved', icon: CheckCircle, text: 'Shift swap request approved', time: '5 days ago', color: 'text-green-600' }
    ],
    upcomingEvents: [
      { date: '28', month: 'Oct', title: 'Team Building Activity', type: 'Company Event' },
      { date: '01', month: 'Nov', title: 'Monthly Town Hall', type: 'Meeting' },
      { date: '15', month: 'Nov', title: 'Performance Review Due', type: 'Deadline' },
      { date: '25', month: 'Dec', title: 'Christmas Holiday', type: 'Holiday' }
    ],
    teamBirthdays: [
      { name: 'Sarah Johnson', date: 'Oct 29', avatar: null },
      { name: 'Raj Kumar', date: 'Nov 02', avatar: null },
      { name: 'Emma Chen', date: 'Nov 08', avatar: null }
    ],
    pendingTasks: [
      { title: 'Complete Q4 Self Appraisal', priority: 'high', dueDate: 'Oct 31' },
      { title: 'Submit October Timesheet', priority: 'medium', dueDate: 'Nov 02' },
      { title: 'Review Team Performance Goals', priority: 'low', dueDate: 'Nov 10' }
    ],
    attendanceTrend: [
      { month: 'Jun', percentage: 94 },
      { month: 'Jul', percentage: 96 },
      { month: 'Aug', percentage: 93 },
      { month: 'Sep', percentage: 97 },
      { month: 'Oct', percentage: 96.5 }
    ],
    leaveStats: {
      casual: { used: 4, total: 12 },
      sick: { used: 2, total: 7 },
      earned: { used: 6, total: 15 }
    }
  }

  // Role-based Sidebar Items
  const employeeSidebarItems = [
    { icon: MessageSquare, label: 'Daily Updates (SOD/EOD)', url: '/daily-updates' },
    { icon: Folder, label: 'My Projects', url: '/project-management' },
    { icon: FileText, label: 'Leave Management', url: '/leave-management' },
    { icon: Clock, label: 'Attendance Tracking', url: '/attendance' },
    { icon: Receipt, label: 'Expense Management', url: '/expense-management' },
    { icon: Award, label: 'Performance Management', url: '/performance-management' },
    { icon: DollarSign, label: 'Payroll Management', url: '/payroll' },
    { icon: Smartphone, label: 'Mobile App', url: '/mobile-app' },
  ]

  const managerSidebarItems = [
    { icon: Users, label: 'Employee Management', url: '/employee-management' },
    { icon: Folder, label: 'Project Management', url: '/project-management' },
    { icon: MessageSquare, label: 'Daily Updates (SOD/EOD)', url: '/daily-updates' },
    { icon: FileText, label: 'Leave Management', url: '/leave-management' },
    { icon: Clock, label: 'Attendance Tracking', url: '/attendance' },
    { icon: Receipt, label: 'Expense Management', url: '/expense-management' },
    { icon: Award, label: 'Performance Management', url: '/performance-management' },
    { icon: BarChart3, label: 'Tax & Reports', url: '/payroll-tax-reports' },
    { icon: Smartphone, label: 'Mobile App', url: '/mobile-app' },
  ]

  const adminSidebarItems = [
    { icon: Users, label: 'User Management', url: '/user-management' },
    { icon: Folder, label: 'Project Management', url: '/project-management' },
    { icon: MessageSquare, label: 'Daily Updates (SOD/EOD)', url: '/daily-updates' },
    { icon: FileText, label: 'Leave Management', url: '/leave-management' },
    { icon: Clock, label: 'Attendance Tracking', url: '/attendance' },
    { icon: Briefcase, label: 'Recruitment', url: '/recruitment' },
    { icon: UserCheck, label: 'Employee Lifecycle', url: '/employee-lifecycle' },
    { icon: Receipt, label: 'Expense Management', url: '/expense-management' },
    { icon: DollarSign, label: 'Payroll Management', url: '/payroll' },
    { icon: Award, label: 'Performance Management', url: '/performance-management' },
    { icon: BarChart3, label: 'Tax & Reports', url: '/payroll-tax-reports' },
    { icon: Smartphone, label: 'Mobile App', url: '/mobile-app' },
  ]

  // Select sidebar items based on role
  const sidebarItems = isAdmin ? adminSidebarItems : isManager ? managerSidebarItems : employeeSidebarItems

  const shortcuts = [
    'Purchase Invoice',
    'Payment Entry',
    'Journal Entry',
    'Accounts Payable',
    'Employee Onboarding',
    'Leave Application',
    'Expense Claim',
    'Attendance Request',
    'Salary Slip',
    'Performance Appraisal',
    'Job Opening',
    'Shift Assignment',
  ]

  const reports = {
    Invoicing: ['Purchase Invoice', 'Supplier', 'Purchase Order', 'Supplier Quotation'],
    Payments: ['Payment Entry', 'Journal Entry', 'Payment Reconciliation', 'Bank Reconciliation Statement'],
    'HR & Payroll': [
      'Monthly Attendance Sheet',
      'Salary Register',
      'Employee Leave Balance',
      'Employee Information',
      'Loan Security Status',
      'Income Tax Computation',
      'Recruitment Analytics',
    ],
    'Leave Management': [
      'Employee Leave Balance',
      'Leave Ledger',
      'Leave Application',
      'Leave Allocation',
      'Leave Encashment',
    ],
    Reports: [
      'Accounts Payable',
      'Accounts Payable Summary',
      'Purchase Register',
      'Item-wise Purchase Register',
      'Received Items To Be Billed',
      'Supplier Ledger Summary',
      'General Ledger',
      'Trial Balance',
      'Profit and Loss Statement',
    ],
    Analytics: [
      'Employee Analytics',
      'Recruitment Funnel',
      'Expense Analytics',
      'Attendance Trends',
      'Performance Summary',
    ],
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 h-14 flex items-center px-4 sticky top-0 z-50">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900 mr-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mr-4">
          <img 
            src="/talrn-logo.jpeg" 
            alt="Talrn Logo" 
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm">Help</span>
          </button>
          <div className="relative user-dropdown">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 rounded-full bg-green-600 text-white font-medium text-xs flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              {getInitials(user.name)}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  My Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Session Defaults
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Reload
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  View Website
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Apps
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Toggle Full Width
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Toggle Theme
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Manage Billing
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          {/* Sidebar Header */}
          <div className="px-4 py-5 border-b border-gray-200 w-64">
            <h2 className="font-semibold text-gray-900 text-base tracking-tight">HRMS Modules</h2>
          </div>

          {/* Sidebar Content */}
          <div className="p-4 w-64">
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.url && navigate(item.url)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all group"
                >
                  <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" strokeWidth={1.8} />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="py-6 px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your work today</p>
            </div>

            {/* Stats Grid - Role-based */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {isAdmin || isManager ? (
                <>
                  {/* Admin View: Pending Approvals */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs font-semibold text-orange-600">Action Needed</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.pendingApprovals.value}</h3>
                    <p className="text-sm text-gray-600 mt-1">Pending Approvals</p>
                  </div>

                  {/* Admin View: Team Members */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-xs text-gray-500">{dashboardData.stats.teamMembers.onLeave} on leave</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.teamMembers.value}</h3>
                    <p className="text-sm text-gray-600 mt-1">Team Members</p>
                  </div>

                  {/* Admin View: Team Attendance */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <UserCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {dashboardData.stats.attendance.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.attendance.value}</h3>
                    <p className="text-sm text-gray-600 mt-1">Team Attendance</p>
                  </div>

                  {/* Admin View: Active Workflows */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-500">This Month</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">18</h3>
                    <p className="text-sm text-gray-600 mt-1">Active Workflows</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Employee View: My Attendance */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <UserCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {dashboardData.stats.attendance.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.attendance.value}</h3>
                    <p className="text-sm text-gray-600 mt-1">My Attendance</p>
                  </div>

                  {/* Employee View: Leave Balance */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-500">{dashboardData.stats.leaveBalance.available}/{dashboardData.stats.leaveBalance.total}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.leaveBalance.value}</h3>
                    <p className="text-sm text-gray-600 mt-1">Leave Balance</p>
                  </div>

                  {/* Employee View: Pending Requests */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs font-semibold text-orange-600">In Review</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                    <p className="text-sm text-gray-600 mt-1">Pending Requests</p>
                  </div>

                  {/* Employee View: This Month's Payslip */}
                  <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-teal-600" />
                      </div>
                      <span className="text-xs text-green-600">Ready</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Nov 2024</h3>
                    <p className="text-sm text-gray-600 mt-1">Latest Payslip</p>
                  </div>
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {dashboardData.quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.link && navigate(action.link)}
                    className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-all hover:scale-105 flex flex-col items-center gap-2 text-center group"
                  >
                    <div className={`${action.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Recent Activities - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {dashboardData.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <activity.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${activity.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    {dashboardData.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-2 min-w-[50px]">
                          <span className="text-lg font-bold text-blue-600">{event.date}</span>
                          <span className="text-xs text-blue-600 uppercase">{event.month}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{event.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{event.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Pending Tasks */}
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    {dashboardData.pendingTasks.map((task, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              task.priority === 'high' ? 'bg-red-100 text-red-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Birthdays */}
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-200 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Birthdays</h2>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    {dashboardData.teamBirthdays.map((birthday, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(birthday.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900">{birthday.name}</h4>
                          <p className="text-xs text-gray-500">{birthday.date}</p>
                        </div>
                        <Gift className="w-4 h-4 text-pink-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave Statistics */}
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Leave Statistics</h2>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {Object.entries(dashboardData.leaveStats).map(([type, data]) => (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">{type} Leave</span>
                          <span className="text-sm text-gray-600">{data.used}/{data.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              type === 'casual' ? 'bg-blue-500' :
                              type === 'sick' ? 'bg-red-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(data.used / data.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Trend Chart */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Attendance Trend</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="p-5">
                <div className="flex items-end justify-between gap-4 h-48">
                  {dashboardData.attendanceTrend.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-t-lg flex items-end justify-center relative group cursor-pointer hover:bg-gray-200 transition-colors" style={{ height: `${data.percentage}%` }}>
                        <div className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.percentage}%
                        </div>
                        <div className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shortcuts Section - Kept from original */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Shortcuts</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {shortcuts.map((shortcut, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group"
                    >
                      <span className="text-sm break-words text-left">{shortcut}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reports & Masters Section - Kept from original */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Reports & Masters</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {Object.entries(reports).map(([category, items]) => (
                    <div key={category} className="min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm break-words flex items-center gap-2">
                        <Folder className="w-4 h-4 text-gray-500" />
                        {category}
                      </h4>
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <button
                          key={index}
                            className="block text-gray-600 hover:text-blue-600 text-sm text-left transition-colors break-words w-full hover:pl-2 transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

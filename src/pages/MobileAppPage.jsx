import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  LogOut,
  Smartphone,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Receipt,
  Bell,
  User,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  Play,
  QrCode,
  Navigation,
  FileText,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Gift,
  Plus,
  Eye,
  ExternalLink
} from 'lucide-react'

const MobileAppPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('checkin')
  const [selectedDemo, setSelectedDemo] = useState('ios')

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role?.toLowerCase().includes('admin')

  // Dummy data for check-ins
  const checkInData = {
    lastCheckin: {
      time: '09:15 AM',
      date: 'October 28, 2024',
      location: 'Frappe Office, Mumbai',
      coordinates: '19.0760° N, 72.8777° E',
      type: 'Check-in'
    },
    todayStatus: 'Checked In',
    workingHours: '7h 45m',
    recentCheckIns: [
      { date: 'Oct 28, 2024', checkin: '09:15 AM', checkout: null, location: 'Mumbai Office', hours: '7h 45m' },
      { date: 'Oct 27, 2024', checkin: '09:00 AM', checkout: '06:30 PM', location: 'Mumbai Office', hours: '9h 30m' },
      { date: 'Oct 26, 2024', checkin: '09:10 AM', checkout: '06:15 PM', location: 'Mumbai Office', hours: '9h 5m' },
      { date: 'Oct 25, 2024', checkin: '08:55 AM', checkout: '06:00 PM', location: 'Mumbai Office', hours: '9h 5m' }
    ]
  }

  // Dummy data for request panel
  const requests = [
    { id: 'REQ-001', type: 'Leave', description: 'Annual Leave - 3 days', status: 'Pending', date: 'Oct 25, 2024', icon: Calendar, color: 'text-blue-600' },
    { id: 'REQ-002', type: 'Expense', description: 'Travel Expense - ₹5,000', status: 'Approved', date: 'Oct 24, 2024', icon: Receipt, color: 'text-green-600' },
    { id: 'REQ-003', type: 'Advance', description: 'Salary Advance - ₹20,000', status: 'Pending', date: 'Oct 23, 2024', icon: CreditCard, color: 'text-purple-600' },
    { id: 'REQ-004', type: 'Leave', description: 'Sick Leave - 1 day', status: 'Rejected', date: 'Oct 20, 2024', icon: Calendar, color: 'text-red-600' }
  ]

  // Dummy data for leaves & holidays
  const leavesData = {
    balance: {
      annual: { total: 18, used: 8, remaining: 10 },
      sick: { total: 12, used: 3, remaining: 9 },
      casual: { total: 10, used: 5, remaining: 5 }
    },
    upcomingHolidays: [
      { name: 'Diwali', date: 'Nov 1, 2024', day: 'Friday' },
      { name: 'Christmas', date: 'Dec 25, 2024', day: 'Wednesday' },
      { name: 'New Year', date: 'Jan 1, 2025', day: 'Wednesday' }
    ],
    recentApplications: [
      { id: 'LV-001', type: 'Annual Leave', from: 'Nov 10, 2024', to: 'Nov 12, 2024', days: 3, status: 'Pending' },
      { id: 'LV-002', type: 'Sick Leave', from: 'Oct 15, 2024', to: 'Oct 15, 2024', days: 1, status: 'Approved' }
    ]
  }

  // Dummy data for expenses & advances
  const expensesData = {
    pendingExpenses: [
      { id: 'EXP-001', description: 'Client Meeting Lunch', amount: 2500, date: 'Oct 26, 2024', status: 'Pending' },
      { id: 'EXP-002', description: 'Travel - Mumbai to Pune', amount: 1200, date: 'Oct 25, 2024', status: 'Pending' }
    ],
    approvedExpenses: [
      { id: 'EXP-003', description: 'Office Supplies', amount: 3200, date: 'Oct 20, 2024', status: 'Approved' }
    ],
    advances: [
      { id: 'ADV-001', amount: 20000, purpose: 'Emergency', requested: 'Oct 23, 2024', status: 'Pending' },
      { id: 'ADV-002', amount: 15000, purpose: 'Travel', requested: 'Oct 10, 2024', status: 'Approved', settled: 15000 }
    ]
  }

  // Dummy data for salary
  const salaryData = {
    currentMonth: {
      month: 'October 2024',
      gross: 100000,
      deductions: 15000,
      net: 85000,
      status: 'Processed'
    },
    ytd: {
      gross: 1000000,
      deductions: 150000,
      net: 850000
    },
    recentPayslips: [
      { month: 'October 2024', net: 85000, status: 'Available' },
      { month: 'September 2024', net: 85000, status: 'Available' },
      { month: 'August 2024', net: 85000, status: 'Available' }
    ]
  }

  // Dummy data for notifications
  const notifications = [
    { id: 1, type: 'Leave Approved', message: 'Your leave request for Nov 10-12 has been approved', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600', read: false },
    { id: 2, type: 'Expense Pending', message: 'Your expense claim EXP-001 is pending approval', time: '5 hours ago', icon: Clock, color: 'text-yellow-600', read: false },
    { id: 3, type: 'Payslip Available', message: 'Your payslip for October 2024 is now available', time: '1 day ago', icon: FileText, color: 'text-blue-600', read: true },
    { id: 4, type: 'Holiday Reminder', message: 'Diwali holiday on Nov 1, 2024', time: '2 days ago', icon: Calendar, color: 'text-purple-600', read: true }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/signup')
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'available':
      case 'processed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
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
                <span className="text-gray-600">Mobile App</span>
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
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mobile App</h1>
              <p className="text-sm text-gray-500">Available on iOS & Android</p>
            </div>
          </div>
          <p className="text-gray-600">
            The Frappe HR Mobile App brings everyday tasks to your fingertips — employee check-ins, leaves, claims, 
            advances, and salary slips. The goal of this app is not just to ease operations for your employees but 
            also to improve efficiency for your HR Managers. Track all the requests that need your attention on the 
            go based on the employee's approver/workflows.
          </p>
        </div>

        {/* Installation & Demo Section */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Installation & Demo</h2>
              <p className="text-gray-600">Download the Frappe HR mobile app on your device</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedDemo('ios')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDemo === 'ios'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                iOS
              </button>
              <button
                onClick={() => setSelectedDemo('android')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDemo === 'android'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Android
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Download Section */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Download App</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-4 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="text-3xl">
                    {selectedDemo === 'ios' ? '🍎' : '🤖'}
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Download on the</p>
                    <p className="text-lg font-semibold">
                      {selectedDemo === 'ios' ? 'App Store' : 'Google Play'}
                    </p>
                  </div>
                </a>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <QrCode className="w-5 h-5" />
                  <span>Scan QR code to download</span>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: 'Geolocation Check-in/out' },
                  { icon: Calendar, text: 'Leave Management' },
                  { icon: Receipt, text: 'Expense Claims' },
                  { icon: DollarSign, text: 'View Salary & Payslips' },
                  { icon: Bell, text: 'Real-time Notifications' },
                  { icon: User, text: 'Employee Profile' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Features Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-8 px-6 min-w-max">
              <button
                onClick={() => setActiveTab('checkin')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'checkin'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Check-in/out
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Request Panel
              </button>
              <button
                onClick={() => setActiveTab('leaves')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'leaves'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Leaves & Holidays
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'expenses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Expenses & Advances
              </button>
              <button
                onClick={() => setActiveTab('salary')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'salary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Salary
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Employee Profile
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Check-in/out Tab */}
            {activeTab === 'checkin' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Check-in and Check-out with Geolocation</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Status Card */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-semibold text-gray-900">Today's Status</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {checkInData.todayStatus}
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-6 mb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{checkInData.lastCheckin.time}</p>
                          <p className="text-sm text-gray-600">{checkInData.lastCheckin.type}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{checkInData.lastCheckin.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Navigation className="w-4 h-4" />
                          <span>{checkInData.lastCheckin.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{checkInData.lastCheckin.coordinates}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Working Hours</p>
                        <p className="text-xl font-bold text-blue-600">{checkInData.workingHours}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-xl font-bold text-green-600">Active</p>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Check Out</span>
                    </button>
                  </div>

                  {/* Recent Check-ins */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Check-ins</h4>
                    <div className="space-y-3">
                      {checkInData.recentCheckIns.map((record, index) => (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{record.date}</p>
                              <p className="text-sm text-gray-600">{record.location}</p>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">{record.hours}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span>{record.checkin}</span>
                            </div>
                            {record.checkout && (
                              <>
                                <span>→</span>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4 text-red-600" />
                                  <span>{record.checkout}</span>
                                </div>
                              </>
                            )}
                            {!record.checkout && (
                              <span className="text-yellow-600 font-medium">In Progress</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Request Panel Tab */}
            {activeTab === 'requests' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Request Panel</h3>

                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                            <request.icon className={`w-6 h-6 ${request.color}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{request.type}</p>
                            <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{request.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaves & Holidays Tab */}
            {activeTab === 'leaves' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Leaves & Holidays</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Leave Balance */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Leave Balance</h4>
                    <div className="space-y-4">
                      {Object.entries(leavesData.balance).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-gray-900 capitalize">{key} Leave</p>
                            <span className="text-sm font-semibold text-blue-600">
                              {value.remaining}/{value.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(value.remaining / value.total) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Used: {value.used} days</p>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Apply for Leave</span>
                    </button>
                  </div>

                  {/* Upcoming Holidays & Recent Applications */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Upcoming Holidays</h4>
                      <div className="space-y-3">
                        {leavesData.upcomingHolidays.map((holiday, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{holiday.name}</p>
                              <p className="text-sm text-gray-600">{holiday.day}</p>
                            </div>
                            <p className="text-sm font-semibold text-purple-600">{holiday.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Recent Applications</h4>
                      <div className="space-y-3">
                        {leavesData.recentApplications.map((application) => (
                          <div key={application.id} className="bg-white rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium text-gray-900">{application.type}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {application.from} to {application.to}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{application.days} day(s)</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expenses & Advances Tab */}
            {activeTab === 'expenses' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Expenses & Advances</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Expenses */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">Expense Claims</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                        <Plus className="w-4 h-4" />
                        <span>New Claim</span>
                      </button>
                    </div>

                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-medium text-gray-700">Pending</p>
                      {expensesData.pendingExpenses.map((expense) => (
                        <div key={expense.id} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-gray-900">{expense.description}</p>
                            <span className="text-sm font-semibold text-orange-600">
                              ₹{expense.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">{expense.date}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                              {expense.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Approved</p>
                      {expensesData.approvedExpenses.map((expense) => (
                        <div key={expense.id} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-gray-900">{expense.description}</p>
                            <span className="text-sm font-semibold text-green-600">
                              ₹{expense.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">{expense.date}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                              {expense.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advances */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">Salary Advances</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                        <Plus className="w-4 h-4" />
                        <span>Request</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {expensesData.advances.map((advance) => (
                        <div key={advance.id} className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">₹{advance.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{advance.purpose}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(advance.status)}`}>
                              {advance.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Requested: {advance.requested}</div>
                          {advance.settled !== undefined && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Settled</span>
                                <span className="font-semibold text-green-600">₹{advance.settled.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Salary Tab */}
            {activeTab === 'salary' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Salary & Payslips</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Month Salary */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Current Month</h4>
                    <p className="text-sm text-gray-600 mb-4">{salaryData.currentMonth.month}</p>

                    <div className="bg-white rounded-lg p-6 mb-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Gross Salary</span>
                          <span className="font-semibold text-gray-900">
                            ₹{salaryData.currentMonth.gross.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Deductions</span>
                          <span className="font-semibold text-red-600">
                            -₹{salaryData.currentMonth.deductions.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Net Salary</span>
                          <span className="text-2xl font-bold text-green-600">
                            ₹{salaryData.currentMonth.net.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download Payslip</span>
                    </button>
                  </div>

                  {/* YTD & Recent Payslips */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Year to Date (YTD)</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Gross</p>
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(salaryData.ytd.gross / 100000).toFixed(1)}L
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Deductions</p>
                          <p className="text-lg font-bold text-red-600">
                            ₹{(salaryData.ytd.deductions / 100000).toFixed(1)}L
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Net</p>
                          <p className="text-lg font-bold text-green-600">
                            ₹{(salaryData.ytd.net / 100000).toFixed(1)}L
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Recent Payslips</h4>
                      <div className="space-y-3">
                        {salaryData.recentPayslips.map((payslip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{payslip.month}</p>
                              <p className="text-sm text-green-600 font-semibold">
                                ₹{payslip.net.toLocaleString()}
                              </p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>

                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg p-4 ${
                        notification.read ? 'bg-white' : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.read ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                          <notification.icon className={`w-5 h-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <p className={`font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>
                              {notification.type}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Employee Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Profile</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{user.role}</p>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-4">
                          Active
                        </span>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Employee ID', value: 'EMP-001' },
                          { label: 'Department', value: 'Engineering' },
                          { label: 'Designation', value: 'Software Engineer' },
                          { label: 'Date of Joining', value: 'Jan 15, 2023' },
                          { label: 'Email', value: user.email || 'employee@example.com' },
                          { label: 'Phone', value: '+91 98765 43210' },
                          { label: 'Location', value: 'Mumbai, India' },
                          { label: 'Manager', value: 'Sarah Wilson' }
                        ].map((item, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-xs text-gray-500">{item.label}</p>
                            <p className="text-sm font-medium text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">10</p>
                          <p className="text-xs text-gray-600 mt-1">Leaves Left</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">96%</p>
                          <p className="text-xs text-gray-600 mt-1">Attendance</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-purple-600">3</p>
                          <p className="text-xs text-gray-600 mt-1">Projects</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-orange-600">4.5</p>
                          <p className="text-xs text-gray-600 mt-1">Rating</p>
                        </div>
                      </div>
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

export default MobileAppPage


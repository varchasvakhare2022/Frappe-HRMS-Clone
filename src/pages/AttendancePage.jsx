import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, ChevronRight, Calendar, Clock, FileText, TrendingUp,
  User, Users, Settings, Bell, HelpCircle, LogOut, Search,
  Plus, Filter, Download, Eye, Edit, Trash2, Check, X,
  ArrowRight, MapPin, MoreVertical, AlertCircle, UserCheck,
  LogIn, LogOut as LogOutIcon, Activity, BarChart3
} from 'lucide-react'

function AttendancePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('today')
  const [currentTime, setCurrentTime] = useState(new Date())

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
  const todayAttendance = {
    status: 'Present',
    checkIn: '09:15 AM',
    checkOut: null,
    workingHours: '3h 45m',
    break: '15m',
    location: 'Office - Floor 3'
  }

  const attendanceRecords = [
    {
      date: '2024-10-27',
      day: 'Monday',
      status: 'Present',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      workingHours: '8h 45m',
      overtime: '30m'
    },
    {
      date: '2024-10-26',
      day: 'Sunday',
      status: 'Weekly Off',
      checkIn: '-',
      checkOut: '-',
      workingHours: '-',
      overtime: '-'
    },
    {
      date: '2024-10-25',
      day: 'Saturday',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      workingHours: '8h 15m',
      overtime: '-'
    },
    {
      date: '2024-10-24',
      day: 'Friday',
      status: 'Present',
      checkIn: '09:10 AM',
      checkOut: '06:00 PM',
      workingHours: '8h 20m',
      overtime: '-'
    },
    {
      date: '2024-10-23',
      day: 'Thursday',
      status: 'Half Day',
      checkIn: '09:00 AM',
      checkOut: '01:30 PM',
      workingHours: '4h 00m',
      overtime: '-'
    },
    {
      date: '2024-10-22',
      day: 'Wednesday',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      workingHours: '-',
      overtime: '-'
    },
    {
      date: '2024-10-21',
      day: 'Tuesday',
      status: 'Present',
      checkIn: '08:55 AM',
      checkOut: '06:15 PM',
      workingHours: '8h 50m',
      overtime: '20m'
    }
  ]

  const teamAttendance = [
    { employee: 'Sarah Johnson', status: 'Present', checkIn: '09:00 AM', location: 'Office' },
    { employee: 'Raj Kumar', status: 'Present', checkIn: '08:45 AM', location: 'Remote' },
    { employee: 'Emma Thompson', status: 'On Leave', checkIn: '-', location: '-' },
    { employee: 'Li Wei', status: 'Present', checkIn: '09:15 AM', location: 'Office' },
    { employee: 'José García', status: 'Late', checkIn: '10:30 AM', location: 'Office' },
    { employee: 'Mohammed Al-Rashid', status: 'Present', checkIn: '09:05 AM', location: 'Remote' },
    { employee: 'Priya Sharma', status: 'Absent', checkIn: '-', location: '-' },
    { employee: 'John Doe', status: 'Present', checkIn: '08:50 AM', location: 'Office' }
  ]

  const shiftsList = [
    { name: 'Morning Shift', timing: '06:00 AM - 02:00 PM', employees: 45, type: 'Fixed' },
    { name: 'Day Shift', timing: '09:00 AM - 06:00 PM', employees: 120, type: 'Fixed' },
    { name: 'Evening Shift', timing: '02:00 PM - 10:00 PM', employees: 38, type: 'Fixed' },
    { name: 'Night Shift', timing: '10:00 PM - 06:00 AM', employees: 22, type: 'Rotational' },
    { name: 'Flexible Shift', timing: 'Flexible Hours', employees: 65, type: 'Flexible' }
  ]

  const attendanceStats = {
    thisMonth: { present: 20, absent: 1, halfDay: 1, leaves: 0, weeklyOffs: 4 },
    thisYear: { present: 240, absent: 5, halfDay: 3, leaves: 8, weeklyOffs: 48 }
  }

  const shortcuts = isAdmin ? [
    { icon: Users, label: 'Team Attendance', count: `${teamAttendance.filter(a => a.status === 'Present').length}/${teamAttendance.length}` },
    { icon: Clock, label: 'Shift Management', count: null },
    { icon: BarChart3, label: 'Attendance Reports', count: null },
    { icon: Settings, label: 'Attendance Settings', count: null }
  ] : [
    { icon: LogIn, label: 'Check In', count: null },
    { icon: Calendar, label: 'My Attendance', count: null },
    { icon: Clock, label: 'Work Hours', count: null },
    { icon: FileText, label: 'Attendance Request', count: null }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'bg-green-100 text-green-700 border-green-200'
      case 'absent': return 'bg-red-100 text-red-700 border-red-200'
      case 'late': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'half day': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'on leave': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'weekly off': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const renderContent = () => {
    switch (selectedSection) {
      case 'today':
        return (
          <div className="space-y-6">
            {/* Check In/Out Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Today's Attendance</h2>
                  <p className="text-blue-100">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-sm text-blue-100">{currentTime.toLocaleTimeString('en-US', { second: '2-digit' }).split(' ')[1]}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-blue-100 mb-1">Status</p>
                  <p className="text-xl font-bold">{todayAttendance.status}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-blue-100 mb-1">Check In</p>
                  <p className="text-xl font-bold">{todayAttendance.checkIn}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-blue-100 mb-1">Working Hours</p>
                  <p className="text-xl font-bold">{todayAttendance.workingHours}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-blue-100 mb-1">Location</p>
                  <p className="text-sm font-medium">{todayAttendance.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {!todayAttendance.checkOut ? (
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                    <LogOutIcon className="w-5 h-5" />
                    Check Out
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                    <LogIn className="w-5 h-5" />
                    Check In
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <MapPin className="w-5 h-5" />
                  Update Location
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Present</span>
                    <span className="text-lg font-bold text-green-600">{attendanceStats.thisMonth.present}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Absent</span>
                    <span className="text-lg font-bold text-red-600">{attendanceStats.thisMonth.absent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Half Day</span>
                    <span className="text-lg font-bold text-yellow-600">{attendanceStats.thisMonth.halfDay}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">Attendance Rate</h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">96.5%</p>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '96.5%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">Average Hours</h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-purple-600 mb-2">8.5h</p>
                  <p className="text-sm text-gray-600">Per working day</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+15m from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'records':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
                <p className="text-sm text-gray-600 mt-1">Your attendance history</p>
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
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.workingHours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{record.overtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Team Attendance - Today</h2>
                <p className="text-sm text-gray-600 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  Mark Attendance
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{teamAttendance.filter(a => a.status === 'Present').length}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{teamAttendance.filter(a => a.status === 'Absent').length}</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{teamAttendance.filter(a => a.status === 'Late').length}</p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{teamAttendance.filter(a => a.status === 'On Leave').length}</p>
                  <p className="text-sm text-gray-600">On Leave</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{teamAttendance.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {teamAttendance.map((attendance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(attendance.employee)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{attendance.employee}</h3>
                        <p className="text-sm text-gray-600">{attendance.checkIn !== '-' ? `Checked in at ${attendance.checkIn}` : 'Not checked in'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(attendance.status)}`}>
                          {attendance.status}
                        </span>
                        {attendance.location !== '-' && (
                          <p className="text-xs text-gray-500 mt-1">{attendance.location}</p>
                        )}
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'shifts':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Shift Management</h2>
                <p className="text-sm text-gray-600 mt-1">Configure and manage work shifts</p>
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  Add Shift
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shiftsList.map((shift, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{shift.name}</h3>
                        <p className="text-sm text-gray-600">{shift.timing}</p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {shift.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{shift.employees} employees</span>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      )}
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
              <span className="text-sm font-semibold text-gray-900">Attendance</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Tracking</h1>
          <p className="text-gray-600">Track employee attendance, shifts, and working hours</p>
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
                <div className="p-3 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                  <shortcut.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{shortcut.label}</p>
                  {shortcut.count !== null && (
                    <p className="text-xs text-gray-500 mt-1">{shortcut.count}</p>
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
            {/* Column 1: Daily */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Daily</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('today')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Today's Attendance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('records')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Attendance Records</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Attendance Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Configuration */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Configuration</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('shifts')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Shift Management</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Attendance Settings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Work Timings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 3: Reports */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Reports</h3>
              <div className="space-y-2">
                {isAdmin && (
                  <button 
                    onClick={() => setSelectedSection('team')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Team Attendance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Monthly Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Attendance Analytics</span>
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

export default AttendancePage


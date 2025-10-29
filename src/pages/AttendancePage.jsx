import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Calendar, Clock, CheckCircle, XCircle, Users, Download } from 'lucide-react'
import employeeUsersData from '../data/employeeUsers.json'
import managerUsersData from '../data/managerUsers.json'

function AttendancePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)) // YYYY-MM format
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]) // YYYY-MM-DD format
  const [activeTab, setActiveTab] = useState('my-attendance')
  const [teamView, setTeamView] = useState('daily') // 'daily' or 'monthly'

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
      loadAttendance()
    }
  }, [user, selectedMonth, selectedDate, activeTab, teamView])

  const loadAttendance = () => {
    const dailyUpdates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const [year, month] = selectedMonth.split('-')
    
    // Get all dates in the selected month
    const daysInMonth = new Date(year, month, 0).getDate()
    const attendanceRecords = []

    // Check user role
    const isAdmin = user?.role?.toLowerCase().includes('admin')
    const isManager = user?.role?.toLowerCase().includes('manager')

    // Get all employees and managers from JSON and localStorage
    const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
    const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
    
    const allEmployees = [...employeeUsersData, ...customEmployees]
    const allManagers = [...managerUsersData, ...customManagers]
    
    // Combine all users for team view
    const allTeamMembers = [...allEmployees, ...allManagers]

    if (activeTab === 'my-attendance') {
      // Show only current user's attendance
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${month}-${String(day).padStart(2, '0')}`
        const key = `${user.email}_${date}`
        const record = dailyUpdates[key]
        
        if (record) {
          attendanceRecords.push({
            date,
            name: user.name,
            email: user.email,
            status: record.sod && record.eod ? 'Present' : record.sod ? 'Incomplete' : 'Absent',
            sod: record.sod?.timestamp,
            eod: record.eod?.timestamp,
            lunchExit: record.lunchExit?.timestamp,
            lunchReturn: record.lunchReturn?.timestamp,
            workingHours: calculateWorkingHours(record),
            tasks: record.sod?.tasks || []
          })
        } else {
          // Check if it's a future date
          const isPastOrToday = new Date(date) <= new Date()
          if (isPastOrToday) {
            attendanceRecords.push({
              date,
              name: user.name,
              email: user.email,
              status: 'Absent',
              workingHours: '0h 0m'
            })
          }
        }
      }
    } else {
      // Show team attendance
      if (teamView === 'daily') {
        // Daily view - show today's attendance
        allTeamMembers.forEach(member => {
          // Skip current user in team view
          if (member.email === user.email) return
          
          // Managers can only see employees, Admins see everyone
          if (isManager && member.role !== 'Employee') return
          
          const key = `${member.email}_${selectedDate}`
          const record = dailyUpdates[key]
          
          let status = 'Absent'
          if (record) {
            if (record.sod && record.eod) {
              status = 'Present'
            } else if (record.sod) {
              status = 'Incomplete'
            }
          }
          
          attendanceRecords.push({
            name: member.name,
            email: member.email,
            role: member.role,
            status,
            sod: record?.sod?.timestamp,
            eod: record?.eod?.timestamp,
            lunchExit: record?.lunchExit?.timestamp,
            lunchReturn: record?.lunchReturn?.timestamp,
            workingHours: record ? calculateWorkingHours(record) : '0h 0m'
          })
        })
      } else {
        // Monthly view - show summary
        allTeamMembers.forEach(member => {
          // Skip current user in team view
          if (member.email === user.email) return
          
          // Managers can only see employees, Admins see everyone
          if (isManager && member.role !== 'Employee') return
          
          // Calculate stats for the month
          let presentDays = 0
          let incompleteDays = 0
          let totalWorkingHours = 0
          
          for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${month}-${String(day).padStart(2, '0')}`
            const key = `${member.email}_${date}`
            const record = dailyUpdates[key]
            
            if (record) {
              if (record.sod && record.eod) {
                presentDays++
                const hours = parseWorkingHours(calculateWorkingHours(record))
                totalWorkingHours += hours
              } else if (record.sod) {
                incompleteDays++
              }
            }
          }
          
          // Check if it's a future date for calculating absent days
          const today = new Date()
          const lastDayToCount = new Date(year, month, 0) > today 
            ? today.getDate() 
            : daysInMonth
          
          const absentDays = lastDayToCount - presentDays - incompleteDays
          
          attendanceRecords.push({
            name: member.name,
            email: member.email,
            role: member.role,
            presentDays,
            incompleteDays,
            absentDays,
            totalWorkingHours: formatTotalHours(totalWorkingHours),
            attendancePercentage: lastDayToCount > 0 
              ? ((presentDays / lastDayToCount) * 100).toFixed(1) 
              : 0
          })
        })
      }
    }

    setAttendanceData(attendanceRecords)
  }

  const calculateWorkingHours = (record) => {
    if (!record.sod || !record.eod) return '0h 0m'

    const sodTime = new Date(record.sod.timestamp)
    const eodTime = new Date(record.eod.timestamp)
    
    let totalMinutes = Math.floor((eodTime - sodTime) / (1000 * 60))

    // Subtract lunch break duration if both timestamps exist
    if (record.lunchExit && record.lunchReturn) {
      const lunchExitTime = new Date(record.lunchExit.timestamp)
      const lunchReturnTime = new Date(record.lunchReturn.timestamp)
      const lunchMinutes = Math.floor((lunchReturnTime - lunchExitTime) / (1000 * 60))
      totalMinutes -= lunchMinutes
    }

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }

  const parseWorkingHours = (hoursStr) => {
    const match = hoursStr.match(/(\d+)h\s*(\d+)m/)
    if (match) {
      return parseInt(match[1]) + parseInt(match[2]) / 60
    }
    return 0
  }

  const formatTotalHours = (totalHours) => {
    const hours = Math.floor(totalHours)
    const minutes = Math.round((totalHours - hours) * 60)
    return `${hours}h ${minutes}m`
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '-'
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusBadge = (status) => {
    const styles = {
      Present: 'bg-green-100 text-green-700',
      Incomplete: 'bg-yellow-100 text-yellow-700',
      Absent: 'bg-red-100 text-red-700'
    }
    
    const icons = {
      Present: <CheckCircle className="w-3 h-3" />,
      Incomplete: <Clock className="w-3 h-3" />,
      Absent: <XCircle className="w-3 h-3" />
    }
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    )
  }

  if (!user) {
    return null
  }

  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')

  // Get current month name for display
  const monthName = new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

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
              <span className="text-gray-900 font-medium">Attendance Tracking</span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
                <p className="text-gray-600">Track attendance based on SOD/EOD submissions</p>
              </div>
            </div>

            {/* Month Selector */}
            <div className="flex items-center gap-3">
              <input
                type="month"
                value={selectedMonth}
                max={new Date().toISOString().slice(0, 7)}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('my-attendance')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'my-attendance'
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Attendance
              </button>
              {(isAdmin || isManager) && (
                <button
                  onClick={() => setActiveTab('team-attendance')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'team-attendance'
                      ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Team Attendance
                </button>
              )}
            </div>
          </div>

          {/* Attendance Content */}
          <div className="p-6">
            {/* View toggle for team attendance */}
            {activeTab === 'team-attendance' && (
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTeamView('daily')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      teamView === 'daily'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Today's Attendance
                  </button>
                  <button
                    onClick={() => setTeamView('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      teamView === 'monthly'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Monthly Summary
                  </button>
                </div>
                {teamView === 'daily' ? (
                  <input
                    type="date"
                    value={selectedDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  attendanceData.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Total Records: {attendanceData.length}
                    </p>
                  )
                )}
              </div>
            )}

            {activeTab === 'my-attendance' && (
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
                {attendanceData.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Total Records: {attendanceData.length}
                  </p>
                )}
              </div>
            )}

            {attendanceData.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No attendance data found</p>
                <p className="text-sm text-gray-500 mt-1">Attendance is tracked via Daily Updates (SOD/EOD)</p>
              </div>
            ) : activeTab === 'my-attendance' ? (
              // My Attendance - Daily View
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SOD Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lunch Exit</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lunch Return</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">EOD Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Working Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatDate(record.date)}</td>
                        <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.sod)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.lunchExit)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.lunchReturn)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.eod)}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.workingHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : teamView === 'daily' ? (
              // Team Attendance - Daily View
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SOD Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lunch Exit</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lunch Return</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">EOD Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Working Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.email}</td>
                        <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.sod)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.lunchExit)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.lunchReturn)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatTime(record.eod)}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.workingHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Team Attendance - Monthly Summary View
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Present Days</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Incomplete</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Absent Days</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Hours</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.sort((a, b) => b.presentDays - a.presentDays).map((record, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.email}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {record.presentDays}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            {record.incompleteDays}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            {record.absentDays}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.totalWorkingHours}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div 
                                className={`h-2 rounded-full ${
                                  record.attendancePercentage >= 90 ? 'bg-green-500' :
                                  record.attendancePercentage >= 75 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${record.attendancePercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 min-w-[45px]">
                              {record.attendancePercentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-2">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">How Attendance is Calculated</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Present:</strong> Both SOD and EOD submitted for the day</li>
                <li>• <strong>Incomplete:</strong> Only SOD submitted, missing EOD</li>
                <li>• <strong>Absent:</strong> No SOD/EOD submitted</li>
                <li>• <strong>Working Hours:</strong> Time between SOD and EOD, minus lunch break duration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage

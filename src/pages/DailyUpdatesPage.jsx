import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Calendar, Clock, Coffee, Sunset, Users, Plus, Edit2, 
  CheckCircle, Circle, AlertCircle, ChevronDown, ChevronUp,
  MessageSquare, TrendingUp
} from 'lucide-react'

function DailyUpdatesPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showSODForm, setShowSODForm] = useState(false)
  const [showEODForm, setShowEODForm] = useState(false)
  const [sodTasks, setSodTasks] = useState([''])
  const [eodTasks, setEodTasks] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('all')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/signup')
      return
    }
    setUser(JSON.parse(storedUser))
    loadDailyUpdates()
  }, [navigate, selectedDate])

  const isAdmin = user?.role?.toLowerCase().includes('admin')
  const isManager = user?.role?.toLowerCase().includes('manager')

  // Load daily updates from localStorage
  const loadDailyUpdates = () => {
    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user?.email}_${selectedDate}`
    const todayUpdates = updates[todayKey]

    if (todayUpdates?.sod) {
      setSodTasks(todayUpdates.sod.tasks)
    }
    if (todayUpdates?.eod) {
      setEodTasks(todayUpdates.eod.tasks)
    }
  }

  // Save daily updates to localStorage
  const saveDailyUpdate = (type, data) => {
    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user.email}_${selectedDate}`
    
    if (!updates[todayKey]) {
      updates[todayKey] = {
        email: user.email,
        name: user.name,
        date: selectedDate
      }
    }

    updates[todayKey][type] = {
      ...data,
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('dailyUpdates', JSON.stringify(updates))
    loadDailyUpdates()
  }

  const handleSODSubmit = () => {
    // Prevent employees from posting SOD for non-current dates
    const today = new Date().toISOString().split('T')[0]
    if (!isAdmin && selectedDate !== today) {
      alert('You can only post SOD for today')
      setShowSODForm(false)
      return
    }

    const validTasks = sodTasks.filter(task => task.trim() !== '')
    if (validTasks.length === 0) {
      alert('Please add at least one task')
      return
    }

    saveDailyUpdate('sod', { tasks: validTasks })
    setShowSODForm(false)
  }

  const handleLunchExit = () => {
    // Prevent employees from posting lunch exit for non-current dates
    const today = new Date().toISOString().split('T')[0]
    if (!isAdmin && selectedDate !== today) {
      alert('You can only post lunch updates for today')
      return
    }

    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user.email}_${selectedDate}`
    
    if (!updates[todayKey]) {
      updates[todayKey] = {
        email: user.email,
        name: user.name,
        date: selectedDate
      }
    }

    updates[todayKey].lunchExit = {
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('dailyUpdates', JSON.stringify(updates))
    loadDailyUpdates()
  }

  const handleLunchReturn = () => {
    // Prevent employees from posting lunch return for non-current dates
    const today = new Date().toISOString().split('T')[0]
    if (!isAdmin && selectedDate !== today) {
      alert('You can only post lunch updates for today')
      return
    }

    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user.email}_${selectedDate}`
    
    if (!updates[todayKey]) {
      updates[todayKey] = {
        email: user.email,
        name: user.name,
        date: selectedDate
      }
    }

    updates[todayKey].lunchReturn = {
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('dailyUpdates', JSON.stringify(updates))
    loadDailyUpdates()
  }

  const handleEODSubmit = () => {
    // Prevent employees from posting EOD for non-current dates
    const today = new Date().toISOString().split('T')[0]
    if (!isAdmin && selectedDate !== today) {
      alert('You can only post EOD for today')
      setShowEODForm(false)
      return
    }

    if (eodTasks.length === 0) {
      alert('Please update task status')
      return
    }

    saveDailyUpdate('eod', { tasks: eodTasks })
    setShowEODForm(false)
  }

  const addSODTask = () => {
    setSodTasks([...sodTasks, ''])
  }

  const updateSODTask = (index, value) => {
    const newTasks = [...sodTasks]
    newTasks[index] = value
    setSodTasks(newTasks)
  }

  const removeSODTask = (index) => {
    setSodTasks(sodTasks.filter((_, i) => i !== index))
  }

  const prepareEODForm = () => {
    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user.email}_${selectedDate}`
    const todayUpdates = updates[todayKey]

    if (!todayUpdates?.sod) {
      alert('Please submit SOD before EOD')
      return
    }

    const tasks = todayUpdates.sod.tasks.map(task => ({
      task,
      status: 'pending',
      completed: '',
      total: ''
    }))

    setEodTasks(tasks)
    setShowEODForm(true)
  }

  const updateEODTask = (index, field, value) => {
    const newTasks = [...eodTasks]
    newTasks[index][field] = value
    setEodTasks(newTasks)
  }

  // Get today's timeline
  const getTodayTimeline = () => {
    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const todayKey = `${user?.email}_${selectedDate}`
    return updates[todayKey] || null
  }

  // Get team updates (admin view)
  const getTeamUpdates = () => {
    const updates = JSON.parse(localStorage.getItem('dailyUpdates') || '{}')
    const teamUpdates = []

    Object.keys(updates).forEach(key => {
      if (key.includes(selectedDate)) {
        teamUpdates.push(updates[key])
      }
    })

    return teamUpdates
  }

  // Calculate working hours
  const calculateWorkingHours = (updates) => {
    if (!updates?.sod || !updates?.eod) return null

    const sodTime = new Date(updates.sod.timestamp)
    const eodTime = new Date(updates.eod.timestamp)
    
    let totalMinutes = (eodTime - sodTime) / (1000 * 60)
    
    // Subtract lunch break duration if both exit and return are logged
    if (updates.lunchExit && updates.lunchReturn) {
      const lunchExit = new Date(updates.lunchExit.timestamp)
      const lunchReturn = new Date(updates.lunchReturn.timestamp)
      const lunchMinutes = (lunchReturn - lunchExit) / (1000 * 60)
      totalMinutes -= lunchMinutes
    }
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    
    return { hours, minutes, totalMinutes }
  }

  const todayUpdates = getTodayTimeline()
  const teamUpdates = (isAdmin || isManager) ? getTeamUpdates() : []
  const hasSOD = todayUpdates?.sod
  const hasLunchExit = todayUpdates?.lunchExit
  const hasLunchReturn = todayUpdates?.lunchReturn
  const hasEOD = todayUpdates?.eod
  const workingHours = calculateWorkingHours(todayUpdates)
  
  // Check if viewing current date
  const isViewingToday = selectedDate === new Date().toISOString().split('T')[0]
  const canPostUpdates = (isAdmin || isManager) || isViewingToday

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            <div className="text-sm text-gray-500">
              <button
                onClick={() => navigate('/dashboard')}
                className="hover:text-gray-900 transition-colors"
              >
                Dashboard
              </button>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Daily Updates (SOD/EOD)</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={(isAdmin || isManager) ? undefined : new Date().toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              disabled={!(isAdmin || isManager) && selectedDate !== new Date().toISOString().split('T')[0]}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Info Banner for Past Dates */}
        {!(isAdmin || isManager) && !isViewingToday && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Viewing Past Date</p>
                <p className="text-sm text-blue-700 mt-1">
                  You are viewing a past date. You can only post updates for today.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            {canPostUpdates && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {!hasSOD && (
                  <button
                    onClick={() => setShowSODForm(true)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Sunset className="w-5 h-5" />
                      <span className="font-medium">Post SOD</span>
                    </div>
                    <Plus className="w-5 h-5" />
                  </button>
                )}

                {hasSOD && !hasLunchExit && !hasEOD && (
                  <button
                    onClick={handleLunchExit}
                    className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Coffee className="w-5 h-5" />
                      <span className="font-medium">Going for Lunch</span>
                    </div>
                    <Plus className="w-5 h-5" />
                  </button>
                )}

                {hasLunchExit && !hasLunchReturn && !hasEOD && (
                  <button
                    onClick={handleLunchReturn}
                    className="w-full flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Coffee className="w-5 h-5" />
                      <span className="font-medium">Back from Lunch</span>
                    </div>
                    <Plus className="w-5 h-5" />
                  </button>
                )}

                {hasSOD && !hasEOD && (
                  <button
                    onClick={prepareEODForm}
                    className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Post EOD</span>
                    </div>
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            )}

            {/* Today's Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SOD Posted</span>
                  {hasSOD ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lunch Exit</span>
                  {hasLunchExit ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lunch Return</span>
                  {hasLunchReturn ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : hasLunchExit ? (
                    <Clock className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">EOD Posted</span>
                  {hasEOD ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            {workingHours && (
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Working Hours</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">
                    {workingHours.hours}h {workingHours.minutes}m
                  </div>
                  <p className="text-blue-100 text-sm">Actual working time today</p>
                  {hasLunchExit && hasLunchReturn && (
                    <div className="mt-4 pt-4 border-t border-blue-400">
                      <p className="text-sm text-blue-100">
                        Lunch: {todayUpdates.lunchExit.time} - {todayUpdates.lunchReturn.time}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin/Manager Section */}
            {(isAdmin || isManager) && (
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Team Overview</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-100">Total Updates Today</span>
                    <span className="text-2xl font-bold">{teamUpdates.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-100">Completed EOD</span>
                    <span className="text-2xl font-bold">
                      {teamUpdates.filter(u => u.eod).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Timeline & Updates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">
                {(isAdmin || isManager) ? 'Team Updates' : 'My Timeline'}
              </h3>

              {/* Employee View */}
              {!(isAdmin || isManager) ? (
                <div className="space-y-6">
                  {todayUpdates ? (
                    <>
                      {/* SOD */}
                      {todayUpdates.sod && (
                        <div className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Sunset className="w-5 h-5 text-blue-500" />
                              <h4 className="font-semibold text-gray-900">Start of Day (SOD)</h4>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(todayUpdates.sod.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            SOD - {new Date(selectedDate).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <ul className="space-y-1.5 text-sm text-gray-600">
                            {todayUpdates.sod.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Lunch Exit */}
                      {todayUpdates.lunchExit && (
                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Coffee className="w-5 h-5 text-orange-500" />
                              <h4 className="font-semibold text-gray-900">Going for Lunch</h4>
                            </div>
                            <span className="text-sm text-gray-500">
                              {todayUpdates.lunchExit.time}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Lunch Return */}
                      {todayUpdates.lunchReturn && (
                        <div className="border-l-4 border-green-500 pl-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Coffee className="w-5 h-5 text-green-500" />
                              <h4 className="font-semibold text-gray-900">Back from Lunch</h4>
                            </div>
                            <span className="text-sm text-gray-500">
                              {todayUpdates.lunchReturn.time}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* EOD */}
                      {todayUpdates.eod && (
                        <div className="border-l-4 border-purple-500 pl-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-purple-500" />
                              <h4 className="font-semibold text-gray-900">End of Day (EOD)</h4>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(todayUpdates.eod.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            EOD - {new Date(selectedDate).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <ul className="space-y-2 text-sm">
                            {todayUpdates.eod.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                {task.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : task.status === 'partial' ? (
                                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <span className="text-gray-900">{task.task}</span>
                                  <span className="ml-2 text-gray-500">
                                    ({task.status}
                                    {task.completed && ` ${task.completed}/${task.total}`})
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No updates for this date</p>
                      {selectedDate === new Date().toISOString().split('T')[0] && (
                        <button
                          onClick={() => setShowSODForm(true)}
                          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                          Post your SOD
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Admin Team View */
                <div className="space-y-4">
                  {teamUpdates.length > 0 ? (
                    teamUpdates.map((update, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                              <span className="text-teal-700 font-semibold text-sm">
                                {update.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{update.name}</h4>
                              <p className="text-xs text-gray-500">{update.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {update.sod && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                SOD
                              </span>
                            )}
                            {update.eod && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                EOD
                              </span>
                            )}
                          </div>
                        </div>

                        {update.sod && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-gray-700 mb-1">SOD Tasks:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {update.sod.tasks.map((task, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <span className="text-blue-500">•</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {update.eod && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">EOD Status:</p>
                            <div className="flex items-center space-x-4 text-xs mb-2">
                              <span className="text-green-600">
                                ✓ {update.eod.tasks.filter(t => t.status === 'completed').length} Completed
                              </span>
                              <span className="text-orange-600">
                                ⚠ {update.eod.tasks.filter(t => t.status === 'partial').length} Partial
                              </span>
                              <span className="text-red-600">
                                ✗ {update.eod.tasks.filter(t => t.status === 'incomplete').length} Incomplete
                              </span>
                            </div>
                            
                            {/* Working Hours Display */}
                            {(() => {
                              const hours = calculateWorkingHours(update)
                              if (hours) {
                                return (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-semibold text-gray-700">Working Hours:</span>
                                      <span className="text-xs font-bold text-blue-600">
                                        {hours.hours}h {hours.minutes}m
                                      </span>
                                    </div>
                                    {update.lunchExit && update.lunchReturn && (
                                      <div className="mt-1">
                                        <span className="text-xs text-gray-600">
                                          Lunch: {update.lunchExit.time} - {update.lunchReturn.time}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )
                              }
                              return null
                            })()}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No team updates for this date</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SOD Form Modal */}
      {showSODForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">Post Start of Day (SOD)</h3>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {sodTasks.map((task, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => updateSODTask(idx, e.target.value)}
                      placeholder="e.g., Complete employee onboarding module - 120 mins"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {sodTasks.length > 1 && (
                      <button
                        onClick={() => removeSODTask(idx)}
                        className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addSODTask}
                className="mt-4 flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSODForm(false)
                  setSodTasks([''])
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSODSubmit}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Post SOD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EOD Form Modal */}
      {showEODForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">Post End of Day (EOD)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Update your task completion status
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {eodTasks.map((task, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">{task.task}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={task.status}
                          onChange={(e) => updateEODTask(idx, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="partial">Partial</option>
                          <option value="incomplete">Incomplete</option>
                        </select>
                      </div>

                      {task.status === 'partial' && (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Completed
                            </label>
                            <input
                              type="text"
                              value={task.completed}
                              onChange={(e) => updateEODTask(idx, 'completed', e.target.value)}
                              placeholder="e.g., 15"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Total
                            </label>
                            <input
                              type="text"
                              value={task.total}
                              onChange={(e) => updateEODTask(idx, 'total', e.target.value)}
                              placeholder="e.g., 20"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEODForm(false)
                  setEodTasks([])
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEODSubmit}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Post EOD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyUpdatesPage


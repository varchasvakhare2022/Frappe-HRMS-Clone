import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  User, 
  LogOut,
  Target,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Filter,
  Download,
  Search,
  Award,
  Users,
  BarChart3,
  Settings,
  MessageSquare,
  Star,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  CheckSquare,
  AlertCircle
} from 'lucide-react'

const PerformanceManagementPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('goals')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddReview, setShowAddReview] = useState(false)
  const [showAddCycle, setShowAddCycle] = useState(false)

  // Local state backed by localStorage
  const [cycles, setCycles] = useState(() => JSON.parse(localStorage.getItem('appraisalCycles') || '[]'))
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem('performanceGoals') || '[]'))
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('performanceReviews') || '[]'))

  useEffect(() => localStorage.setItem('appraisalCycles', JSON.stringify(cycles)), [cycles])
  useEffect(() => localStorage.setItem('performanceGoals', JSON.stringify(goals)), [goals])
  useEffect(() => localStorage.setItem('performanceReviews', JSON.stringify(reviews)), [reviews])

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')

  // Helper: all known users (from JSON + custom)
  const employeeUsersData = JSON.parse(localStorage.getItem('employeeUsersData') || '[]')
  const managerUsersData = JSON.parse(localStorage.getItem('managerUsersData') || '[]')
  const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
  const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
  const allEmployees = [...employeeUsersData, ...customEmployees]
  const allManagers = [...managerUsersData, ...customManagers]
  const everyone = [...allEmployees, ...allManagers]

  // Shortcuts based on role
  const employeeShortcuts = [
    { label: 'My Goals', icon: Target, link: null },
    { label: 'Self Evaluation', icon: Edit, link: null },
    { label: 'View Feedback', icon: MessageSquare, link: null },
    { label: 'My Appraisals', icon: Award, link: null }
  ]

  const adminShortcuts = [
    { label: 'Create Template', icon: FileText, link: null },
    { label: 'Manage Cycles', icon: Calendar, link: null },
    { label: 'Track All Goals', icon: Target, link: null },
    { label: 'Provide Feedback', icon: MessageSquare, link: null },
    { label: 'Configure KRAs', icon: Settings, link: null },
    { label: 'Appraisal Reports', icon: BarChart3, link: null }
  ]

  const shortcuts = isAdmin ? adminShortcuts : employeeShortcuts

  // Reports & Masters
  const reportsAndMasters = {
    reports: [
      { name: 'Appraisal Overview Report', icon: BarChart3 },
      { name: 'Goal Achievement Report', icon: Target },
      { name: 'Department Performance', icon: Users },
      { name: 'Employee Ratings', icon: Star },
      { name: 'Feedback Summary', icon: MessageSquare },
      { name: 'KRA Compliance', icon: CheckSquare }
    ],
    masters: [
      { name: 'Appraisal Templates', icon: FileText },
      { name: 'Key Result Areas (KRAs)', icon: Target },
      { name: 'Rating Scales', icon: Star },
      { name: 'Performance Categories', icon: Award }
    ]
  }

  // Dummy data for appraisal templates
  const appraisalTemplates = [
    {
      id: 'TPL-001',
      name: 'Annual Performance Review',
      description: 'Comprehensive annual review template with KRAs and goals',
      kras: 5,
      goals: 10,
      rating_scale: '1-5 Scale',
      isActive: true,
      created_by: 'Admin User',
      created_date: '2024-01-15'
    },
    {
      id: 'TPL-002',
      name: 'Quarterly Assessment',
      description: 'Quick quarterly check-in template',
      kras: 3,
      goals: 6,
      rating_scale: '1-5 Scale',
      isActive: true,
      created_by: 'Admin User',
      created_date: '2024-03-10'
    },
    {
      id: 'TPL-003',
      name: 'Probation Review',
      description: 'Template for probation period evaluation',
      kras: 4,
      goals: 8,
      rating_scale: '1-5 Scale',
      isActive: true,
      created_by: 'Sarah Wilson',
      created_date: '2024-02-20'
    },
    {
      id: 'TPL-004',
      name: 'Leadership Assessment',
      description: 'Special template for leadership roles',
      kras: 6,
      goals: 12,
      rating_scale: '1-10 Scale',
      isActive: false,
      created_by: 'Admin User',
      created_date: '2023-12-05'
    }
  ]

  // Ensure there is at least one sample cycle for first run
  useEffect(() => {
    if (cycles.length === 0) {
      setCycles([
        {
          id: 'CYC-2024-Q4',
          name: 'Q4 2024 Performance Review',
          template: 'Annual Performance Review',
          start_date: '2024-10-01',
          end_date: '2024-12-31',
          status: 'In Progress',
          employees: everyone.length,
          created_by: user.name || 'Admin User'
        }
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derived views
  const myGoals = useMemo(() => goals.filter(g => g.employeeEmail === user.email), [goals, user.email])
  const teamGoals = useMemo(() => {
    if (isAdmin) return goals
    if (isManager) {
      return goals.filter(g => g.managerEmail === user.email || g.reviewerEmail === user.email || (g.employeeManagerEmail && g.employeeManagerEmail === user.email))
    }
    return []
  }, [goals, isAdmin, isManager, user.email])

  const feedbackData = reviews

  // Dummy data for self-evaluations
  const selfEvaluations = reviews.filter(r => r.reviewerEmail === user.email && r.reviewerRole === 'Self')

  // Dummy data for KRAs
  const krasList = [
    {
      id: 'KRA-001',
      department: 'Engineering',
      name: 'Product Development',
      description: 'Develop and maintain high-quality software products',
      weightage: 40,
      metrics: ['Code Quality', 'Feature Completion', 'Bug Resolution']
    },
    {
      id: 'KRA-002',
      department: 'Engineering',
      name: 'Code Quality',
      description: 'Maintain high standards of code quality and testing',
      weightage: 30,
      metrics: ['Test Coverage', 'Code Review Score', 'Bug Count']
    },
    {
      id: 'KRA-003',
      department: 'Sales',
      name: 'Revenue Growth',
      description: 'Drive revenue through new and existing clients',
      weightage: 50,
      metrics: ['Sales Target', 'Client Acquisition', 'Revenue Per Client']
    },
    {
      id: 'KRA-004',
      department: 'HR',
      name: 'Talent Acquisition',
      description: 'Recruit and onboard quality talent',
      weightage: 35,
      metrics: ['Hiring Target', 'Time to Hire', 'Quality of Hire']
    },
    {
      id: 'KRA-005',
      department: 'Marketing',
      name: 'Brand Awareness',
      description: 'Increase brand visibility and engagement',
      weightage: 40,
      metrics: ['Social Media Growth', 'Website Traffic', 'Campaign ROI']
    }
  ]

  // Dummy data for formulas
  const formulaConfigs = [
    {
      id: 'FORMULA-001',
      name: 'Standard Performance Score',
      description: 'Weighted average of KRA scores',
      formula: '(KRA1 * Weight1 + KRA2 * Weight2 + ... + KRAn * Weightn) / Total Weight',
      isActive: true
    },
    {
      id: 'FORMULA-002',
      name: 'Goals Achievement Score',
      description: 'Percentage of goals achieved',
      formula: '(Achieved Goals / Total Goals) * 100',
      isActive: true
    },
    {
      id: 'FORMULA-003',
      name: '360-Degree Feedback Score',
      description: 'Combined score from multiple feedback sources',
      formula: '(Self Rating * 0.2 + Manager Rating * 0.5 + Peer Rating * 0.3)',
      isActive: false
    }
  ]

  // Analytics data
  const analyticsData = {
    overview: {
      totalEmployees: everyone.length,
      completedAppraisals: reviews.length,
      avgRating: reviews.length ? (reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / reviews.length).toFixed(1) : 0,
      goalsAchieved: goals.length ? Math.round((goals.filter(g => (g.status || '').toLowerCase() === 'achieved').length / goals.length) * 100) : 0
    },
    ratingDistribution: (() => {
      const buckets = [{label:'5.0',min:5,max:5,color:'bg-green-500'},{label:'4.0-4.9',min:4,max:4.99,color:'bg-blue-500'},{label:'3.0-3.9',min:3,max:3.99,color:'bg-yellow-500'},{label:'2.0-2.9',min:2,max:2.99,color:'bg-orange-500'},{label:'<2.0',min:0,max:1.99,color:'bg-red-500'}]
      const totals = buckets.map(b=>({rating:b.label,count:0,percentage:0,color:b.color}))
      if (reviews.length===0) return totals
      for (const r of reviews){
        const val = Number(r.rating)||0
        for (let i=0;i<buckets.length;i++){
          const b=buckets[i]
          if ((val>=b.min && val<=b.max) || (b.label==='5.0' && val===5)) { totals[i].count++; break }
        }
      }
      for (const t of totals){ t.percentage = Math.round((t.count/reviews.length)*1000)/10 }
      return totals
    })(),
    topPerformers: (() => {
      const byEmp = new Map()
      for (const r of reviews){
        const key = r.employeeEmail
        if (!byEmp.has(key)) byEmp.set(key,{count:0,sum:0,name:r.employeeName||key,department:r.department||'—',achievements:0})
        const m = byEmp.get(key); m.count++; m.sum += Number(r.rating)||0
      }
      const rows = [...byEmp.values()].map(v=>({name:v.name,department:v.department,rating: Number((v.sum/v.count).toFixed(1)), achievements: goals.filter(g=>g.employeeEmail && (g.employeeEmail===everyone.find(e=>e.name===v.name)?.email || g.employeeName===v.name) && (g.status||'').toLowerCase()==='achieved').length}))
      rows.sort((a,b)=>b.rating-a.rating)
      return rows.slice(0,3)
    })()
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/signup')
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'achieved':
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'in progress':
      case 'ongoing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const calculateProgress = (achieved, target) => {
    return Math.min((achieved / target) * 100, 100)
  }

  // CRUD handlers
  const addGoal = (form) => {
    const emp = everyone.find(e => e.email === form.employeeEmail)
    const newGoal = {
      id: `GOAL-${Date.now()}`,
      employeeEmail: form.employeeEmail,
      employeeName: emp?.name || form.employeeName || form.employeeEmail,
      department: form.department || emp?.department || '—',
      managerEmail: form.managerEmail || (isManager ? user.email : ''),
      kra: form.kra,
      goal: form.goal,
      target: Number(form.target || 100),
      achieved: Number(form.achieved || 0),
      status: form.status || 'In Progress',
      due_date: form.due_date || '',
      priority: form.priority || 'Medium',
      createdAt: new Date().toISOString(),
    }
    setGoals(prev => [newGoal, ...prev])
    setShowAddGoal(false)
  }

  const updateGoalProgress = (goalId, achieved, status) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, achieved: Number(achieved), status } : g))
  }

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId))
  }

  const addReview = (form) => {
    const emp = everyone.find(e => e.email === form.employeeEmail) || {}
    const newReview = {
      id: `RV-${Date.now()}`,
      employeeEmail: form.employeeEmail,
      employeeName: emp.name || form.employeeName || form.employeeEmail,
      reviewerEmail: user.email,
      reviewerRole: isAdmin || isManager ? 'Manager' : 'Self',
      cycle: form.cycle || cycles[0]?.name || 'General',
      rating: Number(form.rating || 0),
      comments: form.comments || '',
      date: new Date().toISOString().slice(0,10)
    }
    setReviews(prev => [newReview, ...prev])
    setShowAddReview(false)
  }

  const addCycle = (form) => {
    const newCycle = {
      id: `CYC-${Date.now()}`,
      name: form.name,
      template: form.template || appraisalTemplates[0]?.name || 'Standard',
      start_date: form.start_date,
      end_date: form.end_date,
      status: 'In Progress',
      employees: everyone.length,
      created_by: user.name || 'Admin'
    }
    setCycles(prev => [newCycle, ...prev])
    setShowAddCycle(false)
  }

  // Export team overview to CSV (admins/managers)
  const exportTeamCSV = () => {
    const data = (isAdmin ? goals : teamGoals)
      .map(g => ({
        Employee: g.employeeName,
        Email: g.employeeEmail,
        Department: g.department,
        Goal: g.goal,
        KRA: g.kra,
        Target: g.target,
        Achieved: g.achieved,
        ProgressPercent: Math.round(calculateProgress(g.achieved, g.target)),
        Status: g.status,
        Priority: g.priority,
        DueDate: g.due_date
      }))
    const header = Object.keys(data[0] || { Notice: 'No data' })
    const rows = [header.join(','), ...data.map(r => header.map(k => String(r[k]).replaceAll(',', ';')).join(','))]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'performance-team-overview.csv'
    a.click()
    URL.revokeObjectURL(url)
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
                <span className="text-gray-600">Performance Management</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Management</h1>
          <p className="text-gray-600">
            Effective performance management is key to unlocking your team's full potential and achieving organizational goals. 
            Talrn offers a comprehensive system that empowers you to define department-wise Key Result Areas (KRAs) and 
            individual goals, track progress, and provide continuous employee feedback. Embrace a more organized, growth-focused 
            approach with features like appraisal templates, automated goal score computation, formula-based final scores, and more.
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
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <shortcut.icon className="w-5 h-5 text-purple-600" />
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
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
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

        {/* Main Content Tabs */
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-8 px-6 min-w-max">
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'templates'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Appraisal Templates
              </button>
              <button
                onClick={() => setActiveTab('cycles')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'cycles'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Appraisal Cycles
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'goals'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Goals & KRAs
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'feedback'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Feedback
              </button>
              {!isAdmin && (
                <button
                  onClick={() => setActiveTab('self-eval')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'self-eval'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Self Evaluation
                </button>
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('formulas')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'formulas'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Score Formulas
                  </button>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === 'reports'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview Report
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Appraisal Templates Tab */}
            {activeTab === 'templates' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appraisal Templates</h3>
                  {isAdmin && (
                    <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Create Template</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {appraisalTemplates.map((template) => (
                    <div key={template.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{template.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">ID: {template.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">KRAs</p>
                          <p className="text-lg font-semibold text-gray-900">{template.kras}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Goals</p>
                          <p className="text-lg font-semibold text-gray-900">{template.goals}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Scale</p>
                          <p className="text-sm font-semibold text-gray-900">{template.rating_scale}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>By {template.created_by}</span>
                        <span>{template.created_date}</span>
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
                            <button className="px-3 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appraisal Cycles Tab */}
            {activeTab === 'cycles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appraisal Cycles</h3>
                  {isAdmin && (
                    <button onClick={() => setShowAddCycle(true)} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Create Cycle</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {cycles.map((cycle) => (
                    <div key={cycle.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{cycle.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {cycle.start_date} to {cycle.end_date} | Template: {cycle.template}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cycle.status)}`}>
                          {cycle.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <p className="text-xs text-gray-500">Employees</p>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{cycle.employees}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="text-xs text-gray-500">Completed</p>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{cycle.completed}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <p className="text-xs text-gray-500">Pending</p>
                          </div>
                          <p className="text-2xl font-bold text-yellow-600">{cycle.pending}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                            <p className="text-xs text-gray-500">Progress</p>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">
                            {cycle.employees ? Math.round(((cycle.completed || 0) / cycle.employees) * 100) : 0}%
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Completion Progress</span>
                          <span>{cycle.completed || 0} / {cycle.employees}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${cycle.employees ? ((cycle.completed || 0) / cycle.employees) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {isAdmin && (
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          {cycle.status === 'In Progress' && (
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                              <Pause className="w-4 h-4" />
                              <span>Pause Cycle</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals & KRAs Tab */}
            {activeTab === 'goals' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Goals & Key Result Areas</h3>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    {(isAdmin || isManager) && (
                      <button onClick={() => setShowAddGoal(true)} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Goal</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* KRAs Overview */}
                {isAdmin && (
                  <div className="mb-8">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Key Result Areas by Department</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {krasList.map((kra) => (
                        <div key={kra.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{kra.name}</h5>
                            <span className="text-xs font-medium text-purple-600">{kra.weightage}%</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{kra.department}</p>
                          <p className="text-sm text-gray-700 mb-3">{kra.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {kra.metrics.map((metric, idx) => (
                              <span key={idx} className="px-2 py-1 bg-white rounded text-xs text-gray-600">
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Goals List */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-md font-semibold text-gray-900">Individual Goals</h4>
                  {(isAdmin || isManager) && (
                    <button onClick={exportTeamCSV} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Export CSV
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {(isAdmin ? goals : isManager ? teamGoals : myGoals).map((goal) => (
                    <div key={goal.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h5 className="font-semibold text-gray-900">{goal.goal}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                              {goal.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                              {goal.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {goal.employeeName} • {goal.department || '—'} • KRA: {goal.kra}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="text-sm font-medium text-gray-900">{goal.due_date}</p>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>
                            {Number(goal.achieved).toLocaleString()} / {Number(goal.target).toLocaleString()} 
                            <span className="ml-1 font-medium">
                              ({Math.round(calculateProgress(goal.achieved, goal.target))}%)
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getProgressColor(calculateProgress(goal.achieved, goal.target))}`}
                            style={{ width: `${calculateProgress(goal.achieved, goal.target)}%` }}
                          />
                        </div>
                      </div>

                      {(isAdmin || isManager) && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <input type="number" min="0" placeholder="Achieved" defaultValue={goal.achieved}
                            onBlur={(e)=>updateGoalProgress(goal.id, e.target.value, goal.status)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded" />
                          <select defaultValue={goal.status} onChange={(e)=>updateGoalProgress(goal.id, goal.achieved, e.target.value)} className="px-2 py-1 border border-gray-300 rounded">
                            <option>In Progress</option>
                            <option>Achieved</option>
                            <option>Pending</option>
                            <option>Overdue</option>
                          </select>
                          <button onClick={()=>deleteGoal(goal.id)} className="ml-auto px-3 py-1.5 text-red-600 border border-red-200 rounded hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Feedback</h3>
                  {(isAdmin || isManager || !isAdmin) && (
                    <button onClick={()=>setShowAddReview(true)} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>{(isAdmin || isManager) ? 'Provide Feedback' : 'Add Self Review'}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {feedbackData.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="font-semibold text-gray-900">{feedback.employeeName || feedback.employee}</h5>
                          <p className="text-sm text-gray-600 mt-1">
                            From: {feedback.reviewerRole || 'Reviewer'} • {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(feedback.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{feedback.rating}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {feedback.cycle || 'General'}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          Reviewer: {feedback.reviewerEmail}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 bg-white rounded-lg p-4">
                        {feedback.comments}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Self Evaluation Tab (Employee only) */}
            {activeTab === 'self-eval' && !isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Self Evaluation</h3>
                  <button onClick={()=>setShowAddReview(true)} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Evaluation</span>
                  </button>
                </div>

                {selfEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{evaluation.cycle}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Submitted on {evaluation.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Self Rating</p>
                          <p className="text-2xl font-bold text-purple-600">{evaluation.rating}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('submitted')}`}>Submitted</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{evaluation.comments}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Score Formulas Tab (Admin only) */}
            {activeTab === 'formulas' && isAdmin && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Score Calculation Formulas</h3>
                  <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Formula</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formulaConfigs.map((formula) => (
                    <div key={formula.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-900">{formula.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{formula.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          formula.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {formula.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-xs text-gray-500 mb-2">Formula</p>
                        <code className="text-sm text-purple-600 font-mono">{formula.formula}</code>
                      </div>

                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                          {formula.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Report Tab (Admin only) */}
            {activeTab === 'reports' && isAdmin && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Appraisal Overview Report</h3>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 opacity-80" />
                      <span className="text-3xl font-bold">{analyticsData.overview.totalEmployees}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Employees</p>
                    <p className="text-xs opacity-75 mt-1">In current cycle</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 opacity-80" />
                      <span className="text-3xl font-bold">{analyticsData.overview.completedAppraisals}</span>
                    </div>
                    <p className="text-sm opacity-90">Completed Appraisals</p>
                    <p className="text-xs opacity-75 mt-1">
                      {Math.round((analyticsData.overview.completedAppraisals / analyticsData.overview.totalEmployees) * 100)}% completion
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-8 h-8 opacity-80" />
                      <span className="text-3xl font-bold">{analyticsData.overview.avgRating}</span>
                    </div>
                    <p className="text-sm opacity-90">Average Rating</p>
                    <p className="text-xs opacity-75 mt-1">Out of 5.0</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-8 h-8 opacity-80" />
                      <span className="text-3xl font-bold">{analyticsData.overview.goalsAchieved}%</span>
                    </div>
                    <p className="text-sm opacity-90">Goals Achieved</p>
                    <p className="text-xs opacity-75 mt-1">Average across all employees</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-6">Rating Distribution</h4>
                  <div className="space-y-4">
                    {analyticsData.ratingDistribution.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">{item.count} employees</span>
                            <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`${item.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="text-md font-semibold text-gray-900 mb-6">Top Performers</h4>
                  <div className="space-y-4">
                    {analyticsData.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{performer.name}</p>
                            <p className="text-sm text-gray-600">{performer.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">{performer.rating}</p>
                            <p className="text-xs text-gray-500">Rating</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{performer.achievements}</p>
                            <p className="text-xs text-gray-500">Goals</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    {/* Add Goal Modal */}
    {(showAddGoal && (isAdmin || isManager)) && (
      <FormModal title="Add Goal" onClose={()=>setShowAddGoal(false)} onSubmit={addGoal}>
        <FormField label="Employee" name="employeeEmail" type="select" options={everyone.map(u=>({label:`${u.name} (${u.email})`, value:u.email}))} required />
        <FormField label="KRA" name="kra" placeholder="e.g., Product Development" required />
        <FormField label="Goal" name="goal" placeholder="Define the goal" required />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Target" name="target" type="number" placeholder="100" />
          <FormField label="Achieved" name="achieved" type="number" placeholder="0" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Priority" name="priority" type="select" options={[{label:'Critical',value:'Critical'},{label:'High',value:'High'},{label:'Medium',value:'Medium'},{label:'Low',value:'Low'}]} />
          <FormField label="Status" name="status" type="select" options={[{label:'In Progress',value:'In Progress'},{label:'Achieved',value:'Achieved'},{label:'Pending',value:'Pending'},{label:'Overdue',value:'Overdue'}]} />
        </div>
        <FormField label="Due Date" name="due_date" type="date" />
      </FormModal>
    )}

    {/* Add Review Modal */}
    {showAddReview && (
      <FormModal title={(isAdmin||isManager)?'Provide Feedback':'Self Review'} onClose={()=>setShowAddReview(false)} onSubmit={addReview}>
        {(isAdmin||isManager) ? (
          <FormField label="Employee" name="employeeEmail" type="select" options={everyone.map(u=>({label:`${u.name} (${u.email})`, value:u.email}))} required />
        ) : (
          <input type="hidden" name="employeeEmail" value={user.email} />
        )}
        <FormField label="Cycle" name="cycle" type="select" options={cycles.map(c=>({label:c.name,value:c.name}))} />
        <FormField label="Rating (0-5)" name="rating" type="number" min="0" max="5" step="0.1" required />
        <FormField label="Comments" name="comments" type="textarea" placeholder="Write feedback..." />
      </FormModal>
    )}

    {/* Add Cycle Modal */}
    {(showAddCycle && isAdmin) && (
      <FormModal title="Create Appraisal Cycle" onClose={()=>setShowAddCycle(false)} onSubmit={addCycle}>
        <FormField label="Name" name="name" placeholder="e.g., Q1 2025 Performance Review" required />
        <FormField label="Template" name="template" type="select" options={appraisalTemplates.map(t=>({label:t.name,value:t.name}))} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start Date" name="start_date" type="date" required />
          <FormField label="End Date" name="end_date" type="date" required />
        </div>
      </FormModal>
    )}
    </div>
  )
}

export default PerformanceManagementPage

// Generic small form modal
function FormModal({ title, onClose, onSubmit, children }){
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {}
    for (const [k,v] of formData.entries()) payload[k] = v
    onSubmit(payload)
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {children}
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 text-sm border border-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-3 py-2 text-sm bg-purple-600 text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormField({ label, name, type='text', placeholder, options, required, min, max, step }){
  if (type === 'select') {
    return (
      <label className="block text-sm">
        <span className="text-gray-700">{label}</span>
        <select name={name} required={required} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2">
          {(options || []).map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
      </label>
    )
  }
  if (type === 'textarea') {
    return (
      <label className="block text-sm">
        <span className="text-gray-700">{label}</span>
        <textarea name={name} placeholder={placeholder} required={required} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-28" />
      </label>
    )
  }
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} min={min} max={max} step={step} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" />
    </label>
  )
}


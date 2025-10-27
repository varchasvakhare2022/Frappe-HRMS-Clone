import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, ChevronRight, Calendar, Clock, FileText, TrendingUp,
  User, Users, Settings, Bell, HelpCircle, LogOut, Search,
  Plus, Filter, Download, Eye, Edit, Trash2, Check, X,
  ArrowRight, MapPin, MoreVertical, AlertCircle, UserCheck,
  Briefcase, Target, Send, MessageSquare, Star, Award,
  BarChart3, DollarSign, Building, Mail
} from 'lucide-react'

function RecruitmentPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('openings')

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
  const jobOpenings = [
    {
      id: 'JO-2024-001',
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      status: 'Open',
      applicants: 24,
      posted: '2024-10-20',
      deadline: '2024-11-30',
      salary: '$80,000 - $120,000'
    },
    {
      id: 'JO-2024-002',
      title: 'HR Manager',
      department: 'Human Resources',
      location: 'New York',
      type: 'Full-time',
      status: 'Open',
      applicants: 18,
      posted: '2024-10-18',
      deadline: '2024-11-25',
      salary: '$70,000 - $90,000'
    },
    {
      id: 'JO-2024-003',
      title: 'Product Designer',
      department: 'Design',
      location: 'San Francisco',
      type: 'Full-time',
      status: 'Closed',
      applicants: 45,
      posted: '2024-09-15',
      deadline: '2024-10-15',
      salary: '$75,000 - $95,000'
    },
    {
      id: 'JO-2024-004',
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Chicago',
      type: 'Full-time',
      status: 'Open',
      applicants: 32,
      posted: '2024-10-22',
      deadline: '2024-12-01',
      salary: '$60,000 - $80,000'
    },
    {
      id: 'JO-2024-005',
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'Remote',
      type: 'Internship',
      status: 'Open',
      applicants: 56,
      posted: '2024-10-25',
      deadline: '2024-11-20',
      salary: '$2,000/month'
    }
  ]

  const applicants = [
    {
      id: 'APP-001',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 234-567-8901',
      position: 'Senior React Developer',
      status: 'Interview Scheduled',
      stage: 'Technical Round',
      applied: '2024-10-22',
      experience: '5 years',
      rating: 4.5
    },
    {
      id: 'APP-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 234-567-8902',
      position: 'HR Manager',
      status: 'Under Review',
      stage: 'Resume Screening',
      applied: '2024-10-21',
      experience: '8 years',
      rating: 4.2
    },
    {
      id: 'APP-003',
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 234-567-8903',
      position: 'Product Designer',
      status: 'Offer Sent',
      stage: 'Final Stage',
      applied: '2024-10-15',
      experience: '6 years',
      rating: 4.8
    },
    {
      id: 'APP-004',
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 234-567-8904',
      position: 'Sales Executive',
      status: 'Rejected',
      stage: 'Initial Screening',
      applied: '2024-10-23',
      experience: '2 years',
      rating: 2.5
    },
    {
      id: 'APP-005',
      name: 'James Brown',
      email: 'james.brown@email.com',
      phone: '+1 234-567-8905',
      position: 'Senior React Developer',
      status: 'Interview Scheduled',
      stage: 'HR Round',
      applied: '2024-10-24',
      experience: '7 years',
      rating: 4.6
    }
  ]

  const interviews = [
    {
      id: 'INT-001',
      candidate: 'Alex Thompson',
      position: 'Senior React Developer',
      interviewer: 'John Manager',
      date: '2024-10-30',
      time: '10:00 AM',
      type: 'Technical',
      status: 'Scheduled',
      location: 'Video Call'
    },
    {
      id: 'INT-002',
      candidate: 'James Brown',
      position: 'Senior React Developer',
      interviewer: 'Jane HR',
      date: '2024-10-29',
      time: '02:00 PM',
      type: 'HR',
      status: 'Scheduled',
      location: 'Office - Floor 3'
    },
    {
      id: 'INT-003',
      candidate: 'David Chen',
      position: 'Product Designer',
      interviewer: 'Design Team',
      date: '2024-10-28',
      time: '11:00 AM',
      type: 'Final',
      status: 'Completed',
      location: 'Video Call'
    }
  ]

  const staffingPlans = [
    {
      department: 'Engineering',
      current: 45,
      planned: 60,
      vacancies: 15,
      budget: '$1,800,000',
      timeline: 'Q4 2024'
    },
    {
      department: 'Sales',
      current: 28,
      planned: 35,
      vacancies: 7,
      budget: '$560,000',
      timeline: 'Q1 2025'
    },
    {
      department: 'Marketing',
      current: 18,
      planned: 22,
      vacancies: 4,
      budget: '$320,000',
      timeline: 'Q4 2024'
    },
    {
      department: 'Human Resources',
      current: 12,
      planned: 15,
      vacancies: 3,
      budget: '$240,000',
      timeline: 'Q1 2025'
    }
  ]

  const recruitmentStats = {
    totalOpenings: 5,
    activeApplicants: 24,
    scheduledInterviews: 2,
    offersSent: 1,
    averageTimeToHire: '28 days',
    successRate: '68%'
  }

  const shortcuts = [
    { icon: Plus, label: 'Post New Job', count: null },
    { icon: Users, label: 'View Applicants', count: applicants.length },
    { icon: Calendar, label: 'Schedule Interview', count: interviews.filter(i => i.status === 'Scheduled').length },
    { icon: BarChart3, label: 'Analytics', count: null }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-700 border-green-200'
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'interview scheduled': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'under review': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'offer sent': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const renderRating = (rating) => {
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
      case 'openings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Job Openings</h2>
                <p className="text-sm text-gray-600 mt-1">Manage and track active job positions</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  Post New Job
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {jobOpenings.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Posted: {job.posted}</span>
                          <span>Deadline: {job.deadline}</span>
                          <span className="font-medium text-blue-600">{job.applicants} Applicants</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'applicants':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Job Applicants</h2>
                <p className="text-sm text-gray-600 mt-1">Review and manage candidate applications</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(applicant.name)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{applicant.name}</p>
                            <p className="text-xs text-gray-500">{applicant.experience} exp.</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{applicant.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{applicant.stage}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{renderRating(applicant.rating)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.applied}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <X className="w-4 h-4" />
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

      case 'interviews':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Interview Schedule</h2>
                <p className="text-sm text-gray-600 mt-1">Manage candidate interviews and feedback</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                <Plus className="w-4 h-4" />
                Schedule Interview
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                            {getInitials(interview.candidate)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{interview.candidate}</h3>
                            <p className="text-sm text-gray-600">{interview.position}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Date & Time</p>
                            <p className="font-medium text-gray-900">{interview.date} at {interview.time}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Interviewer</p>
                            <p className="font-medium text-gray-900">{interview.interviewer}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Type</p>
                            <p className="font-medium text-gray-900">{interview.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Location</p>
                            <p className="font-medium text-gray-900">{interview.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MessageSquare className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'staffing':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Staffing Plans</h2>
                <p className="text-sm text-gray-600 mt-1">Anticipate hiring needs and plan resources</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                <Plus className="w-4 h-4" />
                Create Plan
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffingPlans.map((plan, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.department}</h3>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {plan.timeline}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Staff</span>
                        <span className="text-lg font-bold text-gray-900">{plan.current}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Planned Staff</span>
                        <span className="text-lg font-bold text-blue-600">{plan.planned}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Vacancies</span>
                        <span className="text-lg font-bold text-orange-600">{plan.vacancies}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-600">Budget</span>
                        <span className="text-lg font-bold text-green-600">{plan.budget}</span>
                      </div>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600"
                        style={{ width: `${(plan.current / plan.planned) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {((plan.current / plan.planned) * 100).toFixed(0)}% filled
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Job Openings</h3>
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{recruitmentStats.totalOpenings}</p>
                <p className="text-sm text-gray-600">Active positions</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Active Applicants</h3>
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{recruitmentStats.activeApplicants}</p>
                <p className="text-sm text-gray-600">In pipeline</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Scheduled Interviews</h3>
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{recruitmentStats.scheduledInterviews}</p>
                <p className="text-sm text-gray-600">This week</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Time to Hire</h3>
                <div className="text-center">
                  <p className="text-5xl font-bold text-blue-600 mb-2">{recruitmentStats.averageTimeToHire}</p>
                  <p className="text-sm text-gray-600">Average hiring time</p>
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>5% faster than last quarter</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-600 mb-2">{recruitmentStats.successRate}</p>
                  <p className="text-sm text-gray-600">Offer acceptance rate</p>
                  <div className="mt-4 relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-green-600"
                      style={{ width: recruitmentStats.successRate }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Department-wise Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Hiring</h3>
              <div className="space-y-4">
                {staffingPlans.map((plan, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{plan.department}</span>
                      <span className="text-sm text-gray-600">{plan.vacancies} openings</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600"
                        style={{ width: `${(plan.current / plan.planned) * 100}%` }}
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
              <span className="text-sm font-semibold text-gray-900">Recruitment</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment</h1>
          <p className="text-gray-600">From planning hiring strategy to making job offers - manage your entire recruitment cycle</p>
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
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
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
            {/* Column 1: Job Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Job Management</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('openings')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Job Openings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('staffing')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Staffing Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Job Templates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Candidate Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Candidate Management</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('applicants')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Job Applicants</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedSection('interviews')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Interview Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Job Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 3: Reports & Analytics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Reports & Analytics</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedSection('analytics')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Recruitment Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Interview Feedback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>Hiring Reports</span>
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

export default RecruitmentPage


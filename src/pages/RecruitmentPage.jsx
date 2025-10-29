import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Plus, Users, Calendar, BarChart3, Briefcase, 
  Edit, Trash2, Eye, X, CheckCircle, Clock, XCircle,
  Mail, Phone, MapPin, DollarSign, Building2, FileText
} from 'lucide-react'

function RecruitmentPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [showJobForm, setShowJobForm] = useState(false)
  const [showApplicantForm, setShowApplicantForm] = useState(false)
  const [showInterviewForm, setShowInterviewForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  
  // Data states
  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [interviews, setInterviews] = useState([])
  
  // Form states
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
    deadline: ''
  })
  
  const [applicantForm, setApplicantForm] = useState({
    jobId: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '',
    resumeLink: ''
  })
  
  const [interviewForm, setInterviewForm] = useState({
    applicantId: '',
    date: '',
    time: '',
    interviewer: '',
    mode: 'Video Call',
    location: ''
  })
  
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

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
      loadData()
    }
  }, [user])

  const loadData = () => {
    const storedJobs = JSON.parse(localStorage.getItem('jobOpenings') || '[]')
    const storedApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]')
    const storedInterviews = JSON.parse(localStorage.getItem('interviews') || '[]')
    
    setJobs(storedJobs)
    setApplicants(storedApplicants)
    setInterviews(storedInterviews)
  }

  const handleJobSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!jobForm.title.trim()) newErrors.title = 'Job title is required'
    if (!jobForm.department.trim()) newErrors.department = 'Department is required'
    if (!jobForm.location.trim()) newErrors.location = 'Location is required'
    if (!jobForm.description.trim()) newErrors.description = 'Description is required'
    if (!jobForm.deadline) newErrors.deadline = 'Deadline is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const storedJobs = JSON.parse(localStorage.getItem('jobOpenings') || '[]')
    
    if (editingJob) {
      const updatedJobs = storedJobs.map(job => 
        job.id === editingJob.id ? { ...job, ...jobForm, updatedAt: new Date().toISOString() } : job
      )
      localStorage.setItem('jobOpenings', JSON.stringify(updatedJobs))
      setSuccessMessage('Job updated successfully!')
    } else {
      const newJob = {
        id: `JOB-${Date.now()}`,
        ...jobForm,
        status: 'Open',
        postedBy: user.name,
        postedDate: new Date().toISOString(),
        applicantCount: 0
      }
      
      storedJobs.push(newJob)
      localStorage.setItem('jobOpenings', JSON.stringify(storedJobs))
      setSuccessMessage('Job posted successfully!')
    }
    
    setTimeout(() => setSuccessMessage(''), 3000)
    resetJobForm()
    loadData()
  }

  const handleApplicantSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!applicantForm.jobId) newErrors.jobId = 'Please select a job'
    if (!applicantForm.name.trim()) newErrors.name = 'Name is required'
    if (!applicantForm.email.trim()) newErrors.email = 'Email is required'
    if (!applicantForm.phone.trim()) newErrors.phone = 'Phone is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const storedApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]')
    
    const newApplicant = {
      id: `APP-${Date.now()}`,
      ...applicantForm,
      status: 'Applied',
      appliedDate: new Date().toISOString(),
      interviewScheduled: false
    }
    
    storedApplicants.push(newApplicant)
    localStorage.setItem('jobApplicants', JSON.stringify(storedApplicants))
    
    // Update job applicant count
    const storedJobs = JSON.parse(localStorage.getItem('jobOpenings') || '[]')
    const updatedJobs = storedJobs.map(job => {
      if (job.id === applicantForm.jobId) {
        return { ...job, applicantCount: (job.applicantCount || 0) + 1 }
      }
      return job
    })
    localStorage.setItem('jobOpenings', JSON.stringify(updatedJobs))
    
    setSuccessMessage('Application submitted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    resetApplicantForm()
    loadData()
  }

  const handleInterviewSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!interviewForm.applicantId) newErrors.applicantId = 'Please select an applicant'
    if (!interviewForm.date) newErrors.date = 'Date is required'
    if (!interviewForm.time) newErrors.time = 'Time is required'
    if (!interviewForm.interviewer.trim()) newErrors.interviewer = 'Interviewer name is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const storedInterviews = JSON.parse(localStorage.getItem('interviews') || '[]')
    
    const newInterview = {
      id: `INT-${Date.now()}`,
      ...interviewForm,
      status: 'Scheduled',
      scheduledBy: user.name,
      scheduledDate: new Date().toISOString()
    }
    
    storedInterviews.push(newInterview)
    localStorage.setItem('interviews', JSON.stringify(storedInterviews))
    
    // Update applicant status
    const storedApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]')
    const updatedApplicants = storedApplicants.map(app => {
      if (app.id === interviewForm.applicantId) {
        return { ...app, status: 'Interview Scheduled', interviewScheduled: true }
      }
      return app
    })
    localStorage.setItem('jobApplicants', JSON.stringify(updatedApplicants))
    
    setSuccessMessage('Interview scheduled successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    resetInterviewForm()
    loadData()
  }

  const updateApplicantStatus = (applicantId, newStatus) => {
    const storedApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]')
    const updatedApplicants = storedApplicants.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    )
    localStorage.setItem('jobApplicants', JSON.stringify(updatedApplicants))
    loadData()
  }

  const updateInterviewStatus = (interviewId, newStatus) => {
    const storedInterviews = JSON.parse(localStorage.getItem('interviews') || '[]')
    const updatedInterviews = storedInterviews.map(int => 
      int.id === interviewId ? { ...int, status: newStatus } : int
    )
    localStorage.setItem('interviews', JSON.stringify(updatedInterviews))
    loadData()
  }

  const closeJob = (jobId) => {
    const storedJobs = JSON.parse(localStorage.getItem('jobOpenings') || '[]')
    const updatedJobs = storedJobs.map(job => 
      job.id === jobId ? { ...job, status: 'Closed' } : job
    )
    localStorage.setItem('jobOpenings', JSON.stringify(updatedJobs))
    loadData()
  }

  const deleteJob = (jobId) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return
    
    const storedJobs = JSON.parse(localStorage.getItem('jobOpenings') || '[]')
    const filtered = storedJobs.filter(job => job.id !== jobId)
    localStorage.setItem('jobOpenings', JSON.stringify(filtered))
    loadData()
  }

  const resetJobForm = () => {
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary: '',
      deadline: ''
    })
    setShowJobForm(false)
    setEditingJob(null)
    setErrors({})
  }

  const resetApplicantForm = () => {
    setApplicantForm({
      jobId: '',
      name: '',
      email: '',
      phone: '',
      experience: '',
      currentCompany: '',
      expectedSalary: '',
      noticePeriod: '',
      resumeLink: ''
    })
    setShowApplicantForm(false)
    setErrors({})
  }

  const resetInterviewForm = () => {
    setInterviewForm({
      applicantId: '',
      date: '',
      time: '',
      interviewer: '',
      mode: 'Video Call',
      location: ''
    })
    setShowInterviewForm(false)
    setErrors({})
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusBadge = (status) => {
    const styles = {
      Open: 'bg-green-100 text-green-700',
      Closed: 'bg-gray-100 text-gray-700',
      Applied: 'bg-blue-100 text-blue-700',
      'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
      Selected: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
      Scheduled: 'bg-yellow-100 text-yellow-700',
      Completed: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    )
  }

  if (!user) return null

  const isAdmin = user.role?.toLowerCase().includes('admin')
  const isManager = user.role?.toLowerCase().includes('manager')
  const canManageRecruitment = isAdmin || isManager

  // Calculate analytics
  const analytics = {
    totalJobs: jobs.length,
    openJobs: jobs.filter(j => j.status === 'Open').length,
    totalApplicants: applicants.length,
    pendingInterviews: interviews.filter(i => i.status === 'Scheduled').length,
    selectedCandidates: applicants.filter(a => a.status === 'Selected').length
  }

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
              <span className="text-gray-900 font-medium">Recruitment</span>
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recruitment</h1>
              <p className="text-gray-600">Manage job openings, applicants, and interviews</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {canManageRecruitment && (
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-3"
              >
                <Plus className="w-8 h-8" />
                <span className="font-medium">Post New Job</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveView('applicants')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                activeView === 'applicants' ? 'border-purple-600' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <Users className="w-8 h-8 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">View Applicants</div>
                <div className="text-sm text-gray-500">{applicants.length} total</div>
              </div>
            </button>
            
            {canManageRecruitment && (
              <button
                onClick={() => setActiveView('interviews')}
                className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  activeView === 'interviews' ? 'border-purple-600' : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="text-center">
                  <div className="font-medium text-gray-900">Interviews</div>
                  <div className="text-sm text-gray-500">{interviews.length} total</div>
                </div>
              </button>
            )}
            
            <button
              onClick={() => setActiveView('dashboard')}
              className={`bg-white p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                activeView === 'dashboard' ? 'border-purple-600' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Analytics</div>
                <div className="text-sm text-gray-500">View stats</div>
              </div>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingJob ? 'Edit Job Posting' : 'Post New Job'}
                </h2>
                <button onClick={resetJobForm} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleJobSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g., Senior React Developer"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <input
                      type="text"
                      value={jobForm.department}
                      onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g., Engineering"
                    />
                    {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g., Remote / New York"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., $80,000 - $120,000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                    <textarea
                      value={jobForm.description}
                      onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                      rows={4}
                      placeholder="Describe the role and responsibilities..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                    <textarea
                      value={jobForm.requirements}
                      onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="List required skills and qualifications..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
                    <input
                      type="date"
                      value={jobForm.deadline}
                      onChange={(e) => setJobForm({...jobForm, deadline: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                    />
                    {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </button>
                  <button
                    type="button"
                    onClick={resetJobForm}
                    className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Applicant Form Modal */}
        {showApplicantForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-gray-900">Apply for Job</h2>
                <button onClick={resetApplicantForm} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleApplicantSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Job *</label>
                  <select
                    value={applicantForm.jobId}
                    onChange={(e) => setApplicantForm({...applicantForm, jobId: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.jobId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="">Choose a job</option>
                    {jobs.filter(j => j.status === 'Open').map(job => (
                      <option key={job.id} value={job.id}>{job.title} - {job.location}</option>
                    ))}
                  </select>
                  {errors.jobId && <p className="mt-1 text-sm text-red-500">{errors.jobId}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({...applicantForm, name: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({...applicantForm, email: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={applicantForm.phone}
                      onChange={(e) => setApplicantForm({...applicantForm, phone: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                      placeholder="+1 234 567 8900"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                    <input
                      type="number"
                      value={applicantForm.experience}
                      onChange={(e) => setApplicantForm({...applicantForm, experience: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                    <input
                      type="text"
                      value={applicantForm.currentCompany}
                      onChange={(e) => setApplicantForm({...applicantForm, currentCompany: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
                    <input
                      type="text"
                      value={applicantForm.expectedSalary}
                      onChange={(e) => setApplicantForm({...applicantForm, expectedSalary: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="$100,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period (Days)</label>
                    <input
                      type="number"
                      value={applicantForm.noticePeriod}
                      onChange={(e) => setApplicantForm({...applicantForm, noticePeriod: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume Link</label>
                    <input
                      type="url"
                      value={applicantForm.resumeLink}
                      onChange={(e) => setApplicantForm({...applicantForm, resumeLink: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={resetApplicantForm}
                    className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Interview Form Modal */}
        {showInterviewForm && canManageRecruitment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-gray-900">Schedule Interview</h2>
                <button onClick={resetInterviewForm} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleInterviewSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Applicant *</label>
                  <select
                    value={interviewForm.applicantId}
                    onChange={(e) => setInterviewForm({...interviewForm, applicantId: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.applicantId ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  >
                    <option value="">Choose an applicant</option>
                    {applicants.filter(a => a.status === 'Applied' || a.status === 'Interview Scheduled').map(app => {
                      const job = jobs.find(j => j.id === app.jobId)
                      return (
                        <option key={app.id} value={app.id}>
                          {app.name} - {job?.title}
                        </option>
                      )
                    })}
                  </select>
                  {errors.applicantId && <p className="mt-1 text-sm text-red-500">{errors.applicantId}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date *</label>
                    <input
                      type="date"
                      value={interviewForm.date}
                      onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                      type="time"
                      value={interviewForm.time}
                      onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer Name *</label>
                    <input
                      type="text"
                      value={interviewForm.interviewer}
                      onChange={(e) => setInterviewForm({...interviewForm, interviewer: e.target.value})}
                      className={`w-full px-4 py-2 border ${errors.interviewer ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                      placeholder="Interviewer name"
                    />
                    {errors.interviewer && <p className="mt-1 text-sm text-red-500">{errors.interviewer}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interview Mode</label>
                    <select
                      value={interviewForm.mode}
                      onChange={(e) => setInterviewForm({...interviewForm, mode: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Video Call</option>
                      <option>In-Person</option>
                      <option>Phone Call</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location/Meeting Link</label>
                    <input
                      type="text"
                      value={interviewForm.location}
                      onChange={(e) => setInterviewForm({...interviewForm, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Office address or video call link"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Schedule Interview
                  </button>
                  <button
                    type="button"
                    onClick={resetInterviewForm}
                    className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content Views */}
        {activeView === 'dashboard' && (
          <div>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-900">{analytics.openJobs}</span>
                </div>
                <p className="text-gray-600">Open Positions</p>
                <p className="text-sm text-gray-500 mt-1">Out of {analytics.totalJobs} total</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">{analytics.totalApplicants}</span>
                </div>
                <p className="text-gray-600">Total Applicants</p>
                <p className="text-sm text-gray-500 mt-1">Across all jobs</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-yellow-600" />
                  <span className="text-2xl font-bold text-gray-900">{analytics.pendingInterviews}</span>
                </div>
                <p className="text-gray-600">Pending Interviews</p>
                <p className="text-sm text-gray-500 mt-1">Scheduled</p>
              </div>
            </div>

            {/* Job Listings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Job Openings ({jobs.length})</h3>
                {canManageRecruitment && (
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    + Post Job
                  </button>
                )}
              </div>

              <div className="p-6">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No job openings yet</p>
                    {canManageRecruitment && (
                      <p className="text-sm text-gray-500 mt-1">Click "Post Job" to create one</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map(job => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                              {getStatusBadge(job.status)}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {job.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.salary || 'Not specified'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {job.applicantCount || 0} applicants
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{job.description}</p>
                          </div>

                          {canManageRecruitment && (
                            <div className="flex gap-2">
                              {job.status === 'Open' && (
                                <button
                                  onClick={() => closeJob(job.id)}
                                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                  title="Close job"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingJob(job)
                                  setJobForm(job)
                                  setShowJobForm(true)
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteJob(job.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Posted: {formatDate(job.postedDate)}</span>
                          <span>•</span>
                          <span>Deadline: {formatDate(job.deadline)}</span>
                          <span>•</span>
                          <span>By: {job.postedBy}</span>
                        </div>

                        {!canManageRecruitment && job.status === 'Open' && (
                          <div className="mt-4">
                            <button
                              onClick={() => {
                                setApplicantForm({...applicantForm, jobId: job.id})
                                setShowApplicantForm(true)
                              }}
                              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              Apply Now
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'applicants' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Job Applicants ({applicants.length})</h3>
              {!canManageRecruitment && (
                <button
                  onClick={() => setShowApplicantForm(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  + Apply for Job
                </button>
              )}
            </div>

            <div className="p-6">
              {applicants.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No applicants yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applicant</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Job Position</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Experience</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applied On</th>
                        {canManageRecruitment && (
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map(applicant => {
                        const job = jobs.find(j => j.id === applicant.jobId)
                        return (
                          <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                                <p className="text-xs text-gray-500">{applicant.currentCompany || 'N/A'}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">{job?.title || 'N/A'}</td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-600">{applicant.email}</p>
                              <p className="text-xs text-gray-500">{applicant.phone}</p>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{applicant.experience || '0'} yrs</td>
                            <td className="py-3 px-4">{getStatusBadge(applicant.status)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{formatDate(applicant.appliedDate)}</td>
                            {canManageRecruitment && (
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  {applicant.status === 'Applied' && (
                                    <>
                                      <button
                                        onClick={() => {
                                          setInterviewForm({...interviewForm, applicantId: applicant.id})
                                          setShowInterviewForm(true)
                                        }}
                                        className="text-blue-600 hover:text-blue-700 text-sm"
                                        title="Schedule Interview"
                                      >
                                        Schedule
                                      </button>
                                      <button
                                        onClick={() => updateApplicantStatus(applicant.id, 'Rejected')}
                                        className="text-red-600 hover:text-red-700 text-sm"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {applicant.status === 'Interview Scheduled' && (
                                    <button
                                      onClick={() => updateApplicantStatus(applicant.id, 'Selected')}
                                      className="text-green-600 hover:text-green-700 text-sm"
                                    >
                                      Select
                                    </button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'interviews' && canManageRecruitment && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Interview Schedule ({interviews.length})</h3>
              <button
                onClick={() => setShowInterviewForm(true)}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                + Schedule Interview
              </button>
            </div>

            <div className="p-6">
              {interviews.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No interviews scheduled</p>
                  <p className="text-sm text-gray-500 mt-1">Schedule interviews for applicants</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {interviews.map(interview => {
                    const applicant = applicants.find(a => a.id === interview.applicantId)
                    const job = jobs.find(j => j.id === applicant?.jobId)
                    return (
                      <div key={interview.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{applicant?.name || 'N/A'}</h4>
                            <p className="text-sm text-gray-600 mb-3">{job?.title || 'N/A'} - {job?.department}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Date & Time</p>
                                <p className="font-medium text-gray-900">{formatDate(interview.date)} at {interview.time}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Interviewer</p>
                                <p className="font-medium text-gray-900">{interview.interviewer}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Mode</p>
                                <p className="font-medium text-gray-900">{interview.mode}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Location/Link</p>
                                <p className="font-medium text-gray-900 truncate">{interview.location || 'Not specified'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(interview.status)}
                            {interview.status === 'Scheduled' && (
                              <div className="flex gap-2 ml-2">
                                <button
                                  onClick={() => updateInterviewStatus(interview.id, 'Completed')}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                  title="Mark as completed"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateInterviewStatus(interview.id, 'Cancelled')}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Cancel"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Scheduled by {interview.scheduledBy} on {formatDate(interview.scheduledDate)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecruitmentPage


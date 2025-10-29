import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Folder, Plus, Edit, Trash2, Users, Calendar, CheckCircle, Play, TestTube, Rocket } from 'lucide-react'
import employeeUsersData from '../data/employeeUsers.json'
import managerUsersData from '../data/managerUsers.json'

function ProjectManagementPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projects, setProjects] = useState([])
  
  // Form state
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    estimatedFinishDate: '',
    testingDate: '',
    testedBy: '',
    deploymentDate: '',
    status: 'Planning',
    teamMembers: []
  })
  
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [showTeamSelector, setShowTeamSelector] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/')
    } else {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
    }
  }, [navigate])

  useEffect(() => {
    if (user) {
      loadProjects()
    }
  }, [user])

  const loadProjects = () => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    
    // Check user role
    const isAdmin = user?.role?.toLowerCase().includes('admin')
    const isManager = user?.role?.toLowerCase().includes('manager')
    
    if (isAdmin || isManager) {
      // Admins and managers see all projects
      setProjects(allProjects)
    } else {
      // Employees see only projects they're assigned to
      const myProjects = allProjects.filter(project => 
        project.teamMembers.some(member => member.email === user?.email)
      )
      setProjects(myProjects)
    }
  }

  // Get all available team members
  const getAllTeamMembers = () => {
    const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]')
    const customManagers = JSON.parse(localStorage.getItem('customManagers') || '[]')
    
    const allEmployees = [...employeeUsersData, ...customEmployees]
    const allManagers = [...managerUsersData, ...customManagers]
    
    return [...allEmployees, ...allManagers]
  }

  const projectStatuses = ['Planning', 'In Progress', 'Testing', 'Deployed', 'On Hold', 'Completed']

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.estimatedFinishDate) {
      newErrors.estimatedFinishDate = 'Estimated finish date is required'
    }
    
    if (formData.startDate && formData.estimatedFinishDate) {
      if (new Date(formData.estimatedFinishDate) < new Date(formData.startDate)) {
        newErrors.estimatedFinishDate = 'Finish date cannot be before start date'
      }
    }
    
    if (formData.teamMembers.length === 0) {
      newErrors.teamMembers = 'Please select at least one team member'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    
    if (editingProject) {
      // Update existing project
      const updatedProjects = allProjects.map(project => 
        project.id === editingProject.id
          ? {
              ...project,
              ...formData,
              updatedAt: new Date().toISOString(),
              updatedBy: user.name
            }
          : project
      )
      localStorage.setItem('projects', JSON.stringify(updatedProjects))
      setSuccessMessage('Project updated successfully!')
    } else {
      // Create new project
      const newProject = {
        id: Date.now().toString(),
        ...formData,
        createdBy: user.name,
        createdByEmail: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      allProjects.push(newProject)
      localStorage.setItem('projects', JSON.stringify(allProjects))
      setSuccessMessage('Project created successfully!')
    }
    
    setTimeout(() => setSuccessMessage(''), 3000)
    
    // Reset form
    setFormData({
      projectName: '',
      description: '',
      startDate: '',
      estimatedFinishDate: '',
      testingDate: '',
      testedBy: '',
      deploymentDate: '',
      status: 'Planning',
      teamMembers: []
    })
    setErrors({})
    setShowProjectForm(false)
    setEditingProject(null)
    
    // Reload projects
    loadProjects()
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      estimatedFinishDate: project.estimatedFinishDate,
      testingDate: project.testingDate || '',
      testedBy: project.testedBy || '',
      deploymentDate: project.deploymentDate || '',
      status: project.status,
      teamMembers: project.teamMembers
    })
    setShowProjectForm(true)
  }

  const handleDelete = (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }
    
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    const filteredProjects = allProjects.filter(p => p.id !== projectId)
    localStorage.setItem('projects', JSON.stringify(filteredProjects))
    loadProjects()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleTeamMemberToggle = (member) => {
    setFormData(prev => {
      const isSelected = prev.teamMembers.some(m => m.email === member.email)
      
      if (isSelected) {
        return {
          ...prev,
          teamMembers: prev.teamMembers.filter(m => m.email !== member.email)
        }
      } else {
        return {
          ...prev,
          teamMembers: [...prev.teamMembers, { name: member.name, email: member.email, role: member.role }]
        }
      }
    })
    
    if (errors.teamMembers) {
      setErrors(prev => ({ ...prev, teamMembers: '' }))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusBadge = (status) => {
    const styles = {
      Planning: 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      Testing: 'bg-yellow-100 text-yellow-700',
      Deployed: 'bg-green-100 text-green-700',
      'On Hold': 'bg-red-100 text-red-700',
      Completed: 'bg-purple-100 text-purple-700'
    }
    
    const icons = {
      Planning: <Calendar className="w-3 h-3" />,
      'In Progress': <Play className="w-3 h-3" />,
      Testing: <TestTube className="w-3 h-3" />,
      Deployed: <Rocket className="w-3 h-3" />,
      'On Hold': <Calendar className="w-3 h-3" />,
      Completed: <CheckCircle className="w-3 h-3" />
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
  const canManageProjects = isAdmin || isManager

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
              <span className="text-gray-900 font-medium">Project Management</span>
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
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {canManageProjects ? 'Project Management' : 'My Projects'}
                </h1>
                <p className="text-gray-600">
                  {canManageProjects 
                    ? 'Create and manage projects with your team' 
                    : 'View projects you are assigned to'}
                </p>
              </div>
            </div>

            {canManageProjects && (
              <button
                onClick={() => {
                  setShowProjectForm(!showProjectForm)
                  setEditingProject(null)
                  setFormData({
                    projectName: '',
                    description: '',
                    startDate: '',
                    estimatedFinishDate: '',
                    testingDate: '',
                    testedBy: '',
                    deploymentDate: '',
                    status: 'Planning',
                    teamMembers: []
                  })
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                {showProjectForm ? 'Cancel' : 'New Project'}
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Project Form */}
        {showProjectForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className={`w-full px-4 py-2 border ${errors.projectName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description"
                  rows={3}
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Finish Date *
                  </label>
                  <input
                    type="date"
                    name="estimatedFinishDate"
                    value={formData.estimatedFinishDate}
                    onChange={handleInputChange}
                    min={formData.startDate}
                    className={`w-full px-4 py-2 border ${errors.estimatedFinishDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  {errors.estimatedFinishDate && <p className="mt-1 text-sm text-red-500">{errors.estimatedFinishDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testing Date
                  </label>
                  <input
                    type="date"
                    name="testingDate"
                    value={formData.testingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deployment Date
                  </label>
                  <input
                    type="date"
                    name="deploymentDate"
                    value={formData.deploymentDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tested By & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tested By
                  </label>
                  <input
                    type="text"
                    name="testedBy"
                    value={formData.testedBy}
                    onChange={handleInputChange}
                    placeholder="Enter tester name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {projectStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Members * ({formData.teamMembers.length} selected)
                </label>
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={() => setShowTeamSelector(!showTeamSelector)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {showTeamSelector ? 'Hide' : 'Select'} Team Members
                  </button>
                </div>
                
                {showTeamSelector && (
                  <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <div className="space-y-2">
                      {getAllTeamMembers().map((member, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.teamMembers.some(m => m.email === member.email)}
                            onChange={() => handleTeamMemberToggle(member)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.email} • {member.role}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {formData.teamMembers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.teamMembers.map((member, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                      >
                        {member.name}
                        <button
                          type="button"
                          onClick={() => handleTeamMemberToggle(member)}
                          className="hover:text-indigo-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.teamMembers && <p className="mt-1 text-sm text-red-500">{errors.teamMembers}</p>}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false)
                    setEditingProject(null)
                    setFormData({
                      projectName: '',
                      description: '',
                      startDate: '',
                      estimatedFinishDate: '',
                      testingDate: '',
                      testedBy: '',
                      deploymentDate: '',
                      status: 'Planning',
                      teamMembers: []
                    })
                    setErrors({})
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {canManageProjects ? 'All Projects' : 'My Projects'} ({projects.length})
            </h3>
          </div>

          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No projects found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {canManageProjects 
                    ? 'Click "New Project" to create one' 
                    : 'You are not assigned to any projects yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{project.projectName}</h3>
                          {getStatusBadge(project.status)}
                        </div>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>
                      {canManageProjects && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Start Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Estimated Finish</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project.estimatedFinishDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Testing Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project.testingDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Deployment Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project.deploymentDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tested By</p>
                        <p className="text-sm font-medium text-gray-900">{project.testedBy || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Created By</p>
                        <p className="text-sm font-medium text-gray-900">{project.createdBy}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <p className="text-xs text-gray-500">Team Members ({project.teamMembers.length})</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.teamMembers.map((member, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            title={member.email}
                          >
                            {member.name}
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{member.role}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectManagementPage


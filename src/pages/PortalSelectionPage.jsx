import { useNavigate } from 'react-router-dom'
import { Shield, Users, User } from 'lucide-react'

function PortalSelectionPage() {
  const navigate = useNavigate()

  const portals = [
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Full system access and management',
      icon: Shield,
      color: 'from-purple-600 to-indigo-600',
      hoverColor: 'hover:from-purple-700 hover:to-indigo-700',
      path: '/admin/login',
    },
    {
      id: 'manager',
      title: 'Manager Portal',
      description: 'Team management and oversight',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'hover:from-blue-700 hover:to-cyan-700',
      path: '/manager/login',
    },
    {
      id: 'employee',
      title: 'Employee Portal',
      description: 'Personal dashboard and services',
      icon: User,
      color: 'from-teal-600 to-green-600',
      hoverColor: 'hover:from-teal-700 hover:to-green-700',
      path: '/employee/login',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/talrn-logo.jpeg" 
              alt="Talrn" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Talrn HRMS
          </h1>
          <p className="text-lg text-gray-600">
            Select your portal to continue
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <button
                key={portal.id}
                onClick={() => navigate(portal.path)}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-transparent"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center group-hover:bg-white group-hover:border-2 group-hover:border-white/30 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white group-hover:text-gray-900 transition-colors duration-300" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                    {portal.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                    {portal.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-300">
                      Sign In →
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PortalSelectionPage


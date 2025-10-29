import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Info,
  FileText,
  DollarSign,
  BookOpen,
  Mail,
  Share2,
  Check,
  UserPlus,
  Users,
  Clock,
  Umbrella,
  PieChart,
  Award,
  Banknote,
  Percent,
  Smartphone,
} from 'lucide-react'

const mainMenuItems = [
  { id: 'about', icon: Info, label: 'About', url: '/' },
  { id: 'pricing', icon: DollarSign, label: 'Pricing', url: '/pricing' },
  { id: 'documentation', icon: BookOpen, label: 'Documentation', url: '/documentation' },
  { id: 'blog', icon: FileText, label: 'Blog', url: '/blog' },
  { id: 'contact', icon: Mail, label: 'Contact', url: '/contact' },
]

const featureItems = [
  { id: 'recruitment', icon: UserPlus, label: 'Recruitment', url: '/features/recruitment' },
  { id: 'employee-lifecycle', icon: Users, label: 'Employee Lifecycle', url: '/features/employee-lifecycle' },
  { id: 'shifts-attendance', icon: Clock, label: 'Shifts & Attendance', url: '/features/attendance' },
  { id: 'leave', icon: Umbrella, label: 'Leave Management', url: '/features/leave' },
  { id: 'expense', icon: PieChart, label: 'Expense Management', url: '/features/expense' },
  { id: 'performance', icon: Award, label: 'Performance Management', url: '/features/performance' },
  { id: 'payroll', icon: Banknote, label: 'Payroll', url: '/features/payroll' },
  { id: 'payroll-tax', icon: Percent, label: 'Payroll Tax & Reports', url: '/features/payroll-tax' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile App', url: '/features/mobile' },
]

function Sidebar({ isHovered, setIsHovered }) {
  const location = useLocation()
  const [copiedId, setCopiedId] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const handleShare = (e, url, id) => {
    e.preventDefault()
    e.stopPropagation()
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setShowToast(true)
    setTimeout(() => {
      setCopiedId(null)
      setShowToast(false)
    }, 3000)
  }

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] animate-slide-up">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Link copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
    <aside
      className="fixed left-0 top-0 h-screen bg-gray-100 z-50 overflow-hidden"
      style={{
        width: isHovered ? '256px' : '48px',
        transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden sidebar-scroll">
        {/* Logo Section */}
        <Link
          to="/"
          className="py-4 flex-shrink-0 flex items-center"
        >
          <div style={{ width: '48px', minWidth: '48px' }} className="flex items-center justify-center">
            <img 
              src="/talrn-logo.jpeg" 
              alt="Talrn Logo" 
              className="w-9 h-9 object-contain"
            />
          </div>
          <span 
            className="font-semibold text-gray-900 whitespace-nowrap"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 200ms ease-out',
            }}
          >
            Talrn
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="pb-2">
          <div className="space-y-0.5">
            {mainMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.url
              const isCopied = copiedId === item.id

              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`w-full py-2 rounded-lg cursor-pointer flex items-center group ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{
                    transition: 'background-color 150ms ease-out, color 150ms ease-out',
                  }}
                >
                  <div style={{ width: '48px', minWidth: '48px' }} className="flex items-center justify-center">
                    <Icon className="w-[17px] h-[17px]" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 overflow-hidden flex items-center justify-between">
                    <span 
                      className="whitespace-nowrap text-sm font-normal"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 200ms ease-out',
                      }}
                    >
                      {item.label}
                    </span>
                    {isHovered && (
                      <button
                        onClick={(e) => handleShare(e, item.url, item.id)}
                        className="opacity-0 group-hover:opacity-100 mr-2 p-1 hover:bg-gray-300 rounded transition-all flex-shrink-0"
                        title="Copy link"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
                        )}
                      </button>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Features Section */}
        <div className="pt-2">
          <div
            className="flex items-center overflow-hidden"
            style={{
              height: '28px',
            }}
          >
            <div style={{ width: '48px', minWidth: '48px' }}></div>
            <span
              className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 200ms ease-out',
              }}
            >
              Features
            </span>
          </div>
          <div className="space-y-0.5">
            {featureItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.url
              const isCopied = copiedId === item.id

              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`w-full py-2 rounded-lg cursor-pointer flex items-center group ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{
                    transition: 'background-color 150ms ease-out, color 150ms ease-out',
                  }}
                >
                  <div style={{ width: '48px', minWidth: '48px' }} className="flex items-center justify-center">
                    <Icon className="w-[17px] h-[17px]" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 overflow-hidden flex items-center justify-between">
                    <span 
                      className="whitespace-nowrap text-sm font-normal"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 200ms ease-out',
                      }}
                    >
                      {item.label}
                    </span>
                    {isHovered && (
                      <button
                        onClick={(e) => handleShare(e, item.url, item.id)}
                        className="opacity-0 group-hover:opacity-100 mr-2 p-1 hover:bg-gray-300 rounded transition-all flex-shrink-0"
                        title="Copy link"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
                        )}
                      </button>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}

export default Sidebar

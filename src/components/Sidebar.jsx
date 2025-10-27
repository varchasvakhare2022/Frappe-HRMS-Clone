import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Info,
  Tag,
  BookOpen,
  Newspaper,
  Mail,
  UserPlus,
  RefreshCw,
  Clock,
  Umbrella,
  CreditCard,
  Star,
  Wallet,
  Percent,
  Smartphone,
  Share2,
  Check,
} from 'lucide-react'

const mainMenuItems = [
  { id: 'about', icon: Info, label: 'About', url: '/' },
  { id: 'pricing', icon: Tag, label: 'Pricing', url: '/pricing' },
  { id: 'documentation', icon: BookOpen, label: 'Documentation', url: '/documentation' },
  { id: 'blog', icon: Newspaper, label: 'Blog', url: '/blog' },
  { id: 'contact', icon: Mail, label: 'Contact', url: '/contact' },
]

const featureItems = [
  { id: 'recruitment', icon: UserPlus, label: 'Recruitment', url: '/features/recruitment' },
  { id: 'employee-lifecycle', icon: RefreshCw, label: 'Employee Lifecycle', url: '/features/employee-lifecycle' },
  { id: 'shifts-attendance', icon: Clock, label: 'Shifts & Attendance', url: '/features/shifts-attendance' },
  { id: 'leave-management', icon: Umbrella, label: 'Leave Management', url: '/features/leave-management' },
  { id: 'expense-management', icon: CreditCard, label: 'Expense Management', url: '/features/expense-management' },
  { id: 'performance-management', icon: Star, label: 'Performance Management', url: '/features/performance-management' },
  { id: 'payroll', icon: Wallet, label: 'Payroll', url: '/features/payroll' },
  { id: 'payroll-tax', icon: Percent, label: 'Payroll Tax & Reports', url: '/features/payroll-tax' },
  { id: 'mobile-app', icon: Smartphone, label: 'Mobile App', url: '/features/mobile-app' },
]

function Sidebar({ isHovered, setIsHovered }) {
  const location = useLocation()
  const [copiedId, setCopiedId] = useState(null)

  const handleShare = (e, url, id) => {
    e.preventDefault()
    e.stopPropagation()
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-100 z-50 overflow-hidden ${
        isHovered ? 'w-64' : 'w-12'
      }`}
      style={{
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
          <div className="w-12 flex items-center justify-center flex-shrink-0">
            <svg fill="none" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
              <path d="M36.9286 0.5H15.0714C7.02385 0.5 0.5 7.02385 0.5 15.0714V36.9286C0.5 44.9762 7.02385 51.5 15.0714 51.5H36.9286C44.9762 51.5 51.5 44.9762 51.5 36.9286V15.0714C51.5 7.02385 44.9762 0.5 36.9286 0.5Z" fill="#06B58B"></path>
              <path d="M15.9638 40.5715L13.5049 37.8758C16.9474 34.7612 21.3734 33.0308 25.9816 33.0308C30.5898 33.0308 35.0342 34.743 38.4585 37.8758L35.9995 40.5715C33.2309 38.0579 29.6791 36.6736 25.9816 36.6736C22.2841 36.6736 18.7142 38.0579 15.9456 40.5715H15.9638Z" fill="white"></path>
              <path d="M27.6756 11.4287H17.002V15.0716H27.6756C29.6792 15.0716 31.3185 16.7109 31.3185 18.7144V22.1023C31.3185 24.1058 29.6792 25.7451 27.6756 25.7451H24.2877C22.2841 25.7451 20.6448 24.1058 20.6448 22.1023V19.8072H17.002V22.1023C17.002 26.1276 20.2623 29.388 24.2877 29.388H27.6756C31.701 29.388 34.9613 26.1276 34.9613 22.1023V18.7144C34.9613 14.6891 31.701 11.4287 27.6756 11.4287Z" fill="white"></path>
            </svg>
          </div>
          <span 
            className="font-semibold text-gray-900 whitespace-nowrap overflow-hidden"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 200ms ease-out',
              width: isHovered ? 'auto' : '0',
            }}
          >
            Frappe HR
          </span>
        </Link>

        {/* Main Menu Items - First 5 */}
        <nav className="pb-2">
          <div className="space-y-0.5">
            {mainMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.url

              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`w-full py-2 rounded-lg cursor-pointer flex items-center ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{
                    transition: 'background-color 150ms ease-out, color 150ms ease-out',
                  }}
                >
                  <div className="w-12 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-[17px] h-[17px]" strokeWidth={1.8} />
                  </div>
                  <span 
                    className="whitespace-nowrap text-sm font-normal overflow-hidden"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 200ms ease-out',
                      width: isHovered ? 'auto' : '0',
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Gap between sections */}
          <div className="h-6"></div>

          {/* Features Section Header */}
          <div 
            className="mb-2 flex items-center"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 200ms ease-out',
            }}
          >
            <div className="w-12 flex-shrink-0"></div>
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider overflow-hidden">
              Features
            </h3>
          </div>

          {/* Feature Items - Next 9 */}
          <div className="space-y-0.5">
            {featureItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.url
              const isCopied = copiedId === item.id

              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`w-full py-2 rounded-lg cursor-pointer flex items-center group relative ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{
                    transition: 'background-color 150ms ease-out, color 150ms ease-out',
                  }}
                >
                  <div className="w-12 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-[17px] h-[17px]" strokeWidth={1.8} />
                  </div>
                  <span 
                    className="whitespace-nowrap text-sm font-normal overflow-hidden flex-1"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 200ms ease-out',
                      width: isHovered ? 'auto' : '0',
                    }}
                  >
                    {item.label}
                  </span>
                  {isHovered && (
                    <button
                      onClick={(e) => handleShare(e, item.url, item.id)}
                      className="opacity-0 group-hover:opacity-100 mr-2 p-1 hover:bg-gray-300 rounded transition-all"
                      title="Copy link"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
                      )}
                    </button>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

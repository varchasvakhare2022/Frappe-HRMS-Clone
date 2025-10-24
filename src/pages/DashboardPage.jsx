import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, Bell, HelpCircle, Menu, ChevronDown, ChevronRight,
  Briefcase, Folder, Users, Monitor, DollarSign, Wrench, 
  Settings, Link as LinkIcon, Hammer, Info, Zap
} from 'lucide-react'

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user')
    if (!loggedInUser) {
      navigate('/signup')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [navigate])

  // Close dropdown when clicking outside
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

  // Get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sidebarItems = [
    { icon: Briefcase, label: 'HR', hasSubmenu: false },
    { icon: Folder, label: 'Projects', hasSubmenu: false },
    { icon: Users, label: 'Users', hasSubmenu: false },
    { icon: Monitor, label: 'Website', hasSubmenu: false },
    { icon: DollarSign, label: 'Payroll', hasSubmenu: true },
    { icon: Wrench, label: 'Tools', hasSubmenu: false },
    { icon: Settings, label: 'ERPNext Settings', hasSubmenu: false },
    { icon: LinkIcon, label: 'Integrations', hasSubmenu: false },
    { icon: LinkIcon, label: 'ERPNext Integrations', hasSubmenu: false },
    { icon: Hammer, label: 'Build', hasSubmenu: false },
  ]

  const shortcuts = [
    'Purchase Invoice',
    'Payment Entry',
    'Journal Entry',
    'Accounts Payable',
  ]

  const reports = {
    Invoicing: ['Purchase Invoice', 'Supplier'],
    Payments: ['Payment Entry', 'Journal Entry', 'Payment Reconciliation'],
    Reports: [
      'Accounts Payable',
      'Accounts Payable Summary',
      'Purchase Register',
      'Item-wise Purchase Register',
      'Received Items To Be Billed',
      'Supplier Ledger Summary',
    ],
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 h-14 flex items-center px-4 sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 mr-4">
          <svg fill="none" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
            <path d="M36.9286 0.5H15.0714C7.02385 0.5 0.5 7.02385 0.5 15.0714V36.9286C0.5 44.9762 7.02385 51.5 15.0714 51.5H36.9286C44.9762 51.5 51.5 44.9762 51.5 36.9286V15.0714C51.5 7.02385 44.9762 0.5 36.9286 0.5Z" fill="#06B58B"></path>
            <path d="M15.9638 40.5715L13.5049 37.8758C16.9474 34.7612 21.3734 33.0308 25.9816 33.0308C30.5898 33.0308 35.0342 34.743 38.4585 37.8758L35.9995 40.5715C33.2309 38.0579 29.6791 36.6736 25.9816 36.6736C22.2841 36.6736 18.7142 38.0579 15.9456 40.5715H15.9638Z" fill="white"></path>
            <path d="M27.6756 11.4287H17.002V15.0716H27.6756C29.6792 15.0716 31.3185 16.7109 31.3185 18.7144V22.1023C31.3185 24.1058 29.6792 25.7451 27.6756 25.7451H24.2877C22.2841 25.7451 20.6448 24.1058 20.6448 22.1023V19.8072H17.002V22.1023C17.002 26.1276 20.2623 29.388 24.2877 29.388H27.6756C31.701 29.388 34.9613 26.1276 34.9613 22.1023V18.7144C34.9613 14.6891 31.701 11.4287 27.6756 11.4287Z" fill="white"></path>
          </svg>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or type a command (Ctrl + G)"
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm">Help</span>
          </button>
          <div className="relative user-dropdown">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 rounded-full bg-green-600 text-white font-medium text-xs flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              {getInitials(user.name)}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  My Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Session Defaults
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Reload
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  View Website
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Apps
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Toggle Full Width
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Toggle Theme
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Manage Billing
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <button className="text-gray-600 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-gray-900 text-lg">Payables</h2>
          </div>

          {/* Sidebar Content */}
          <div className="p-3">
            <div className="mb-3">
              <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 hover:text-gray-700 w-full">
                <span>PUBLIC</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-0.5">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-2.5 px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-600" strokeWidth={1.8} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && <ChevronDown className="w-3 h-3 text-gray-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="py-6 px-12 max-w-6xl">
            {/* Trial Banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="flex-1 text-sm text-gray-700">
                Your trial ends in 14 days. Please upgrade for uninterrupted services
              </p>
              <button className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap">
                <Zap className="w-4 h-4" />
                Upgrade plan
              </button>
            </div>

            {/* Shortcuts Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm"
                  >
                    <span>{shortcut}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Reports & Masters Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Masters</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(reports).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">{category}</h4>
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <button
                          key={index}
                          className="block text-gray-600 hover:text-gray-900 text-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

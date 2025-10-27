import { useLocation } from 'react-router-dom'

function TopBar({ isSidebarHovered }) {
  const location = useLocation()

  // Generate breadcrumb based on current path
  const getBreadcrumbs = () => {
    const path = location.pathname
    const breadcrumbs = [
      { label: 'Frappe', active: false },
      { label: 'Products', active: false },
      { label: 'Frappe HR', active: path === '/' },
    ]

    // Add page-specific breadcrumb
    if (path === '/pricing') {
      breadcrumbs.push({ label: 'Pricing', active: true })
    } else if (path === '/documentation') {
      breadcrumbs.push({ label: 'Documentation', active: true })
    } else if (path === '/blog') {
      breadcrumbs.push({ label: 'Blog', active: true })
    } else if (path === '/contact') {
      breadcrumbs.push({ label: 'Contact', active: true })
    } else if (path.startsWith('/features/')) {
      const featureName = path.replace('/features/', '').split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      breadcrumbs.push({ label: featureName, active: true })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div 
      className="fixed top-0 right-0 bg-white z-40 border-b border-gray-100"
      style={{
        left: isSidebarHovered ? '256px' : '48px',
        transition: 'left 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="flex items-center justify-between h-10 px-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-[14px]">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              <span 
                className={`font-normal ${crumb.active ? 'text-gray-500' : 'text-gray-900'}`}
              >
                {crumb.label}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400 font-light">›</span>
              )}
            </span>
          ))}
        </div>

        {/* Get Started Link */}
        <a
          href="/signup"
          className="flex items-center gap-2 text-[14px] text-gray-900 hover:text-gray-700 transition-all duration-200 font-medium hover:gap-3"
        >
          <span>Get started with Frappe HR</span>
          <span className="text-base">→</span>
        </a>
      </div>
    </div>
  )
}

export default TopBar

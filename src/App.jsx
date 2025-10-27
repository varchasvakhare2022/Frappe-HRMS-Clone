import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import DocumentationPage from './pages/DocumentationPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import FeaturePage from './pages/FeaturePage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import WorkflowPage from './pages/WorkflowPage'

function AppContent() {
  const location = useLocation()
  const hideLayout = location.pathname === '/signup' || location.pathname === '/dashboard' || location.pathname === '/workflow'
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)

  if (location.pathname === '/signup') {
    return <SignupPage />
  }

  if (location.pathname === '/dashboard') {
    return <DashboardPage />
  }

  if (location.pathname === '/workflow') {
    return <WorkflowPage />
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        isHovered={isSidebarHovered}
        setIsHovered={setIsSidebarHovered}
      />
      <TopBar isSidebarHovered={isSidebarHovered} />
      
      {/* Main Content Area with more side spacing */}
      <div 
        className="pt-10"
        style={{
          marginLeft: isSidebarHovered ? '256px' : '48px',
          transition: 'margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features/recruitment" element={<FeaturePage feature="recruitment" />} />
          <Route path="/features/employee-lifecycle" element={<FeaturePage feature="employee-lifecycle" />} />
          <Route path="/features/shifts-attendance" element={<FeaturePage feature="shifts-attendance" />} />
          <Route path="/features/leave-management" element={<FeaturePage feature="leave-management" />} />
          <Route path="/features/expense-management" element={<FeaturePage feature="expense-management" />} />
          <Route path="/features/performance-management" element={<FeaturePage feature="performance-management" />} />
          <Route path="/features/payroll" element={<FeaturePage feature="payroll" />} />
          <Route path="/features/payroll-tax" element={<FeaturePage feature="payroll-tax" />} />
          <Route path="/features/mobile-app" element={<FeaturePage feature="mobile-app" />} />
        </Routes>
        
        {/* Footer - full width */}
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  )
}

export default App

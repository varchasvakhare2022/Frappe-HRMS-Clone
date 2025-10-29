import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortalSelectionPage from './pages/PortalSelectionPage'
import AdminLoginPage from './pages/AdminLoginPage'
import ManagerLoginPage from './pages/ManagerLoginPage'
import EmployeeLoginPage from './pages/EmployeeLoginPage'
import DashboardPage from './pages/DashboardPage'
import LeaveManagementPage from './pages/LeaveManagementPage'
import AttendancePage from './pages/AttendancePage'
import RecruitmentPage from './pages/RecruitmentPage'
import EmployeeLifecyclePage from './pages/EmployeeLifecyclePage'
import ExpenseManagementPage from './pages/ExpenseManagementPage'
import PerformanceManagementPage from './pages/PerformanceManagementPage'
import PayrollPage from './pages/PayrollPage'
import PayrollTaxReportsPage from './pages/PayrollTaxReportsPage'
import MobileAppPage from './pages/MobileAppPage'
import DailyUpdatesPage from './pages/DailyUpdatesPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - Portal Selection */}
        <Route path="/" element={<PortalSelectionPage />} />
        
        {/* Login Routes for each portal */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/manager/login" element={<ManagerLoginPage />} />
        <Route path="/employee/login" element={<EmployeeLoginPage />} />
        
        {/* Legacy route - redirect to portal selection */}
        <Route path="/login" element={<PortalSelectionPage />} />
        <Route path="/signup" element={<PortalSelectionPage />} />
        
        {/* Dashboard and Feature Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leave-management" element={<LeaveManagementPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/employee-lifecycle" element={<EmployeeLifecyclePage />} />
        <Route path="/expense-management" element={<ExpenseManagementPage />} />
        <Route path="/performance-management" element={<PerformanceManagementPage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/payroll-tax-reports" element={<PayrollTaxReportsPage />} />
        <Route path="/mobile-app" element={<MobileAppPage />} />
        <Route path="/daily-updates" element={<DailyUpdatesPage />} />
        
        {/* Catch all - redirect to portal selection */}
        <Route path="/*" element={<PortalSelectionPage />} />
      </Routes>
    </Router>
  )
}

export default App

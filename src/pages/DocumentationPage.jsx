import { BookOpen, Search } from 'lucide-react'

function DocumentationPage() {
  const sections = [
    {
      title: 'Getting Started',
      topics: [
        'Installation Guide',
        'Quick Start Tutorial',
        'System Requirements',
        'First Steps',
      ],
    },
    {
      title: 'Core Modules',
      topics: [
        'Employee Management',
        'Leave Management',
        'Attendance Tracking',
        'Payroll Processing',
        'Expense Claims',
        'Performance Reviews',
      ],
    },
    {
      title: 'Configuration',
      topics: [
        'Company Settings',
        'Leave Policies',
        'Salary Structures',
        'Tax Settings',
        'Holidays Calendar',
      ],
    },
    {
      title: 'Advanced Topics',
      topics: [
        'Custom Fields',
        'Workflows',
        'Integrations',
        'API Documentation',
        'Security Settings',
      ],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600 mb-6">
          Everything you need to know about Frappe HR
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.topics.map((topic, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Need More Help?</h3>
        <p className="text-gray-700 mb-4">
          Can't find what you're looking for? Check out our community forum or contact support.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Visit Forum
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentationPage


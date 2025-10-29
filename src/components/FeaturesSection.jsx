import {
  UserPlus,
  RefreshCw,
  Clock,
  Umbrella,
  PieChart,
  Star,
  Wallet,
  Percent,
  Smartphone,
} from 'lucide-react'

function FeaturesSection() {
  const features = [
    {
      icon: UserPlus,
      title: 'Recruitment',
      description:
        'Growth made easy: plan, publish, analyze, engage, evaluate & hire',
    },
    {
      icon: RefreshCw,
      title: 'Employee Lifecycle',
      description:
        "From onboarding to exits, transfers to promotions, we've got your back every step of the way",
    },
    {
      icon: Clock,
      title: 'Shifts & Attendance',
      description: 'Mobile check-ins, roster management, and auto attendance',
    },
    {
      icon: Umbrella,
      title: 'Leave Management',
      description: 'Manage holidays, complex leave policies and encashments',
    },
    {
      icon: PieChart,
      title: 'Expense Management',
      description: 'Payout advances, streamline travel and expense accounting',
    },
    {
      icon: Star,
      title: 'Performance Management',
      description:
        'Plan goals & KRAs, create appraisals and ensure continuous feedback to help employees grow',
    },
    {
      icon: Wallet,
      title: 'Payroll',
      description:
        'Map diverse pay structures, employee loans & run accurate payroll with integrated accounting',
    },
    {
      icon: Percent,
      title: 'Payroll Tax & Reports',
      description:
        'Configure regional tax regulations & stay informed at all times with tax computation & projection reports',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Access Talrn from the convenience of your smartphone',
    },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-full">
        {/* Section Label */}
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-2">
          Features
        </p>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-12">
          What Talrn has to offer you
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-7 h-7 text-gray-900" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection


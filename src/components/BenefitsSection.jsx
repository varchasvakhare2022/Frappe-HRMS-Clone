function BenefitsSection() {
  const benefits = [
    {
      number: 1,
      title: '100% open source',
      description:
        'Talrn is a 100% open-source HR & Payroll product, offering you complete transparency and flexibility. Backed by a community of over 20,000 developers and 180 partners, there will never be a struggle for solutions',
    },
    {
      number: 2,
      title: 'Affordable & inclusive',
      description:
        'Say goodbye to overvalued SaaS solutions with inflated per-user pricing. With Talrn, your software expenses wouldn\'t grow as your team grows. Deliver the best employee and HR experience with a product designed for everyone in the organization',
    },
    {
      number: 3,
      title: 'Highly customizable',
      description:
        'Configure and customize to your liking. Create reports, forms, custom fields, print formats, and change layouts on the fly!',
    },
    {
      number: 4,
      title: 'Easy integrations',
      description:
        'Cut ties with disparate payroll and accounting systems to save hours of reconciliation work. Talrn promises integrated accounting with ERPNext every step of the way. Integrate with biometric tools, banks, or any third-party software',
    },
    {
      number: 5,
      title: 'Powered by modern low-code, no-code technology',
      description:
        'Our platform enables you to build your own forms, set up advanced approval workflows on any form, manage roles and permissions, set up notifications and reminders, and build reports and dashboards to meet all your needs',
    },
    {
      number: 6,
      title: 'All-in-one HR suite of products',
      description:
        'Stop paying licensing fees for 10 different products. Manage all your HR and Payroll operations from one single dashboard and an easy-to-use mobile app. Right from recruitment to exits, managing rosters to payroll - we have got you covered',
    },
  ]

  return (
    <div className="py-8 px-4">
      <div className="max-w-full">
        {/* Section Label */}
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-1.5">
          Benefits
        </p>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-8">
          Why Talrn?
        </h2>

        {/* Benefits List */}
        <div className="space-y-8">
          {benefits.map((benefit) => (
            <div key={benefit.number} className="flex gap-4">
              {/* Large Number */}
              <div className="flex-shrink-0">
                <span className="text-5xl font-light text-gray-300 leading-none">
                  {benefit.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection


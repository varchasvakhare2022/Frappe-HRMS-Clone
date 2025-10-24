import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question:
        'How does Frappe HR compare to traditional HRMS solutions in terms of cost and flexibility?',
      answer:
        'Frappe HR is 100% open-source, meaning there are no licensing fees or per-user charges that traditional HRMS solutions impose. This makes it significantly more affordable, especially as your team grows. Additionally, being built on the Frappe Framework, it offers unmatched flexibility and customization options compared to rigid, proprietary systems.',
    },
    {
      question: 'Does Frappe HR support remote and hybrid workforce management?',
      answer:
        'Yes, Frappe HR is designed to support modern work arrangements including remote and hybrid workforces. Features like mobile check-ins, GPS-based attendance, flexible shift scheduling, and comprehensive leave management make it easy to manage distributed teams effectively.',
    },
    {
      question: 'How customizable is Frappe HR compared to other HR software?',
      answer:
        'Frappe HR is highly customizable thanks to the Frappe Framework. You can create custom fields, forms, reports, workflows, and even modify the source code to meet your specific requirements. This level of customization is rarely available in proprietary HR software.',
    },
    {
      question: 'Is Frappe HR suitable for enterprises or small businesses?',
      answer:
        'Frappe HR is suitable for organizations of all sizes. Small businesses benefit from its affordability and ease of use, while enterprises appreciate its scalability, advanced features, and ability to handle complex organizational structures and workflows.',
    },
    {
      question:
        'Can I integrate Frappe HR with my existing ERP or accounting system?',
      answer:
        'Yes, Frappe HR integrates seamlessly with ERPNext for accounting and can be connected to other systems through REST APIs. The integration capabilities allow you to sync employee data, payroll information, and other HR metrics with your existing business systems.',
    },
    {
      question:
        'What kind of reports and analytics does Frappe HR provide for decision making?',
      answer:
        'Frappe HR provides comprehensive reporting and analytics capabilities including attendance reports, leave analytics, payroll summaries, recruitment metrics, and performance insights. You can also create custom reports and dashboards to track the metrics that matter most to your organization.',
    },
    {
      question: 'How secure is employee data stored in Frappe HR?',
      answer:
        'Frappe HR takes data security seriously with role-based permissions, encrypted data storage, audit logs, and regular security updates. Since you can self-host Frappe HR, you maintain complete control over your data and can implement additional security measures as needed.',
    },
    {
      question:
        'Does Frappe HR include employee self-service and mobile access features?',
      answer:
        'Yes, Frappe HR includes a mobile app that allows employees to check in/out, apply for leaves, view payslips, update personal information, and access other HR services on the go. The self-service portal reduces administrative burden and empowers employees.',
    },
    {
      question:
        'What support and training options are available when implementing Frappe HR?',
      answer:
        'Frappe HR is backed by a strong community of over 20,000 developers and 180+ partners worldwide. You can access documentation, community forums, video tutorials, and professional support from Frappe or certified partners for implementation, customization, and training.',
    },
    {
      question: 'Can Frappe HR handle multi-currency payroll for global teams?',
      answer:
        'Absolutely! Frappe HR supports multi-currency payroll processing, making it ideal for companies with international teams. You can create salary structures in different currencies, handle exchange rates automatically, and maintain accurate financial records across all regions.',
    },
    {
      question: 'How does Frappe HR handle compliance with labor laws?',
      answer:
        'Frappe HR provides configurable tax slabs, statutory compliance reports, and customizable workflows to help you comply with regional labor laws. You can configure income tax calculations, provident fund contributions, and other statutory requirements specific to your location.',
    },
    {
      question: 'Is there a mobile app available for Frappe HR?',
      answer:
        'Yes, Frappe HR has a dedicated mobile app for both iOS and Android. The app allows employees to perform daily tasks like attendance marking, leave applications, expense claims, and viewing salary slips. Managers can also approve requests and access important HR information on the go.',
    },
    {
      question: 'How does the performance management system work?',
      answer:
        'The performance management module allows you to set goals and KRAs, conduct appraisals, gather 360-degree feedback, and track employee performance over time. You can create custom appraisal templates, configure scoring formulas, and generate comprehensive performance reports.',
    },
    {
      question: 'Can I migrate data from my existing HR system?',
      answer:
        'Yes, Frappe HR provides data import tools that allow you to migrate employee data, leave balances, salary structures, and other information from your existing HR system. The import process is well-documented, and our community can help with complex migrations.',
    },
    {
      question: 'What happens if I need a feature that doesn\'t exist?',
      answer:
        'Since Frappe HR is open-source, you have multiple options: you can customize the system yourself, hire a developer from the community, work with a certified partner, or submit a feature request to the community. The modular architecture makes it easy to add new features without affecting core functionality.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-2">
          Got a Query?
        </p>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-10">
          Frequently asked questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left hover:bg-gray-50 transition-all duration-200"
              >
                {/* Question */}
                <span className="text-base text-gray-900 leading-relaxed flex-1">
                  {faq.question}
                </span>

                {/* Icon */}
                <span className="flex-shrink-0 mt-0.5">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-gray-900" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-900" strokeWidth={2} />
                  )}
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="pb-5 pr-9">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQSection


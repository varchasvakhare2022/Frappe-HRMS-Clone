import { useState } from 'react'
import { Check, Plus, Minus, Github } from 'lucide-react'

function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I implement Talrn?',
      answer: 'You can implement Talrn through cloud hosting for managed services, or self-host it on your own servers. We also offer consultation and implementation support through our certified partners.',
    },
    {
      question: 'Do I need self-hosting?',
      answer: 'Self-hosting is recommended if you have a technical team that can manage servers and deployments. For most businesses, cloud hosting provides a hassle-free managed hosting solution.',
    },
    {
      question: 'How can I get consultation?',
      answer: 'You can book a consultation with our team by contacting us through the Contact page or reaching out to our certified partners for implementation support.',
    },
    {
      question: 'What is Priority SLA?',
      answer: 'Priority SLA ensures faster response times for support tickets and dedicated assistance for critical issues, typically included in Enterprise plans.',
    },
    {
      question: 'Do you have discounts for education institutes and non profits?',
      answer: 'Yes, we offer special pricing for educational institutions and non-profit organizations. Please contact us with details about your organization.',
    },
    {
      question: 'Is Talrn available in my language?',
      answer: 'Talrn supports multiple languages. Check our documentation or contact us to confirm if your preferred language is available.',
    },
    {
      question: 'I have more questions.',
      answer: 'Feel free to reach out through our contact page or visit our community forum where our team and community members can help answer your questions.',
    },
  ]

  return (
    <div className="py-12">
      {/* Header - Centered */}
      <div className="max-w-3xl mx-auto px-8 text-center mb-12">
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-2">
          Pricing
        </p>
        <h1 
          className="text-4xl mb-6"
          style={{
            fontFamily: 'Newsreader, serif',
            fontWeight: '500',
            lineHeight: '1.3',
            color: '#171717',
          }}
        >
          Compute-based pricing on Cloud Hosting
        </h1>
        <p className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Save big with compute-based pricing that is simple, transparent, and predictable. 
          There are no surprises as you get to monitor daily usage and pay at the end of the month. 
          Whether you are a small business or an enterprise, we have got you covered.
        </p>
      </div>

      {/* Pricing Plans - Centered block with left-aligned content */}
      <div className="max-w-3xl mx-auto px-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
        {/* Small Business */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Small Business</h2>
          <p className="text-sm text-gray-600 mb-4">Choose shared hosting or private benches</p>
          
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900 leading-none">₹820</p>
            <p className="text-sm text-gray-600 mt-1">onwards (per month)</p>
          </div>
          
          <button className="w-full mb-6 px-6 py-3 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2">
            Start free trial →
          </button>

          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Ideal for up to ~1000 employees</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">
                Bundled product warranty starts at ₹4100.{' '}
                <a href="#" className="text-gray-600 hover:text-gray-900 underline">
                  View all plans
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Managed Hosting</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Automated upgrades</span>
            </li>
          </ul>
        </div>

        {/* Enterprise */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h2>
          <p className="text-sm text-gray-600 mb-4">Choose dedicated hosting or hybrid hosting</p>
          
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900 leading-none">Premium</p>
            <p className="text-sm text-gray-600 mt-1">support</p>
          </div>
          
          <button className="w-full mb-6 px-6 py-3 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2">
            Contact us →
          </button>

          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Unlimited Users</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Managed Hosting</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Product Warranty</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Account Manager</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Priority SLA</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Phone Support</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-sm text-gray-700">Large DB Support</span>
            </li>
          </ul>
        </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="max-w-3xl mx-auto px-8 mb-12">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Open Source Section */}
      <div className="max-w-3xl mx-auto px-8 mb-16 pb-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Open Source</h2>
        <p className="text-sm text-gray-700 mb-4 max-w-2xl">
          Deploy on your own server using our installation scripts. Great for companies with a tech team. GPLv3 licensed.
        </p>
        <a
          href="https://github.com/frappe/hrms"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Github className="w-5 h-5" />
          View source
        </a>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left transition-all duration-200"
              >
                <span className="text-base text-gray-900 leading-normal flex-1">
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {openFaqIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  )}
                </span>
              </button>
              {openFaqIndex === index && (
                <div className="pb-6 pr-9">
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

export default PricingPage


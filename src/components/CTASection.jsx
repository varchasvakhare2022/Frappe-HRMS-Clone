import { ArrowRight } from 'lucide-react'

function CTASection() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-8">
          Ready to ease your everyday people ops?
        </h2>

        {/* Get Started Button */}
        <div className="mb-5">
          <a 
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
          >
            <span>Get started with Frappe HR</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>

        {/* Documentation Link */}
        <div>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 text-sm transition-all duration-200 hover:underline"
          >
            Read the documentation
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTASection


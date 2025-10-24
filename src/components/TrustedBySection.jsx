import { ArrowUpRight } from 'lucide-react'

function TrustedBySection() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-full">
        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-6">
          Trusted by teams of all sizes
        </h2>

        {/* Logos Container */}
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 py-4 px-6 mb-8 overflow-hidden">
          <div className="flex items-center justify-start gap-x-4">
            {/* ZERODHA */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 transform rotate-45"></div>
              <span className="text-base font-bold text-blue-600">ZERODHA</span>
            </div>

            {/* iftas */}
            <div className="flex items-center">
              <span className="text-base font-semibold text-blue-900">iftas</span>
            </div>

            {/* SELCO */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-0.5">
                <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2 L14 8 L12 6 L10 8 Z" fill="white" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-900">SELCO</span>
            </div>

            {/* Jiva */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 5 5 5 9c0 3 2 5 4 6 1 0 2-1 3-2 1 1 2 2 3 2 2-1 4-3 4-6 0-4-3-7-7-7z"/>
              </svg>
              <span className="text-base font-semibold text-gray-900">Jiva</span>
            </div>

            {/* Lifelong */}
            <div className="flex items-center">
              <span className="text-base font-bold text-red-600" style={{ fontFamily: 'serif' }}>
                Lifelong
              </span>
            </div>

            {/* VIKRAM TEA */}
            <div className="bg-red-600 px-2 py-1 rounded">
              <div className="text-white text-center">
                <div className="text-sm font-bold tracking-wide">VIKRAM</div>
                <div className="text-xs font-semibold tracking-wider">TEA</div>
              </div>
            </div>

            {/* rtCamp */}
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-sm"></div>
              <span className="text-base font-semibold text-gray-900">rtCamp</span>
            </div>
          </div>
        </div>

        {/* Read Customer Stories Link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 hover:gap-3"
        >
          <span>Read customer stories</span>
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

export default TrustedBySection


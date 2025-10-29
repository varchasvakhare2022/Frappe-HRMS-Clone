import { ArrowRight, Star } from 'lucide-react'

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Logo */}
      <div className="w-14 h-14 flex items-center justify-center mb-3">
        <img 
          src="/talrn-logo.jpeg" 
          alt="Talrn Logo" 
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Product Name */}
      <h2 className="text-lg font-semibold mb-6" style={{ color: '#4A4A4A' }}>
        Talrn
      </h2>

      {/* Divider Line */}
      <div className="w-20 h-[1px] bg-gray-300 mb-6"></div>

      {/* Tagline - Large Serif Font */}
      <h1 
        className="text-center mb-12 w-full"
        style={{
          fontFamily: 'Newsreader',
          fontSize: '40px',
          fontWeight: '500',
          letterSpacing: '0.2px',
          lineHeight: '140%',
          maxWidth: '800px',
          color: '#171717',
        }}
      >
        The HR revolution brewing just for you
      </h1>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        {/* Get Started Button */}
        <a 
          href="/signup"
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[13px] font-medium rounded-md hover:bg-gray-900 transition-all duration-200"
        >
          <span>Get started</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com/frappe/hrms"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-[13px] font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
        >
          <Star className="w-3.5 h-3.5" strokeWidth={2} fill="none" />
          <span>GitHub</span>
          <span className="text-gray-400 font-normal">|</span>
          <span className="font-semibold">6.9K</span>
        </a>
      </div>
    </div>
  )
}

export default Hero

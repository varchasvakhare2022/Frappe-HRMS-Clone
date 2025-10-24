import { ArrowRight, Star } from 'lucide-react'

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Logo */}
      <div className="w-14 h-14 flex items-center justify-center mb-3">
        <svg fill="none" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
          <path d="M36.9286 0.5H15.0714C7.02385 0.5 0.5 7.02385 0.5 15.0714V36.9286C0.5 44.9762 7.02385 51.5 15.0714 51.5H36.9286C44.9762 51.5 51.5 44.9762 51.5 36.9286V15.0714C51.5 7.02385 44.9762 0.5 36.9286 0.5Z" fill="#06B58B"></path>
          <path d="M15.9638 40.5715L13.5049 37.8758C16.9474 34.7612 21.3734 33.0308 25.9816 33.0308C30.5898 33.0308 35.0342 34.743 38.4585 37.8758L35.9995 40.5715C33.2309 38.0579 29.6791 36.6736 25.9816 36.6736C22.2841 36.6736 18.7142 38.0579 15.9456 40.5715H15.9638Z" fill="white"></path>
          <path d="M27.6756 11.4287H17.002V15.0716H27.6756C29.6792 15.0716 31.3185 16.7109 31.3185 18.7144V22.1023C31.3185 24.1058 29.6792 25.7451 27.6756 25.7451H24.2877C22.2841 25.7451 20.6448 24.1058 20.6448 22.1023V19.8072H17.002V22.1023C17.002 26.1276 20.2623 29.388 24.2877 29.388H27.6756C31.701 29.388 34.9613 26.1276 34.9613 22.1023V18.7144C34.9613 14.6891 31.701 11.4287 27.6756 11.4287Z" fill="white"></path>
        </svg>
      </div>

      {/* Product Name */}
      <h2 className="text-lg font-semibold mb-6" style={{ color: '#4A4A4A' }}>
        Frappe HR
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

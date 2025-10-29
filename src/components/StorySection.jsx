function StorySection() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-2">
          From the Author
        </p>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-10">
          Story of Talrn
        </h2>

        {/* Story Content */}
        <div className="space-y-5 text-base text-gray-700 leading-relaxed mb-10">
          <p>
            As our company grew, we started looking for open-source HR and Payroll
            software to manage our own team and were surprised to find none! There
            were options that claimed to be open-source but we didn't feel like
            there was a true open-source product to manage HR and Payroll.
          </p>

          <p>
            So we built it! As dedicated users, we felt the pain of using mediocre
            HR products. We wanted to give the world a 100% open-source portal to
            manage their workforce with seamless UX and a sophisticated UI.
          </p>

          <p>
            Talrn started as a comprehensive HR management solution in 2012. Over
            the years it matured as a product and is now available as a standalone
            platform built on modern technology that enables rapid application
            development.
          </p>
        </div>

        {/* Author Attribution */}
        <div className="flex items-center gap-3 sm:gap-4 mt-12">
          {/* Author Profile Picture */}
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
            <img
              src="https://frappe.io/files/rucha.jpg"
              alt="Rucha Mahabal"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-semibold">
                    RM
                  </div>
                `
              }}
            />
          </div>

          {/* Author Info */}
          <div className="min-w-0 flex-1">
            <p className="text-xl text-gray-900 mb-0.5 break-words" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Rucha Mahabal
            </p>
            <p className="text-xs text-gray-600 break-words">
              Product Engineer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorySection


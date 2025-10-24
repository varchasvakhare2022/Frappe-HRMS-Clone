import { ArrowUpRight } from 'lucide-react'

function UserReviewsSection() {
  const reviews = [
    {
      name: 'Nikhil Ponnuru',
      title: 'Zerodha',
      image: 'https://frappe.io/files/nikhil.jpg',
      review:
        'We have been using the HR module for some years now and the growth with which it has matured is impressive. The UI and UX are very usable and human-friendly. Many things are provided out of the box with a customization option and being open source makes it even more easier to use.',
      initials: 'NP',
    },
    {
      name: 'Imesha Sudasingha',
      title: 'Founder & Leadership, HighFlyer',
      image: 'https://frappe.io/files/imesha.jpg',
      review:
        "I have been using this for several months for an organization with 50+ employees with automated attendance based on fingerprint reader based employee checkins. It's been awesome so far.",
      initials: 'IS',
    },
    {
      name: 'Mathew Chacko',
      title: 'Operations, Anther Technologies',
      image: 'https://frappe.io/files/mathew.jpg',
      review:
        "It's my favourite HR software. I liked the simple UI, flexibility and extendability of the product. As business continuity is important for me, and they have the solution for that too, they provide the source code.",
      initials: 'MC',
    },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-2">
          User Reviews
        </p>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-gray-900 leading-[1.3] tracking-[0.12px] mb-12">
          Take it from our users
        </h2>

        {/* Reviews List */}
        <div className="space-y-10">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-3">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                          ${review.initials}
                        </div>
                      `
                    }}
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                {/* Reviewer Info */}
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-600">{review.title}</p>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 hover:gap-3"
          >
            <span>View all testimonials</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserReviewsSection


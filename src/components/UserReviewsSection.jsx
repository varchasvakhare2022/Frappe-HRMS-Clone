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
    {
      name: 'Sarah O\'Brien',
      title: 'HR Director, Tech Solutions Inc.',
      image: 'https://frappe.io/files/sarah.jpg',
      review:
        "The payroll module has been a game-changer for our organization. We process payroll for over 200 employees across multiple departments and it's incredibly smooth.",
      initials: 'SO',
    },
    {
      name: 'José García',
      title: 'Operations Manager, GlobalCorp',
      image: 'https://frappe.io/files/jose.jpg',
      review:
        "Managing a distributed team across different time zones was challenging. Talrn's attendance and shift management features have made our lives so much easier. The mobile app is fantastic!",
      initials: 'JG',
    },
    {
      name: 'Li Wei',
      title: 'Founder, StartupHub Asia',
      image: 'https://frappe.io/files/liwei.jpg',
      review:
        "As a startup, we needed something flexible and affordable. Talrn checked all boxes. The leave management system is intuitive and our team loves it.",
      initials: 'LW',
    },
    {
      name: 'Priya Sharma-Kapoor',
      title: 'VP of People Operations, Enterprise Solutions Ltd.',
      image: 'https://frappe.io/files/priya.jpg',
      review:
        "We've been using Talrn for 3 years now and it has scaled beautifully with our company's growth from 50 to 500 employees. The recruitment module helped us streamline our hiring process significantly. The customization options are endless, and the support team is incredibly responsive. We've integrated it with our existing tools seamlessly. This is exactly what modern HR software should be - powerful yet simple to use!",
      initials: 'PS',
    },
    {
      name: 'A B',
      title: 'CEO, MicroStartup',
      image: 'https://frappe.io/files/ab.jpg',
      review:
        "Simple, effective, and free. Perfect for small teams!",
      initials: 'AB',
    },
    {
      name: 'Dr. Mohammed Al-Rashid',
      title: 'Chief Human Resources Officer, Healthcare International',
      image: 'https://frappe.io/files/mohammed.jpg',
      review:
        "The compliance and reporting features have been invaluable for our healthcare organization. We handle sensitive employee data and the security features give us peace of mind.",
      initials: 'MA',
    },
    {
      name: 'Emma Thompson-Williams',
      title: 'People & Culture Lead',
      image: 'https://frappe.io/files/emma.jpg',
      review:
        "The performance management features are outstanding. We can now track goals, conduct appraisals, and provide continuous feedback all in one place. Our employee engagement has improved significantly.",
      initials: 'ET',
    },
    {
      name: 'Raj Kumar',
      title: 'Co-founder & CTO, DevOps Solutions',
      image: 'https://frappe.io/files/raj.jpg',
      review:
        "As a tech company, we appreciate good software. Talrn's open-source nature means we could customize it exactly to our needs. The API is well-documented and integration was smooth.",
      initials: 'RK',
    },
    {
      name: 'Maria Gonzalez-Rodriguez',
      title: 'HR Manager, Manufacturing Co.',
      image: 'https://frappe.io/files/maria.jpg',
      review:
        "The shift management and attendance tracking features are perfect for our manufacturing facility. We have multiple shifts running 24/7 and Talrn handles it effortlessly. The biometric integration works flawlessly!",
      initials: 'MG',
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
            <div key={index} className="flex gap-3 sm:gap-4">
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
                        <div class="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold">
                          ${review.initials}
                        </div>
                      `
                    }}
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                {/* Reviewer Info */}
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-gray-900 break-words">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-600 break-words">{review.title}</p>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed break-words">
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


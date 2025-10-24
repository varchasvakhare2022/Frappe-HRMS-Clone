import { Twitter, Linkedin, Instagram, Github, Youtube } from 'lucide-react'

function Footer() {
  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/frappe', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/frappe-tech', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/frappe.io/', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/frappe', label: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/@FrappeTech', label: 'YouTube' },
  ]

  const footerLinks = [
    { text: 'Contents', href: '#' },
    { text: 'Products', href: '#' },
    { text: 'Partners', href: '#' },
    { text: 'Certifications', href: '#' },
    { text: 'Contact', href: '#' },
    { text: 'Terms', href: '#' },
  ]

  return (
    <footer className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Shorter separator line */}
        <div className="flex justify-center mb-10">
          <div className="w-32 border-t border-gray-200"></div>
        </div>

        {/* Frappe Brand Name */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Frappe</h3>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-all duration-200"
                aria-label={social.label}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
              </a>
            )
          })}
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mb-8">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 text-sm"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center">
          <p className="text-gray-400 italic text-sm leading-relaxed">
            <span className="text-gray-300 text-2xl leading-none align-top">"</span>
            Simplicity is the ultimate sophistication. - Leonardo da Vinci
            <span className="text-gray-300 text-2xl leading-none align-top">"</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/apply', label: 'Apply' },
    { href: '/#winners', label: 'Past Winners' },
  ]

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold text-white transition-colors hover:text-primary-300"
            >
              Wetherbee Foundation
            </Link>
            <p className="mt-2 max-w-xs text-sm text-neutral-400">
              Supporting recovery, one new beginning at a time. Honoring Matt
              Wetherbee&apos;s legacy through scholarships for Oxford House residents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Get Involved
            </h3>
            <p className="mt-4 text-sm text-neutral-400">
              Are you an Oxford House resident in Travis and Williamson County? Apply for our
              New Beginnings Scholarship.
            </p>
            <Link
              href="/apply"
              className="mt-4 inline-flex items-center rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-neutral-800 pt-8">
          <p className="text-center text-xs text-neutral-500">
            &copy; {currentYear} Wetherbee Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

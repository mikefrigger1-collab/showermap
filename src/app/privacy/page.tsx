'use client';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <GlobalHeader />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 9, 2026</p>

          <div className="space-y-8 text-gray-700">
            <p>
              Your privacy matters to us. This policy explains how ShowerMap collects, uses, and
              protects your personal information.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>

              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contact information when you reach out to us through our contact form</li>
                <li>Facility information you submit, including addresses and descriptions</li>
                <li>Reviews and ratings you choose to share about facilities</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pages you visit and time spent on our site</li>
                <li>Browser type, device type, and operating system</li>
                <li>IP address and general geographic location</li>
                <li>Referring website and how you found us</li>
                <li>Location data only when you explicitly allow it for finding nearby facilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Google Analytics</h2>
              <p className="mb-3">
                We use Google Analytics to understand how visitors use our website. Google Analytics
                collects information such as how often users visit the site, what pages they visit,
                and what other sites they used prior to coming to our site.
              </p>
              <p className="mb-3">
                Google Analytics uses cookies to collect this information. The information generated
                by the cookie about your use of the website is transmitted to and stored by Google.
                Google may use this data to contextualize and personalize ads in its advertising network.
              </p>
              <p className="mb-3">
                You can opt out of Google Analytics by installing the
                Google Analytics Opt-out Browser Add-on, available at
                https://tools.google.com/dlpage/gaoptout.
              </p>
              <p>
                For more information on how Google uses data when you use our site, visit
                https://policies.google.com/technologies/partner-sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Google AdSense</h2>
              <p className="mb-3">
                We use Google AdSense to display advertisements on our website. Google AdSense uses
                cookies to serve ads based on your prior visits to our website and other websites.
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based
                on your visit to our site and/or other sites on the Internet.
              </p>
              <p className="mb-3">
                You may opt out of personalized advertising by visiting Google&apos;s Ads Settings at
                https://www.google.com/settings/ads. Alternatively, you can opt out of a third-party
                vendor&apos;s use of cookies for personalized advertising by visiting
                https://www.aboutads.info/choices.
              </p>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on your prior
                visits to this website or other websites. You can review how Google manages data in
                its ads products at https://policies.google.com/technologies/ads.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
              <p className="mb-3">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keep the website functioning properly (essential cookies)</li>
                <li>Understand how visitors use our site (analytics cookies via Google Analytics)</li>
                <li>Display relevant advertisements (advertising cookies via Google AdSense)</li>
                <li>Remember your preferences (preference cookies)</li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. Note that disabling certain
                cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and improve our service</li>
                <li>To display shower facility information and user reviews</li>
                <li>To respond to your questions and support requests</li>
                <li>To understand how our site is used and improve user experience</li>
                <li>To display relevant advertisements</li>
                <li>To prevent spam and abuse</li>
                <li>To comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Information Sharing</h2>
              <p className="mb-3">
                <strong>We do not sell your personal information.</strong> We only share information
                in the following limited situations:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Public reviews and ratings are displayed to help other users (without your contact information)</li>
                <li>With service providers who help us operate ShowerMap (hosting, analytics)</li>
                <li>With advertising partners (Google AdSense) as described above</li>
                <li>When required by law or to protect safety</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Security</h2>
              <p>
                We take reasonable steps to protect your personal information from loss, theft, and
                unauthorized access. We use SSL encryption for data transmission and secure hosting
                infrastructure. However, no internet service can guarantee 100% security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request a copy of your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of analytics tracking and personalized advertising</li>
                <li>Disable location sharing in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Data Retention</h2>
              <p>
                We keep your information only as long as needed for the purposes described in this
                policy or as required by law. Contact information is retained until you request deletion
                or after 5 years of no contact. Website usage data is retained for 2 years, then
                anonymized or deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children&apos;s Privacy</h2>
              <p>
                ShowerMap is not intended for children under 13. We do not knowingly collect information
                from children. If you believe we have collected information from a child, please
                contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. International Users</h2>
              <p>
                ShowerMap is based in the United States. If you&apos;re using our service from another
                country, your information may be transferred to and stored in the US. By using
                ShowerMap, you consent to this transfer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. California Privacy Rights</h2>
              <p>
                California residents have additional rights under the CCPA, including the right to
                know what personal information we collect and the right to request deletion. To
                exercise these rights, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will update the &quot;Last updated&quot;
                date at the top of this page when changes are made. Continued use of ShowerMap means
                you accept the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact</h2>
              <p>
                If you have questions about this privacy policy or how we handle your information,
                please visit our <Link href="/contact/" className="text-blue-600 hover:underline">Contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </>
  );
}
